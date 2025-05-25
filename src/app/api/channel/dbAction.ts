import { db } from "@/src/drizzle/db";
import { ChannelTable } from "@/src/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { DateTime } from "luxon";
import { channel } from "../../model/model";

export default async function getAllChannelId() {
  const result = await db
    .select({
      channelId: ChannelTable.channelId,
    })
    .from(ChannelTable);

  return result;
}

export async function getChannelId(action: string) {
  const result = await db
    .select({
      channelId: ChannelTable.channelId,
    })
    .from(ChannelTable)
    .where(eq(ChannelTable.userId, action));

  return result;
}

export async function insertChannel(body: channel) {
  await db.insert(ChannelTable).values({
    channelId: body.channelId,
    title: body.channelTitle,
    subscriberCount: body.subscriberCount,
    userId: body.userId,
    photoUrl: body.photoUrl,
  });
}

export async function updateChannel(item: channel) {
  return await db
    .update(ChannelTable)
    .set({
      title: item.channelTitle,
      subscriberCount: item.subscriberCount,
      photoUrl: item.photoUrl,
      updatedTime: DateTime.now().setZone("Europe/Berlin").toJSDate(),
    })
    .where(eq(ChannelTable.channelId, item.channelId))
    .returning({ id: ChannelTable.channelId });
}

export async function deleteChannel(channelId: string, userId: string) {
  await db.delete(ChannelTable)
    .where(sql`${ChannelTable.channelId} = ${channelId} 
  and ${ChannelTable.userId} = ${userId}`);
}
