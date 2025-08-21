CREATE TABLE "group_users" (
	"group_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "groups" DROP CONSTRAINT "groups_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "group_users" ADD CONSTRAINT "group_users_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_group_name_unique" UNIQUE("group_name");--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_job_name_unique" UNIQUE("job_name");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");