import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "@/i18n/navigation"
import { getLocale } from "next-intl/server"

export default async function PageProtected() {
  const locale = await getLocale()
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return redirect({ href: `/sign-in?callbackUrl=/protected`, locale })
  }

  return (
    <>
      <h1 className="mb-4 text-center text-3xl font-bold">Welcome</h1>
      <p className="text-center text-gray-700">This is a sample page.</p>
    </>
  )
}
