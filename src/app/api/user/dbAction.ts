import { db } from "@/src/drizzle/db";
import { UserTable } from "@/src/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";
import { userData } from "../../model/model";

export default async function insertUser(body: userData) {
  const result = await db.insert(UserTable).values({
    id: body.id,
    name: body.name,
    age: body.age,
    email: body.email,
  });

  return result;
}

export async function getUser(id: string, name: string) {
  if (name === "undefined") {
    return await db.query.UserTable.findFirst({
      with: {
        channels: true,
      },
      where: eq(UserTable.id, id),
    });
  } else {
    return await db.query.UserTable.findFirst({
      with: {
        channels: true,
      },
      where: and(eq(UserTable.id, id), eq(UserTable.name, name)),
    });
  }
}

export async function updateUser(body: userData) {
  return await db
    .update(UserTable)
    .set({
      name: body.name,
      age: body.age,
      email: body.email,
    })
    .where(sql`${UserTable.id} = ${body.id}`)
    .returning({ id: UserTable.id });
}

export async function deleteUser(id: string) {
  return await db.delete(UserTable).where(sql`${UserTable.id}=${id}`);
}
