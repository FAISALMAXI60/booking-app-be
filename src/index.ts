import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.ts";
import providerBusinessRoutes from "./routes/provider/business.ts";
import providerServicesRoutes from "./routes/provider/services.ts";
import providerHoursRoutes from "./routes/provider/hours.ts";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
    res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/provider/business', providerBusinessRoutes);
app.use('/api/provider/services', providerServicesRoutes);
app.use('/api/provider/hours', providerHoursRoutes);

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
