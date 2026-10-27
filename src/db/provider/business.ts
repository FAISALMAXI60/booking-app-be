import { pgTable, timestamp, uuid, varchar, text } from "drizzle-orm/pg-core";
import { businessCategory } from "../enums.ts";
import { users } from "../auth.ts";

export const business = pgTable("business", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
    businessCat: businessCategory("business_Cat").notNull(),
    businessName: varchar("business_Name", { length: 150 }).notNull(),
    description: text("description"),
    location: text("location").notNull(),
    timeZone: varchar("time_zone", { length: 64 }).notNull().default("Europe/London"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});