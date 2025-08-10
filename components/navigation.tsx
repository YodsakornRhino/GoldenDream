"use client"

import { useEffect, useState } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { Home, UserIcon, LogOut } from "lucide-react"
import SignInModal from "./sign-in-modal"
import SignUpModal from "./sign-up-modal"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

export default function Navigation() {
  const supabase = getSupabaseClient()
  const { toast } = useToast()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Load user, update on auth changes
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

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const openSignInModal = () => {
    setIsSignInModalOpen(true)
    closeMobileMenu()
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

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

  return (
    <>
      <nav
        className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-xl backdrop-blur-sm bg-white/95" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <a
                href="/"
                className="text-xl sm:text-2xl font-bold text-blue-600 flex items-center cursor-pointer hover:text-blue-700 transition-colors"
              >
                <Home className="mr-2" size={24} />
                <span className="hidden xs:inline">DreamHome</span>
                <span className="xs:hidden">DH</span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <a
                href="/buy"
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Buy
              </a>
              <a
                href="/rent"
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Rent
              </a>
              <a
                href="/sell"
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Sell
              </a>
              <a
                href="/blog"
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Blog
              </a>
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="px-3 py-2 rounded-lg border text-sm">
                    <span className="font-medium">{displayName}</span>{" "}
                    <span className="text-gray-500">@ {user.email}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={openSignInModal}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  <UserIcon className="mr-2" size={16} />
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute block w-6 h-0.5 bg-gray-700 transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-3" : "top-1"
                  }`}
                />
                <span
                  className={`absolute block w-6 h-0.5 bg-gray-700 transform transition-all duration-300 top-3 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block w-6 h-0.5 bg-gray-700 transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-3" : "top-5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-16 left-0 right-0 bg-white border-t shadow-xl transform transition-all duration-300 ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Account block */}
            {user ? (
              <div className="mb-4 rounded-xl border border-gray-100 p-4 bg-gray-50">
                <div className="text-sm">
                  <div className="font-semibold">{displayName}</div>
                  <div className="text-gray-500">{user.email}</div>
                </div>
                <div className="mt-3 flex gap-3">
                  <a
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex-1 text-center text-sm font-medium px-3 py-2 rounded-lg border hover:bg-gray-100"
                  >
                    Home
                  </a>
                  <button
                    onClick={signOut}
                    className="flex-1 text-center text-sm font-medium px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : null}

            {/* Mobile Navigation Links */}
            <a
              href="/buy"
              className="block text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Buy Properties
            </a>
            <a
              href="/rent"
              className="block text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Rent Properties
            </a>
            <a
              href="/sell"
              className="block text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Sell Property
            </a>

            <div className="border-b border-gray-100">
              <div className="py-3 px-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Services</h3>
                <div className="space-y-2 ml-2">
                  <a
                    href="/agents"
                    className="block text-gray-600 py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    onClick={closeMobileMenu}
                  >
                    Find Agents
                  </a>
                  <a
                    href="/services/property-valuation"
                    className="block text-gray-600 py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    onClick={closeMobileMenu}
                  >
                    Property Valuation
                  </a>
                  <a
                    href="/services/mortgage-calculator"
                    className="block text-gray-600 py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    onClick={closeMobileMenu}
                  >
                    Mortgage Calculator
                  </a>
                  <a
                    href="/services/market-reports"
                    className="block text-gray-600 py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    onClick={closeMobileMenu}
                  >
                    Market Reports
                  </a>
                </div>
              </div>
            </div>

            <a
              href="/blog"
              className="block text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Blog
            </a>

            {/* Mobile Sign In Button (only when signed out) */}
            {!user && (
              <div className="pt-4">
                <button
                  onClick={openSignInModal}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center font-medium shadow-sm"
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
                <p className="text-lg font-semibold text-blue-600">(555) 123-4567</p>
                <p className="text-sm text-gray-500">info@dreamhome.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} onSwitchToSignUp={openSignUpModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} onSwitchToSignIn={switchToSignIn} />
    </>
  )
}
