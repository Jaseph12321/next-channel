"use server";
import dotenv from "dotenv";
import { channel } from "../model/model";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.YOUTUBE_API_KEY;
const channelUrl = process.env.YOUTUBE_CHANNEL_URL;

export async function fetchChannelSubscriber(
  channelId: string
): Promise<channel> {
  try {
    let d: channel | undefined;
    const response = await fetch(
      `${channelUrl}?key=${apiKey}&part=snippet,statistics&maxResults=5&type=channel&id=${channelId}`
    );

    if (!response.ok) {
      throw new Error("No such user");
    } else if (403 === response.status || 429 === response.status) {
      const json = await response.json();
      const reason = json?.error?.errors?.[0]?.reason;

      if (
        reason === "quotaExceeded" ||
        reason === "userRateLimitExceeded" ||
        reason === "dailyLimitExceeded" ||
        reason === "rateLimitExceeded"
      ) {
        console.warn(`Youtube quota hit: ${reason}`);
        throw new Error(`Youtube API Error: ${reason}`);
      }
    }

    const channelData = await response.json();
    if (channelData && channelData.items && channelData.items.length > 0) {
      d = {
        channelId: channelData.items[0].id,
        photoUrl: channelData.items[0].snippet.thumbnails.default.url,
        channelTitle: channelData.items[0].snippet.title,
        userId:
          channelData.items[0].snippet?.customUrl ||
          channelData.items[0].id ||
          "", // fallback if customUrl is missing
        subscriberCount: Number(
          channelData.items[0].statistics.subscriberCount
        ),
      };
    } else {
      throw new Error("Channel data not found");
    }

    return d;
  } catch (err) {
    throw new Error(`Fetch error: ${err}`);
  }
}
