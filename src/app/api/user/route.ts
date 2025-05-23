import { NextRequest, NextResponse } from "next/server";
import insertUser, { deleteUser, getUser, updateUser } from "./dbAction";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let response = new NextResponse();

  try {
    await insertUser(body);
    response = NextResponse.json({ status: "ok" });
  } catch (error) {
    response = NextResponse.json(error);
  }
  return response;
}

export async function GET(req: NextRequest) {
  console.log("into the database");
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  let response = new NextResponse();

  if (!id || !name)
    return NextResponse.json(
      { error: "Missing query parameters" },
      { status: 400 }
    );

  try {
    const result = getUser(name, id);

    response = NextResponse.json(result);
  } catch (error) {
    response = NextResponse.json(error);
  }
  return response;
}

export async function PUT(req: NextRequest) {
  console.log("start update user data from the database");
  const body = await req.json();
  let response = new NextResponse();

  try {
    const result = updateUser(body);
    return NextResponse.json(result);
  } catch (error) {
    response = NextResponse.json(error);
  }
  return response;
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let response = new NextResponse();

  try {
    const id = searchParams.get("id");
    if (id) {
      const result = deleteUser(id);
      return NextResponse.json(result);
    }
    return "no this user";
  } catch (error) {
    response = NextResponse.json(error);
  }

  return response;
}
