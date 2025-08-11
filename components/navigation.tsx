"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { Home, LogOut, Menu, UserIcon, X } from "lucide-react"
import SignInModal from "./sign-in-modal"
import SignUpModal from "./sign-up-modal"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    __DREAMHOME_NAV_MOUNTED?: boolean
  }
}

/**
 * Navigation พร้อมกันซ้ำ (singleton guard) เพื่อหลีกเลี่ยงการเรนเดอร์ซ้ำ
 * - ถ้ามี instance อื่นในหน้าอยู่แล้ว จะไม่เรนเดอร์ซ้ำ
 */
export default function Navigation() {
  const supabase = getSupabaseClient()
  const { toast } = useToast()

  const [allowRender, setAllowRender] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)

  // โลโก้คือปุ่ม Home; เอา "Home" ออกไม่ให้ซ้ำ
  const links = [
    { href: "/buy", label: "Buy" },
    { href: "/rent", label: "Rent" },
    { href: "/sell", label: "Sell" },
    { href: "/blog", label: "Blog" },
  ]

  // กันซ้ำ: อนุญาตเรนเดอร์เฉพาะ instance แรก
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.__DREAMHOME_NAV_MOUNTED) {
      setAllowRender(false)
      return
    }
    window.__DREAMHOME_NAV_MOUNTED = true
    setAllowRender(true)
    return () => {
      // ปล่อย flag เมื่อ unmount
      if (window.__DREAMHOME_NAV_MOUNTED) window.__DREAMHOME_NAV_MOUNTED = false
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // โหลด user + subscribe auth changes
  useEffect(() => {
    let active = true
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return
      setUser(data.user ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [supabase])

  // Lock body scroll เมื่อเปิด mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const openSignInModal = () => {
    setIsSignInModalOpen(true)
    setIsMobileMenuOpen(false)
  }
  const closeSignInModal = () => setIsSignInModalOpen(false)
  const openSignUpModal = () => {
    setIsSignUpModalOpen(true)
    setIsSignInModalOpen(false)
  }
  const closeSignUpModal = () => setIsSignUpModalOpen(false)
  const switchToSignIn = () => {
    setIsSignUpModalOpen(false)
    setIsSignInModalOpen(true)
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const displayName =
    (user?.user_metadata?.username as string) ||
    (user?.user_metadata?.full_name as string) ||
    user?.email?.split("@")[0] ||
    "Account"

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    toast({ title: "Signed out", description: "You have been signed out." })
    closeMobileMenu()
  }

  if (!allowRender) return null

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur ${
          isScrolled ? "shadow-xl" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo = Home button */}
          <Link
            href="/"
            aria-label="Go to Home"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Home className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-semibold text-gray-900">DreamHome</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-gray-700 transition-colors hover:text-gray-900">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="px-3 py-2 rounded-lg border text-sm">
                  <span className="font-medium">{displayName}</span>{" "}
                  <span className="text-gray-500">@ {user.email}</span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={openSignInModal}
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center font-medium shadow-sm hover:shadow-md hover:bg-emerald-700"
              >
                <UserIcon className="mr-2" size={16} />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={closeMobileMenu}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Account block */}
          {user ? (
            <div className="mb-4 rounded-xl border border-gray-100 p-4 bg-gray-50">
              <div className="text-sm">
                <div className="font-semibold">{displayName}</div>
                <div className="text-gray-500">{user.email}</div>
              </div>
              <div className="mt-3 flex gap-3">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex-1 text-center text-sm font-medium px-3 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Home
                </Link>
                <button
                  onClick={signOut}
                  className="flex-1 text-center text-sm font-medium px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 px-4 pb-4">
              <button
                onClick={openSignInModal}
                className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center font-medium shadow-sm"
              >
                <UserIcon className="mr-2" size={18} />
                Sign In
              </button>
            </div>
          )}

          {/* Mobile Contact Info */}
          <div className="pt-6 border-t border-gray-200 mt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">Need help?</p>
              <p className="text-lg font-semibold text-emerald-700">(555) 123-4567</p>
              <p className="text-sm text-gray-500">info@dreamhome.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} onSwitchToSignUp={openSignUpModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} onSwitchToSignIn={switchToSignIn} />
    </>
  )
}
