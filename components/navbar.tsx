"use client"

import { Menu } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import LanguageSwitcher from "./language-switcher"
import { useTranslations } from "next-intl"
import UserButton from "./user-button"

export default function Navbar() {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "button_home", href: "/" },
    { name: "button_pagetwo", href: "/pagetwo" },
    { name: "button_protected", href: "/protected" }
  ]

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">Nextjs Starter Kit 2025</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 lg:flex">
          {navItems.map((item) => (
            <Button
              key={item.name}
              className="px-3 text-sm font-medium"
              variant="ghost"
              size="lg"
              onClick={() => setIsOpen(false)}
              asChild
            >
              <Link href={item.href}>{t(item.name)}</Link>
            </Button>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <UserButton />
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden" aria-label="Toggle menu">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through the application</SheetDescription>
            </SheetHeader>
            <div className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start"
                  size="lg"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href={item.href}>{t(item.name)}</Link>
                </Button>
              ))}
              <Separator className="my-4" />
              <div className="px-4">
                <LanguageSwitcher />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
