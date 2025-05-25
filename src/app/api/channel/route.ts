import { NextRequest, NextResponse } from "next/server";
import { channel } from "../../model/model";
import getAllChannelId, {
  deleteChannel,
  getChannelId,
  insertChannel,
  updateChannel,
} from "./dbAction";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const action = searchParams.get("query");
  let result = null;
  try {
    if ("all" === action) {
      result = await getAllChannelId();
      console.log("result: ", result);
    } else if (action !== null) {
      result = await getChannelId(action);
    } else {
      throw new Error("Missing 'query' parameter");
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  let response = new NextResponse();

  try {
    if (!body) throw new Error("body is empty");

    await insertChannel(body);
    response = NextResponse.json({ status: "ok" });
  } catch (error) {
    response =  NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
  return response;
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  let response = new NextResponse();
  const channelList: channel[] = body.channelList;

  try {
    if (!Array.isArray(channelList)) {
      throw new Error("Request channelList must be an array");
    }

    const result = await Promise.all(
      channelList.map(async (item) => {
        console.log("Updating:", item.channelId);
        return await updateChannel(item);
      })
    );

    console.log("result: ", result);
    response = NextResponse.json({ status: "ok", message: result });
  } catch (error) {
    response = NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
  return response;
}

export async function DELETE(req: NextRequest) {
  let response = new NextResponse();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const channelId = searchParams.get("channelId");

    if (!channelId || !userId) {
      throw new Error("Missing 'channelId' or 'userId' parameter");
    }

    await deleteChannel(channelId, userId);

    response = NextResponse.json({ status: "ok" });
  } catch (error) {
    response = NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
  return response;
}
