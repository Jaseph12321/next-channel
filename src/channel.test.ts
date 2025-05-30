import dotenv from "dotenv";
import { describe, expect, it } from "vitest";
import { fetchChannel } from "./app/api/fetchChannel";

dotenv.config({ path: ".env.local" });

describe("environment variable test", () => {
  it("reads environment variable", () => {
    expect(process.env.YOUTUBE_CHANNEL_URL).toBe("someValue");
  });
});

describe("#fetch youtube data", () => {
  it("returns youtube data", async () => {
    const result = await fetchChannel("Jennie");
    expect(result).toContainEqual({
      channelId: "UCNYi_zGmR519r5gYdOKLTjQ",
      photoUrl:
        "https://yt3.ggpht.com/Pb5o6YfIvifCkLV5IZ2J_DoP8KtOneSrE6u_ap-0x_45Lzoej4cX8sv12RXLgM7EDH_gpZ7t=s88-c-k-c0x00ffffff-no-rj",
      channelTitle: "JENNIE",
      subscriberCount: "15100000",
    });
  });
});
