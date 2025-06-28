import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/server/db"
import * as schema from "@/server/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [nextCookies()]
})
