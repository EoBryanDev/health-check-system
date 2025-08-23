CREATE TYPE "public"."eclassifications" AS ENUM('GOOD', 'WARNING', 'ERROR');--> statement-breakpoint
CREATE TYPE "public"."emethods" AS ENUM('HTTP', 'JOB');--> statement-breakpoint
CREATE TYPE "public"."eroles" AS ENUM('ADMIN', 'MANAGER', 'ANALYST');--> statement-breakpoint
CREATE TABLE "group_users" (
	"group_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"group_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_name" text NOT NULL,
	"group_description" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"created_by" uuid NOT NULL,
	CONSTRAINT "groups_group_name_unique" UNIQUE("group_name")
);
--> statement-breakpoint
CREATE TABLE "job_logs" (
	"job_log_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"start_at" timestamp (3) NOT NULL,
	"duration" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"job_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"job_name" text NOT NULL,
	"job_description" text,
	"interval_time" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"created_by" uuid NOT NULL,
	CONSTRAINT "jobs_job_name_unique" UNIQUE("job_name")
);
--> statement-breakpoint
CREATE TABLE "service_logs" (
	"service_log_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_id" uuid NOT NULL,
	"start_at" timestamp (3) NOT NULL,
	"duration" integer NOT NULL,
	"method" "emethods" DEFAULT 'JOB' NOT NULL,
	"status_code" integer NOT NULL,
	"requester" text DEFAULT 'NODE_CRON' NOT NULL,
	"device" text DEFAULT 'SERVER' NOT NULL,
	"classification" "eclassifications" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"service_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"job_id" uuid,
	"service_name" text NOT NULL,
	"service_description" text,
	"service_url" text NOT NULL,
	"rate_limit_tolerance" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"created_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"cellnumber" text,
	"role" "eroles" DEFAULT 'ANALYST' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "group_users" ADD CONSTRAINT "group_users_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_created_by_users_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_logs" ADD CONSTRAINT "job_logs_job_id_jobs_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("job_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_group_id_groups_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("group_id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_created_by_users_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_logs" ADD CONSTRAINT "service_logs_service_id_services_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("service_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_group_id_groups_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("group_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_job_id_jobs_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("job_id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_created_by_users_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;