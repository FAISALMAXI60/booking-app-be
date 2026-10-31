import type { Request, Response } from 'express';
import { db } from '../../db/index.ts';
import { business } from '../../db/provider/business.ts';
import { users } from '../../db/auth.ts';
import { eq } from 'drizzle-orm';

export const businessSetupController = async (req: Request, res: Response) => {
    try {
        const [currentResp] = await db.insert(business).values(req.body).returning();
        await db.update(users).set({ providerCurrentStep: 2 }).where(eq(users.id, (req as any).user.userId))
        res.status(201).json({ currentResp });
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}