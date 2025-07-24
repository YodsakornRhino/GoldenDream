"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, ChevronDown, User, LogOut } from "lucide-react"
import SignInModal from "./sign-in-modal"
import SignUpModal from "./sign-up-modal"
import { useAuth } from "@/lib/auth-context"

export default function Navigation() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const { user, loading, signOut } = useAuth()

  const handleSwitchToSignUp = () => {
    setIsSignInOpen(false)
    setIsSignUpOpen(true)
  }

  const handleSwitchToSignIn = () => {
    setIsSignUpOpen(false)
    setIsSignInOpen(true)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DH</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DreamHome</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/buy" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Buy
              </Link>
              <Link href="/rent" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Rent
              </Link>
              <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Sell
              </Link>

              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/services/property-valuation">Property Valuation</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/mortgage-calculator">Mortgage Calculator</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/market-reports">Market Reports</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/agents" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Agents
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Blog
              </Link>
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {getUserInitials(user.email || "")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="flex flex-col items-start">
                      <div className="font-medium">{user.user_metadata?.username || "User"}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setIsSignInOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link href="/buy" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                      Buy Properties
                    </Link>
                    <Link href="/rent" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                      Rent Properties
                    </Link>
                    <Link href="/sell" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                      Sell Property
                    </Link>
                    <Link
                      href="/services/property-valuation"
                      className="text-lg font-medium text-gray-700 hover:text-blue-600"
                    >
                      Property Valuation
                    </Link>
                    <Link
                      href="/services/mortgage-calculator"
                      className="text-lg font-medium text-gray-700 hover:text-blue-600"
                    >
                      Mortgage Calculator
                    </Link>
                    <Link
                      href="/services/market-reports"
                      className="text-lg font-medium text-gray-700 hover:text-blue-600"
                    >
                      Market Reports
                    </Link>
                    <Link href="/agents" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                      Find Agents
                    </Link>
                    <Link href="/blog" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                      Blog
                    </Link>

                    <div className="pt-4 border-t">
                      {loading ? (
                        <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
                      ) : user ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-600 text-white">
                                {getUserInitials(user.email || "")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{user.user_metadata?.username || "User"}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                          <Button
                            onClick={handleSignOut}
                            variant="outline"
                            className="w-full justify-start bg-transparent"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setIsSignInOpen(true)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Sign In
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </>
  )
}
