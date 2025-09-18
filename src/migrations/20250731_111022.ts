import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "users_sessions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "created_at" timestamp(3) with time zone,
      "expires_at" timestamp(3) with time zone NOT NULL
    );

    DO $$
    BEGIN
      -- partners._order
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'partners' AND column_name = '_order'
      ) THEN
        ALTER TABLE "partners" ADD COLUMN "_order" varchar COLLATE "C";
      ELSE
        BEGIN
          ALTER TABLE "partners"
            ALTER COLUMN "_order" TYPE varchar COLLATE "C"
            USING "_order"::varchar;
        EXCEPTION WHEN others THEN
          -- игнорировать, если тип уже тот же самый
        END;
      END IF;

      -- financial_organizations._order
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'financial_organizations' AND column_name = '_order'
      ) THEN
        ALTER TABLE "financial_organizations" ADD COLUMN "_order" varchar COLLATE "C";
      ELSE
        BEGIN
          ALTER TABLE "financial_organizations"
            ALTER COLUMN "_order" TYPE varchar COLLATE "C"
            USING "_order"::varchar;
        EXCEPTION WHEN others THEN
          -- игнорировать, если тип уже тот же самый
        END;
      END IF;

      -- _partners_v.version__order
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = '_partners_v' AND column_name = 'version__order'
      ) THEN
        ALTER TABLE "_partners_v" ADD COLUMN "version__order" varchar;
      END IF;

      -- _financial_organizations_v.version__order
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = '_financial_organizations_v' AND column_name = 'version__order'
      ) THEN
        ALTER TABLE "_financial_organizations_v" ADD COLUMN "version__order" varchar;
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'users_sessions_parent_id_fk'
      ) THEN
        ALTER TABLE "users_sessions"
          ADD CONSTRAINT "users_sessions_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id")
          ON DELETE CASCADE ON UPDATE NO ACTION;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" ("_order");
    CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "partners__order_idx" ON "partners" ("_order");
    CREATE INDEX IF NOT EXISTS "_partners_v_version_version__order_idx" ON "_partners_v" ("version__order");
    CREATE INDEX IF NOT EXISTS "financial_organizations__order_idx" ON "financial_organizations" ("_order");
    CREATE INDEX IF NOT EXISTS "_financial_organizations_v_version_version__order_idx" ON "_financial_organizations_v" ("version__order");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
    DROP TABLE IF EXISTS "users_sessions" CASCADE;
    DROP INDEX IF EXISTS "partners__order_idx";
    DROP INDEX IF EXISTS "_partners_v_version_version__order_idx";
    DROP INDEX IF EXISTS "financial_organizations__order_idx";
    DROP INDEX IF EXISTS "_financial_organizations_v_version_version__order_idx";
    ALTER TABLE "partners" DROP COLUMN IF EXISTS "_order";
    ALTER TABLE "_partners_v" DROP COLUMN IF EXISTS "version__order";
    ALTER TABLE "financial_organizations" DROP COLUMN IF EXISTS "_order";
    ALTER TABLE "_financial_organizations_v" DROP COLUMN IF EXISTS "version__order";
  `);
}
