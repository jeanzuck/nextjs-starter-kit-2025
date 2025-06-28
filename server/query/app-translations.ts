import "server-only"

import { cache } from "react"
import { sql } from "drizzle-orm"
import { T_Locale } from "@/app-config"
import { db, tableAppTranslations } from "@/server/db"
import { queryWrapper } from "./query-wrapper"

async function getAppTranslations(locale: T_Locale) {
  "use cache"
  return await queryWrapper(async () => {
    const result = await db
      .select({
        slug: tableAppTranslations.slug,
        text: sql<string>`${tableAppTranslations[locale.replace("-", "_") as keyof typeof tableAppTranslations]}`
      })
      .from(tableAppTranslations)

    return result
  })
}
export const cachedGetAppTranslations = cache(getAppTranslations)
