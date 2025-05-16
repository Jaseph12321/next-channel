CREATE TABLE "channel" (
	"id" serial PRIMARY KEY NOT NULL,
	"channelId" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"subscriberCount" integer,
	"userId" uuid NOT NULL,
	"createdTime" timestamp DEFAULT now() NOT NULL,
	"updatedTime" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"createdTime" timestamp DEFAULT now() NOT NULL,
	"updatedTime" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "uniqueNameAndAge" UNIQUE("name","age")
);
--> statement-breakpoint
ALTER TABLE "channel" ADD CONSTRAINT "channel_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "emailIndex" ON "user" USING btree ("email");