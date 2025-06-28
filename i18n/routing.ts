import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["th-th", "en-us", "zh-cn"],
  defaultLocale: "th-th",
  localeCookie: {
    name: "APP_LOCALE",
    maxAge: 60 * 60 * 24 * 365
  },
  localeDetection: true
})
