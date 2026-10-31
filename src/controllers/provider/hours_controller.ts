import type { Request, Response } from "express";
import { db } from "../../db/index.ts";
import { workingHours } from "../../db/provider/hours.ts";
import { users } from "../../db/auth.ts";
import { eq } from "drizzle-orm";

export const hoursSetupController = async (req: Request, res: Response) => {
    try {
        const newRecord = await db.transaction(async (tx) => {
            await tx.delete(workingHours).where(eq(workingHours.businessId, req.body.businessId))
            const result = await tx.insert(workingHours).values(req.body.data).returning();
            return result
        })
        await db.update(users).set({ providerCurrentStep: 4 }).where(eq(users.id, (req as any).user.userId))
        res.status(201).json(newRecord);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}