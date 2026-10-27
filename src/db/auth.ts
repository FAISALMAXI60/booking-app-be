import { pgTable, timestamp, integer, uuid, varchar, text } from "drizzle-orm/pg-core";
import { userRole } from "./enums.ts";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    role: userRole("role").notNull().default("customer"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    providerCurrentStep: integer("provider_current_step").default(1).notNull()
});