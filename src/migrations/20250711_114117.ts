import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_financial_organizations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__financial_organizations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__financial_organizations_v_published_locale" AS ENUM('ru', 'uz');
  CREATE TABLE IF NOT EXISTS "financial_organizations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"link" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_financial_organizations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "financial_organizations_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_financial_organizations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_link" varchar,
  	"version_logo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__financial_organizations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__financial_organizations_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_financial_organizations_v_locales" (
  	"version_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "financial_organizations_id" integer;
  DO $$ BEGIN
   ALTER TABLE "financial_organizations" ADD CONSTRAINT "financial_organizations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "financial_organizations_locales" ADD CONSTRAINT "financial_organizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."financial_organizations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_financial_organizations_v" ADD CONSTRAINT "_financial_organizations_v_parent_id_financial_organizations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."financial_organizations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_financial_organizations_v" ADD CONSTRAINT "_financial_organizations_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_financial_organizations_v_locales" ADD CONSTRAINT "_financial_organizations_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_financial_organizations_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "financial_organizations_logo_idx" ON "financial_organizations" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "financial_organizations_updated_at_idx" ON "financial_organizations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "financial_organizations_created_at_idx" ON "financial_organizations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "financial_organizations__status_idx" ON "financial_organizations" USING btree ("_status");
  CREATE UNIQUE INDEX IF NOT EXISTS "financial_organizations_locales_locale_parent_id_unique" ON "financial_organizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_parent_idx" ON "_financial_organizations_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_version_version_logo_idx" ON "_financial_organizations_v" USING btree ("version_logo_id");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_version_version_updated_at_idx" ON "_financial_organizations_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_version_version_created_at_idx" ON "_financial_organizations_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_version_version__status_idx" ON "_financial_organizations_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_created_at_idx" ON "_financial_organizations_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_updated_at_idx" ON "_financial_organizations_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_snapshot_idx" ON "_financial_organizations_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_published_locale_idx" ON "_financial_organizations_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_financial_organizations_v_latest_idx" ON "_financial_organizations_v" USING btree ("latest");
  CREATE UNIQUE INDEX IF NOT EXISTS "_financial_organizations_v_locales_locale_parent_id_unique" ON "_financial_organizations_v_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_financial_organizations_fk" FOREIGN KEY ("financial_organizations_id") REFERENCES "public"."financial_organizations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_financial_organizations_id_idx" ON "payload_locked_documents_rels" USING btree ("financial_organizations_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "financial_organizations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "financial_organizations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_financial_organizations_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_financial_organizations_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "financial_organizations" CASCADE;
  DROP TABLE "financial_organizations_locales" CASCADE;
  DROP TABLE "_financial_organizations_v" CASCADE;
  DROP TABLE "_financial_organizations_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_financial_organizations_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_financial_organizations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "financial_organizations_id";
  DROP TYPE "public"."enum_financial_organizations_status";
  DROP TYPE "public"."enum__financial_organizations_v_version_status";
  DROP TYPE "public"."enum__financial_organizations_v_published_locale";`)
}
