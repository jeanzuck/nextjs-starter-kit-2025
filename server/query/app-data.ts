import "server-only"

import { db, tableAppData } from "@/server/db"
import { queryWrapper } from "./query-wrapper"

export async function getAppData() {
  "use cache"
  return await queryWrapper(async () => {
    const result = await db
      .select({
        name: tableAppData.name,
        logoImage: tableAppData.logoImage
      })
      .from(tableAppData)

    return result
  })
}
