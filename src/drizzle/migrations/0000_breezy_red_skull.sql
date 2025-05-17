CREATE TABLE "channel" (
	"id" serial PRIMARY KEY NOT NULL,
	"channelId" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"subscriberCount" integer,
	"photoUrl" varchar(255),
	"userId" varchar(10) NOT NULL,
	"createdTime" timestamp DEFAULT now() NOT NULL,
	"updatedTime" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "channel_channelId_unique" UNIQUE("channelId")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(10) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"createdTime" timestamp DEFAULT now() NOT NULL,
	"updatedTime" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "channel" ADD CONSTRAINT "channel_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;