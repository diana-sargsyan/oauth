import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? "local"}.local`,
});

import { getDbCreds } from "@/backend/misc/db";
import { defineConfig } from "drizzle-kit";

const dbCredentials = getDbCreds();
export default defineConfig({
  dialect: "postgresql",
  dbCredentials,
  schema: "./backend/tables.ts",
  out: "./backend/drizzle",
  verbose: true,
});
