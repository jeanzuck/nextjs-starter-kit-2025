import { integer, pgTable, text, timestamp, varchar, jsonb } from "drizzle-orm/pg-core"
import { customAlphabet } from "nanoid"

const generatedPublicId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 9)

export const tableAppData = pgTable("app_data", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  publicId: varchar("public_id", { length: 21 })
    .unique()
    .notNull()
    .$defaultFn(() => generatedPublicId()),
  name: text("name").notNull().unique(),
  logoImage: text("logo_image").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updateAt: timestamp("updated_at")
})

export const tableAppTranslations = pgTable("app_translations", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  th_th: text("th_th"),
  en_us: text("en_us"),
  zh_cn: text("zh_cn"),
  logs: jsonb("logs"),
  createdAt: timestamp("created_at").defaultNow(),
  updateAt: timestamp("updated_at")
})

export * from "./auth-schema"
