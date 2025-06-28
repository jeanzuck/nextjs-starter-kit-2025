"use client"

import { useTransition } from "react"
import { Check, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import { useSearchParams } from "next/navigation"
import { usePathname, useRouter } from "@/i18n/navigation"
import { T_Locale } from "@/app-config"

const languages = [
  { code: "en-us", name: "English", flag: "🇺🇸" },
  { code: "th-th", name: "ไทย", flag: "🇹🇭" },
  { code: "zh-cn", name: "中文", flag: "🇨🇳" }
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function setLocale(newLocale: T_Locale) {
    startTransition(() => {
      router.push(`${pathname}?${searchParams.toString()}`, { locale: newLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="lg" disabled={isPending}>
          {languages.find((lang) => lang.code === locale)?.name || "Select Language"}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLocale(language.code as T_Locale)}
            className="flex cursor-pointer items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span className="text-sm">{language.name}</span>
            </div>
            <Check className={cn("h-3 w-3", language.code == locale ? "opacity-100" : "opacity-0")} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
