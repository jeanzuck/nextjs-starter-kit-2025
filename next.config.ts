import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  output: "standalone",
  experimental: {
    useCache: true
  }
}

export default withNextIntl(nextConfig)
