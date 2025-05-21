import { db } from "@/src/drizzle/db";
import { ChannelTable } from "@/src/drizzle/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let response = new NextResponse();

  try {
    await db.insert(ChannelTable).values({
      channelId: body.channelId,
      title: body.channelTitle,
      subscriberCount: body.subscriberCount,
      userId: body.userId,
      photoUrl: body.photoUrl,
    });

    response = NextResponse.json({ status: "ok" });
  } catch (error) {
    response = NextResponse.json(error);
  }
  return response;
}

export async function DELETE(req: NextRequest) {
  let response = new NextResponse();

  try {
    const { searchParams } = new URL(req.url);
    await db.delete(ChannelTable).where(sql`${
      ChannelTable.channelId
    } = ${searchParams.get("channelId")} 
  and ${ChannelTable.userId} = ${searchParams.get("userId")}`);

    response = NextResponse.json({ status: "ok" });
  } catch (error) {
    response = NextResponse.json(error);
  }
  return response;
}
