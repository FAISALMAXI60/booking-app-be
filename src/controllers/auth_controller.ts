import type { Request, Response } from 'express';
import bcrypt, { compare } from "bcrypt";
import { db } from '../db/index.ts';
import { users } from '../db/auth.ts';
import { eq } from 'drizzle-orm';
import { setAuthCookie } from '../utils/token.ts';

export const signUpController = async (req: Request, res: Response) => {
    const salt = await bcrypt.genSalt(Number(10));

    try {
        const [findUser] = await db.select().from(users).where(eq(users.email, req.body.email));
        if (findUser) {
            return res.status(401).json({ message: "USER ALREADY REGISTERED WITH THIS EMAIL" })
        }
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const [user]: any = await db.insert(users).values({ ...req.body, password: hashPassword }).returning();
        setAuthCookie(res, user?.id)
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const [user]: any = await db.select().from(users).where(eq(users.email, req.body.email))

        if (!user || !(await compare(req.body.password, user?.password))) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        setAuthCookie(res, user?.id);
        res.json({ user });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}