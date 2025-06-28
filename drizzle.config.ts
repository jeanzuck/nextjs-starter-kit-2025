import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./server/drizzle",
  schema: "./server/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
  },
  verbose: true,
  strict: true
})
