"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { Home, UserIcon, LogOut, Menu, X, User, Settings, HelpCircle } from "lucide-react"
import SignInModal from "./sign-in-modal"
import SignUpModal from "./sign-up-modal"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

declare global {
  interface Window {
    __DREAMHOME_NAV_MOUNTED?: boolean
  }
}

export default function Navigation() {
  const supabase = getSupabaseClient()
  const { toast } = useToast()

  const [allowRender, setAllowRender] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false)

  // Logo = Home button; remove "Home" item to avoid duplication
  const links = [
    { href: "/buy", label: "Buy" },
    { href: "/rent", label: "Rent" },
    { href: "/sell", label: "Sell" },
    { href: "/blog", label: "Blog" },
  ]

  // Singleton guard to prevent duplicate Navigation rendering
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.__DREAMHOME_NAV_MOUNTED) {
      setAllowRender(false)
      return
    }
    window.__DREAMHOME_NAV_MOUNTED = true
    setAllowRender(true)
    return () => {
      if (window.__DREAMHOME_NAV_MOUNTED) window.__DREAMHOME_NAV_MOUNTED = false
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Load user + listen auth changes
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

  // Lock page scroll when mobile menu open; menu itself is scrollable
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const confirmSignOut = () => {
    setIsSignOutDialogOpen(true)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    toast({ title: "Signed out", description: "You have been signed out." })
    closeMobileMenu()
    setIsSignOutDialogOpen(false)
  }

  if (!allowRender) return null

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur ${
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
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt={displayName} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-medium">
                      {getInitials(displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">{displayName}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/help" className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Help & Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={confirmSignOut}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

      {/*
Mobile overlay + Drawer (scrollable with slide animation)
*/}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto bg-black/40" : "opacity-0 pointer-events-none bg-black/0"}`}
          onClick={closeMobileMenu}
          aria-hidden={!isMobileMenuOpen}
        />
        {/* Drawer */}
        <div
          className={`fixed inset-x-0 top-16 bottom-0 z-50 md:hidden bg-white border-t will-change-transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-y-0" : "translate-y-full"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col overflow-y-auto px-4 py-3 sm:px-6 lg:px-8 pb-[calc(16px+env(safe-area-inset-bottom))]">
            {/* Nav links */}
            <nav>
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
              <div className="mt-4 rounded-xl border border-gray-100 p-4 bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt={displayName} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-medium">
                      {getInitials(displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">
                      {(user.user_metadata?.full_name as string) ||
                        (user.user_metadata?.username as string) ||
                        displayName}
                    </div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <Link
                    href="/help"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </Link>
                  <button
                    onClick={confirmSignOut}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-3">
                <button
                  onClick={openSignInModal}
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center font-medium shadow-sm"
                >
                  <UserIcon className="mr-2" size={18} />
                  Sign In
                </button>
              </div>
            )}

            {/* Contact info */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">Need help?</p>
                <p className="text-lg font-semibold text-emerald-700">(555) 123-4567</p>
                <p className="text-sm text-gray-500">info@dreamhome.com</p>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Modals */}
      <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} onSwitchToSignUp={openSignUpModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} onSwitchToSignIn={switchToSignIn} />

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog open={isSignOutDialogOpen} onOpenChange={setIsSignOutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={signOut} className="bg-red-600 hover:bg-red-700">
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
