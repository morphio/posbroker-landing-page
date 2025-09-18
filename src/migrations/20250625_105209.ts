import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_categories_status') THEN
        CREATE TYPE "public"."enum_categories_status" AS ENUM('draft', 'published');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__categories_v_version_status') THEN
        CREATE TYPE "public"."enum__categories_v_version_status" AS ENUM('draft', 'published');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__categories_v_published_locale') THEN
        CREATE TYPE "public"."enum__categories_v_published_locale" AS ENUM('ru', 'uz');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_partners_status') THEN
        CREATE TYPE "public"."enum_partners_status" AS ENUM('draft', 'published');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__partners_v_version_status') THEN
        CREATE TYPE "public"."enum__partners_v_version_status" AS ENUM('draft', 'published');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__partners_v_published_locale') THEN
        CREATE TYPE "public"."enum__partners_v_published_locale" AS ENUM('ru', 'uz');
      END IF;
    END $$;
  CREATE TABLE IF NOT EXISTS "_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__categories_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_categories_v_locales" (
  	"version_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_partners_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_category_id" integer,
  	"version_link" varchar,
  	"version_logo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__partners_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__partners_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_partners_v_locales" (
  	"version_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "categories_locales" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "partners" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "partners" ALTER COLUMN "category_id" DROP NOT NULL;
  ALTER TABLE "partners" ALTER COLUMN "logo_id" DROP NOT NULL;
  DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'categories'
      AND column_name = '_status'
  ) THEN
    ALTER TABLE "categories" ADD COLUMN "_status" "enum_categories_status" DEFAULT 'draft';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'partners'
      AND column_name = '_status'
  ) THEN
    ALTER TABLE "partners" ADD COLUMN "_status" "enum_partners_status" DEFAULT 'draft';
  END IF;
END $$;

  DO $$ BEGIN
   ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_categories_v_locales" ADD CONSTRAINT "_categories_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_parent_id_partners_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_partners_v_locales" ADD CONSTRAINT "_partners_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_categories_v_parent_idx" ON "_categories_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_categories_v_version_version_updated_at_idx" ON "_categories_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_categories_v_version_version_created_at_idx" ON "_categories_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_categories_v_version_version__status_idx" ON "_categories_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_categories_v_created_at_idx" ON "_categories_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_categories_v_updated_at_idx" ON "_categories_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_categories_v_snapshot_idx" ON "_categories_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_categories_v_published_locale_idx" ON "_categories_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_categories_v_latest_idx" ON "_categories_v" USING btree ("latest");
  CREATE UNIQUE INDEX IF NOT EXISTS "_categories_v_locales_locale_parent_id_unique" ON "_categories_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_partners_v_parent_idx" ON "_partners_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_partners_v_version_version_category_idx" ON "_partners_v" USING btree ("version_category_id");
  CREATE INDEX IF NOT EXISTS "_partners_v_version_version_logo_idx" ON "_partners_v" USING btree ("version_logo_id");
  CREATE INDEX IF NOT EXISTS "_partners_v_version_version_updated_at_idx" ON "_partners_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_partners_v_version_version_created_at_idx" ON "_partners_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_partners_v_version_version__status_idx" ON "_partners_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_partners_v_created_at_idx" ON "_partners_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_partners_v_updated_at_idx" ON "_partners_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_partners_v_snapshot_idx" ON "_partners_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_partners_v_published_locale_idx" ON "_partners_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_partners_v_latest_idx" ON "_partners_v" USING btree ("latest");
  CREATE UNIQUE INDEX IF NOT EXISTS "_partners_v_locales_locale_parent_id_unique" ON "_partners_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "categories__status_idx" ON "categories" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "partners__status_idx" ON "partners" USING btree ("_status");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_categories_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categories_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_partners_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_partners_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_categories_v" CASCADE;
  DROP TABLE "_categories_v_locales" CASCADE;
  DROP TABLE "_partners_v" CASCADE;
  DROP TABLE "_partners_v_locales" CASCADE;
  DROP INDEX IF EXISTS "categories__status_idx";
  DROP INDEX IF EXISTS "partners__status_idx";
  ALTER TABLE "categories_locales" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "partners" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "partners" ALTER COLUMN "category_id" SET NOT NULL;
  ALTER TABLE "partners" ALTER COLUMN "logo_id" SET NOT NULL;
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "partners" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_categories_status";
  DROP TYPE "public"."enum__categories_v_version_status";
  DROP TYPE "public"."enum__categories_v_published_locale";
  DROP TYPE "public"."enum_partners_status";
  DROP TYPE "public"."enum__partners_v_version_status";
  DROP TYPE "public"."enum__partners_v_published_locale";`);
}
