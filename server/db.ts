import { Logger } from "drizzle-orm/logger"
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "@/server/schema"

class CustomLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    if (process.env.NODE_ENV !== "production" && process.env.LOG_QUERY === "true") {
      console.log(`\x1b[41m\x1b[97m[Query Log] ${new Date().toLocaleTimeString()}\x1b[0m`)
      console.log({ query, params })
    }
  }
}

declare global {
  var globalDb: PostgresJsDatabase<typeof schema> | undefined
}

let db: PostgresJsDatabase<typeof schema>

const url = `postgresql://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(url), { schema, logger: new CustomLogger() })
} else {
  if (!global.globalDb) {
    global.globalDb = drizzle(postgres(url), { schema, logger: new CustomLogger() })
  }

  db = global.globalDb
}

export { db }
export * from "./schema"
