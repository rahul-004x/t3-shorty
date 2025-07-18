CREATE TABLE "drizzle_Link" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"short" text NOT NULL,
	"long" text NOT NULL,
	"clicks" integer DEFAULT 0,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "drizzle_Link_short_unique" UNIQUE("short")
);
