ALTER TABLE "channel" DROP CONSTRAINT "channel_id_channelId_unique";--> statement-breakpoint
ALTER TABLE "channel" ADD CONSTRAINT "channel_userId_channelId_unique" UNIQUE("userId","channelId");