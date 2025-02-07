CREATE TYPE "public"."borrow_status" AS ENUM('BORROWED', 'RETURNED');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('ADMIN', 'USER', 'SUPERADMIN');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "registration" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"university_id" integer NOT NULL,
	"password" text NOT NULL,
	"university_card" text NOT NULL,
	"status" "status" DEFAULT 'PENDING',
	"role" "role" DEFAULT 'USER',
	"last_activity_date" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	"borrow_status" "borrow_status" DEFAULT 'BORROWED',
	CONSTRAINT "registration_id_unique" UNIQUE("id"),
	CONSTRAINT "registration_email_unique" UNIQUE("email"),
	CONSTRAINT "registration_university_id_unique" UNIQUE("university_id")
);
