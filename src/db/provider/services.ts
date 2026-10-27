import { pgTable, timestamp, integer, uuid, varchar, unique, boolean, index, check } from "drizzle-orm/pg-core";
import { business } from "./business.ts";
import { sql } from "drizzle-orm";

export const services = pgTable(
    "services",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        businessId: uuid("business_id")
            .notNull()
            .references(() => business.id, { onDelete: "cascade" }),
        name: varchar("name", { length: 120 }).notNull(),
        durationMinutes: integer("duration_minutes").notNull(),
        price: integer("price").notNull(),
        isActive: boolean("is_active").notNull().default(true),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    },
    (t) => [
        index("services_business_idx").on(t.businessId),
        check("services_duration_positive", sql`${t.durationMinutes} > 0`),
        check("services_price_not_negative", sql`${t.price} >= 0`),
    ]
);
