import { relations } from "drizzle-orm";
import { users } from "./auth.ts";
import { business } from "./provider/business.ts";
import { services } from "./provider/services.ts";
import { workingHours } from "./provider/hours.ts";

export const usersRelations = relations(users, ({ one }) => ({
    business: one(business),
}));

export const businessesRelations = relations(business, ({ one, many }) => ({
    owner: one(users, { fields: [business.userId], references: [users.id] }),
    services: many(services),
    workingHours: many(workingHours),
}));

export const servicesRelations = relations(services, ({ one }) => ({
    business: one(business, { fields: [services.businessId], references: [business.id] }),
}));

export const workingHoursRelations = relations(workingHours, ({ one }) => ({
    business: one(business, { fields: [workingHours.businessId], references: [business.id] }),
}));