import { Metadata, Viewport } from "next"
import { routing } from "@/i18n/routing"

export const APP_DEFAULT_VIEWPORT: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-content"
}

export const APP_DEFAULT_METADATA: Metadata = {
  title: "Aeva Travel",
  description: "Aeva Travel",
  robots: {
    index: false,
    follow: false
  },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon-96x96.png"
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/favicon.svg"
      },
      {
        rel: "shortcut icon",
        url: "/favicon.ico"
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png"
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png"
      }
    ]
  },
  appleWebApp: {
    capable: true,
    title: "Aeva Travel",
    statusBarStyle: "default"
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
}

export type T_Locale = (typeof routing.locales)[number]
