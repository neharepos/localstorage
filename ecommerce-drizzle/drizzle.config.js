import "dotenv/config";
import { defineConfig } from "drizzle-kit";
// import {dotenv} from "dotenv"

export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});