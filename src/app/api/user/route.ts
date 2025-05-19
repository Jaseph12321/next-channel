import { db } from "@/src/drizzle/db";
import { UserTable } from "@/src/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();
  let response= new NextResponse;

  try {
    await db.insert(UserTable).values({
    id: body.id,     
    name: body.name,
    age: body.age,
    email: body.email
  });

  response =  NextResponse.json({ status: 'ok' });
  } catch (error) {
    response = NextResponse.json(error);
  }
  return response;
}

export async function GET(req: NextRequest){

    console.log('into the database');
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    let response = new NextResponse;

    if(!id || !name) 
        return NextResponse.json({error:'Missing query parameters'}, {status: 400});

    try {
        let userResult = null;

           if(name === "undefined"){
            userResult = await db.query.UserTable.findFirst({
        with:{
             channels: true
        },
        where: eq(UserTable.id,id)
            })
        }else{
           userResult = await db.query.UserTable.findFirst({
        with:{
             channels: true
        },
        where: and(eq(UserTable.id,id), eq(UserTable.name,name))
            })
        }
  

     
    console.log(userResult);
    response =  NextResponse.json(userResult);
    } catch (error) {
        response = NextResponse.json(error);
    }
    return response;
}


export async function PUT(req: NextRequest){

    console.log("start update user data from the database");
    const body = await req.json();
    let response = new NextResponse;


    try {
        const result = await db.update(UserTable)
    .set({
        name: body.name,
        age: body.age,
        email: body.email
    })
    .where(sql`${UserTable.id} = ${body.id}`)
    .returning({id: UserTable.id})

    return NextResponse.json(result);
    } catch (error) {
        response = NextResponse.json(error);
    }
    return response;
}

export async function DELETE(req: NextRequest){
    const {searchParams} = new URL(req.url);
    let response = new NextResponse();

    try {
        if(searchParams.has('id')){
        const result = await db.delete(UserTable)
        .where(sql`${UserTable.id}=${searchParams.get('id')}`);

        return result;
    }
    return 'no this user';
    } catch (error) {
        response = NextResponse.json(error);
    }

    return response;
}