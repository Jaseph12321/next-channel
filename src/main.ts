"use server";
import dotenv from 'dotenv';
import { db } from './drizzle/db';
import { UserTable } from './drizzle/schema';
dotenv.config({path: '.env.local'});

async function main(){
    await db.insert(UserTable).values({
        name: 'Joseph',
        age: 25,
        email: 'joseph@example.com'
    })
}

main()