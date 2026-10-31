import type { Request, Response } from "express";
import { db } from "../../db/index.ts";
import { services } from "../../db/provider/services.ts";
import { users } from "../../db/auth.ts";
import { eq } from "drizzle-orm";

export const servicesSetupController = async (req: Request, res: Response) => {
    try {
        const [newRecord] = await db.insert(services).values(req.body).returning();
        await db.update(users).set({ providerCurrentStep: 3 }).where(eq(users.id, (req as any).user.userId))
        res.status(201).json(newRecord);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}