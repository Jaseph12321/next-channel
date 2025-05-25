"use server";
import dotenv from "dotenv";
import getAllChannelId, { updateChannel } from "./app/api/channel/dbAction";
import { fetchChannelSubscriber } from "./app/api/fetchSubscriber";
import { channel } from "./app/model/model";
dotenv.config({ path: ".env.local" });

async function main() {
  const response = await getAllChannelId();
  console.log(response);
  let channelList: channel[] = [];

  for (const item of response) {
    let channelData = await fetchChannelSubscriber(item.channelId);
    channelList.push(channelData);
  }

  const distinctChannelList = Array.from(
    new Map(channelList.map((item) => [item.channelId, item])).values()
  );

  for (const channel of distinctChannelList) {
    await updateChannel(channel);
  }

  console.log("finished");
}

main();
