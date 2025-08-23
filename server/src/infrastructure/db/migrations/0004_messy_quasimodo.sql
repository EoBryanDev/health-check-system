ALTER TABLE "services" ADD COLUMN "last_run" timestamp;--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "last_run";