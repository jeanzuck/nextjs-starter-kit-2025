import { hasLocale, IntlErrorCode } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"
import { cachedGetAppTranslations } from "@/server/query/app-translations"

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const appTranslations = await cachedGetAppTranslations(locale)
  const messages = appTranslations.reduce((acc, { slug, text }) => ({ ...acc, [slug]: text }), {})

  return {
    locale,
    messages,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.error(error)
      } else {
        // Other errors indicate a bug in the app and should be reported
        // reportToErrorTracking(error)
        console.error(error)
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".")
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return path + " is not yet translated"
      } else {
        return "Dear developer, please fix this message: " + path
      }
    }
  }
})
