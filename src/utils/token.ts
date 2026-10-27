import jwt from "jsonwebtoken";
import type { Response } from "express";

export const setAuthCookie = (res: Response, userId: string) => {
    const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET!, { expiresIn: "15m" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });
};