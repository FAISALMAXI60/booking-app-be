import {
    pgEnum
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["super_admin", "provider", "customer"]);

export const businessCategory = pgEnum("business_category", ["barber", "tutor"]);
