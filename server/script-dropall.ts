import readline from "node:readline"
import { getTableName, sql } from "drizzle-orm"
import * as schema from "./schema"
import { db } from "@/server/db"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askConfirmation(message: string) {
  return new Promise((resolve) => {
    rl.question(`${message} (yes/no): `, (answer) => {
      resolve(answer.trim().toLowerCase())
    })
  })
}

async function dropAll() {
  const confirmation = await askConfirmation("\x1b[41mDROP ALL TABLE FROM DATABASE?\x1b[0m")
  if (confirmation === "yes") {
    for (const table of Object.values(schema)) {
      console.log("✅ DROP TABLE ->", getTableName(table))
      await db.execute(sql.raw(`DROP TABLE IF EXISTS ${getTableName(table)} CASCADE`))
    }
    console.log("✅ Database tables dropped.")
    process.exit(0)
  } else {
    process.exit(1)
  }
}

dropAll()
