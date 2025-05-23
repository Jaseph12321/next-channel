import { fetchChannel } from "../api/fetchChannel";
import { channel } from "../model/model";

export async function addChannelController(channel: channel): Promise<string> {
  console.log("userid", channel.userId);
  await fetch("/api/channel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(channel),
  });
  return "OK";
}

export async function fetchChannelController(
  query: string
): Promise<channel[]> {
  return fetchChannel(query);
}

export async function getChannelController(query: string): Promise<channel[]> {
  let data: channel[] = [];
  const dbResult = await fetch(`/api/channel?query=${query}`, {
    method: "GET",
  });

  data = await dbResult.json();
  return data;
}

export async function deleteChannelController(
  channelId: string,
  userId: string
) {
  console.log("start delete");
  await fetch(`/api/channel?channelId=${channelId}&userId=${userId}`, {
    method: "DELETE",
  });

  return "Delete OK";
}

export async function updateChannelController(
  channelList: channel[],
): Promise<string> {
  await fetch("/api/channel", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channelList }),
  });
  return "OK";
}
