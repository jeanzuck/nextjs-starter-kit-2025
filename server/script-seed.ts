import { db, tableAppData, tableAppTranslations } from "@/server/db"

async function seed() {
  await db.insert(tableAppData).values([
    {
      name: "Bun",
      logoImage: "bun.svg"
    },
    {
      name: "Docker",
      logoImage: "docker.png"
    },
    {
      name: "React",
      logoImage: "react.png"
    },
    {
      name: "Next.js",
      logoImage: "nextjs.png"
    },
    {
      name: "TypeScript",
      logoImage: "typescript.png"
    },
    {
      name: "ESLint",
      logoImage: "eslint.png"
    },
    {
      name: "Prettier",
      logoImage: "prettier.svg"
    },
    {
      name: "tailwindcss",
      logoImage: "tailwindcss.svg"
    },
    {
      name: "shadcn/ui",
      logoImage: "shadcn-ui.svg"
    },
    {
      name: "imgproxy",
      logoImage: "imgproxy.svg"
    },
    {
      name: "PostgreSQL",
      logoImage: "postgresql.png"
    },
    {
      name: "Drizzle ORM",
      logoImage: "drizzle.png"
    },
    {
      name: "next-intl",
      logoImage: "next-intl.png"
    },
    {
      name: "better-auth",
      logoImage: "better-auth.png"
    },
    {
      name: "react-hook-form",
      logoImage: "react-hook-form.png"
    },
    {
      name: "Zod",
      logoImage: "zod.png"
    }
  ])
  await db.insert(tableAppTranslations).values([
    {
      slug: "button_home",
      en_us: "Home",
      th_th: "หน้าแรก",
      zh_cn: "首页"
    },
    {
      slug: "button_pagetwo",
      en_us: "Page Two",
      th_th: "หน้าสอง",
      zh_cn: "页面二"
    },
    {
      slug: "button_protected",
      en_us: "Protected",
      th_th: "หน้าที่ป้องกัน",
      zh_cn: "受保护的页面"
    }
  ])
  console.log("✅ Database seeding completed.")
  process.exit(0)
}

seed()
