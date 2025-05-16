import dotenv from 'dotenv';
import * as schema from "./schema"
import { drizzle } from 'drizzle-orm/postgres-js';
dotenv.config({path: '.env.local'})
import postgres from "postgres"

const client = postgres(process.env.DATABASE_URL as string)
export const db = drizzle(client,{schema, logger: true})