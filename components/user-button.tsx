"use client"

import { Button } from "@/components/ui/button"
import { Link, useRouter } from "@/i18n/navigation"
import { authClient } from "@/lib/auth-client"
import { Loader2Icon } from "lucide-react"
import { useTransition } from "react"

export default function UserButton() {
  const session = authClient.useSession()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  if (!session.data) {
    return (
      <Link href="/sign-in">
        <Button className="w-20">Sign in</Button>
      </Link>
    )
  } else {
    return (
      <Button
        className="w-20"
        variant="destructive"
        onClick={async () => {
          startTransition(async () => {
            // await new Promise((resolve) => setTimeout(resolve, 2000))
            await authClient.signOut()
            router.push("/")
          })
        }}
        disabled={isPending}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : "Sign out"}
      </Button>
    )
  }
}
