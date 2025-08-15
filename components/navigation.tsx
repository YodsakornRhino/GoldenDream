"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Menu, User, Settings, HelpCircle, LogOut, Home } from "lucide-react"
import SignInModal from "./sign-in-modal"
import SignUpModal from "./sign-up-modal"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

declare global {
  interface Window {
    __DREAMHOME_NAV_MOUNTED?: boolean
  }
}

export default function Navigation() {
  const [allowRender, setAllowRender] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = getSupabaseClient()
  const { toast } = useToast()

  // Navigation links without Home since Logo serves as Home button
  const navLinks = [
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
      if (window.__DREAMHOME_NAV_MOUNTED) {
        window.__DREAMHOME_NAV_MOUNTED = false
      }
    }
  }, [])

  useEffect(() => {
    if (!allowRender) return

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)

        if (session?.user) {
          await fetchProfile(session.user.id)
        }
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, allowRender])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Signed out successfully",
          description: "You have been signed out of your account.",
        })
        setIsMobileMenuOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while signing out.",
        variant: "destructive",
      })
    } finally {
      setIsSignOutDialogOpen(false)
    }
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getUserDisplayName = () => {
    return profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"
  }

  // Don't render if not allowed (singleton protection)
  if (!allowRender) return null

  if (isLoading) {
    return (
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DreamHome</span>
            </Link>
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - serves as Home button */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DreamHome</span>
            </Link>

            {/* Desktop Navigation - without Home link */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url || ""} alt={getUserDisplayName()} />
                        <AvatarFallback className="bg-emerald-600 text-white">
                          {getInitials(getUserDisplayName())}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{getUserDisplayName()}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/help" className="flex items-center">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Help & Support
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={() => setIsSignOutDialogOpen(true)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setIsSignInOpen(true)}>
                    Sign In
                  </Button>
                  <Button onClick={() => setIsSignUpOpen(true)}>Sign Up</Button>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    {/* User Info */}
                    {user && (
                      <div className="flex items-center space-x-3 pb-6 border-b">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={profile?.avatar_url || ""} alt={getUserDisplayName()} />
                          <AvatarFallback className="bg-emerald-600 text-white">
                            {getInitials(getUserDisplayName())}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="font-medium">{getUserDisplayName()}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    )}

                    {/* Navigation Links - without Home */}
                    <nav className="flex flex-col space-y-4 py-6">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-lg font-medium text-gray-600 hover:text-emerald-600 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>

                    {/* Auth Section */}
                    <div className="mt-auto pt-6 border-t">
                      {user ? (
                        <div className="space-y-3">
                          <Link
                            href="/profile"
                            className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                          </Link>
                          <Link
                            href="/help"
                            className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <HelpCircle className="h-5 w-5" />
                            <span>Help & Support</span>
                          </Link>
                          <button
                            onClick={() => setIsSignOutDialogOpen(true)}
                            className="flex items-center space-x-3 text-red-600 hover:text-red-700 transition-colors w-full text-left"
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => {
                              setIsSignInOpen(true)
                              setIsMobileMenuOpen(false)
                            }}
                          >
                            Sign In
                          </Button>
                          <Button
                            className="w-full"
                            onClick={() => {
                              setIsSignUpOpen(true)
                              setIsMobileMenuOpen(false)
                            }}
                          >
                            Sign Up
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog open={isSignOutDialogOpen} onOpenChange={setIsSignOutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your DreamHome account. You can always sign back in anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut} className="bg-red-600 hover:bg-red-700">
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modals */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false)
          setIsSignUpOpen(true)
        }}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false)
          setIsSignInOpen(true)
        }}
      />
    </>
  )
}
