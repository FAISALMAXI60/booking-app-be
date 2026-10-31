import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    console.log("---->", token);
    
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ["HS256"] });
        (req as any).user = payload;
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};