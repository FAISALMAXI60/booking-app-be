import jwt from "jsonwebtoken";
import type { Response } from "express";

export const setAuthCookie = (res: Response, userId: string, role: string) => {
    console.log("role", role);
    
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    console.log(token);
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });
};