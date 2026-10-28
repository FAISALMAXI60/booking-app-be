import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: ["./src/db/auth.ts", "./src/db/enums.ts", "./src/db/relations.ts", "./src/db/provider/*.ts"],
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: { url: process.env.DATABASE_URL! },
});