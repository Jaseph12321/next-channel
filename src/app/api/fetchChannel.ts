"use server";
import dotenv from "dotenv";
import { channel } from "../model/model";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.YOUTUBE_API_KEY;
const searchUrl = process.env.YOUTUBE_SEARCH_URL;
const channelUrl = process.env.YOUTUBE_CHANNEL_URL;

export async function fetchChannel(query: string): Promise<channel[]> {
  try {
    const youtubeData: channel[] = [];
    const response = await fetch(
      `${searchUrl}?key=${apiKey}&part=snippet&maxResults=20&type=channel&q=${encodeURIComponent(
        query
      )}`
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

    const data = await response.json();

    const firstResult = data.items;
    if (firstResult) {
      let d: channel;
      for (const item of firstResult) {
        const channelResponse = await fetch(
          `${channelUrl}?key=${apiKey}&part=snippet,statistics&maxResults=5&type=channel&id=${item.id.channelId}`
        );

        const channelData = await channelResponse.json();
        if (channelData) {
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
          youtubeData.push(d);
        }
      }
    }

    //  youtubeData.forEach((item:any, index: number)=>{
    //    console.log(`Index: ${index+1}`)
    //    console.log(item.channelId);
    //    console.log(item.photoUrl);
    //    console.log(item.channelTitle);
    //    console.log(item.subscriberCount);
    //    console.log("===============================");
    //  })

    // console.log("youtube Data: ", youtubeData);

    return youtubeData;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
