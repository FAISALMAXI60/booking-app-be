import { pgTable, timestamp, time, uuid, smallint, index, check, unique } from "drizzle-orm/pg-core";
import { business } from "./business.ts";
import { sql } from "drizzle-orm";

export const workingHours = pgTable(
    "working_hours",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        businessId: uuid("business_id")
            .notNull()
            .references(() => business.id, { onDelete: "cascade" }),
        dayOfWeek: smallint("day_of_week").notNull(),
        startTime: time("start_time").notNull(),
        endTime: time("end_time").notNull(),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
    },
    (t) => [
        unique("working_hours_business_day_unique").on(t.businessId, t.dayOfWeek),
        check("working_hours_valid_day", sql`${t.dayOfWeek} BETWEEN 0 AND 6`),
        check("working_hours_valid_range", sql`${t.endTime} > ${t.startTime}`),
    ]
);