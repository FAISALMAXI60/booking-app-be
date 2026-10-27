import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "./auth.ts";
import * as businessSchema from "./provider/business.ts";
import * as servicesSchema from "./provider/services.ts";
import * as hoursSchema from "./provider/hours.ts";

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema: { ...authSchema, ...businessSchema, ...servicesSchema, ...hoursSchema } });
