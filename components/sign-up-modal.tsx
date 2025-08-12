"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignIn: () => void
}

export default function SignUpModal({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) {
  const supabase = getSupabaseClient()
  const { toast } = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            phone: formData.phone.trim(),
          },
        },
      })

      if (error) {
        console.error("Sign up error:", error)
        toast({
          title: "Sign up failed",
          description: error.message || "Unable to create account. Please try again.",
          variant: "destructive",
        })
        return
      }

      if (data.user) {
        if (data.user.email_confirmed_at) {
          toast({
            title: "Account created",
            description: "Welcome to DreamHome! You're now signed in.",
          })
          onClose()
        } else {
          toast({
            title: "Check your email",
            description: "We've sent you a confirmation link to complete your registration.",
          })
          onClose()
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      toast({
        title: "Connection error",
        description: "Unable to connect to authentication service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => setShowPassword((v) => !v)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((v) => !v)

  const signUpWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })

      if (error) {
        toast({ title: "OAuth error", description: error.message, variant: "destructive" })
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to connect to Google. Please try again.",
        variant: "destructive",
      })
    }
  }

  const signUpWithFacebook = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })

      if (error) {
        toast({ title: "OAuth error", description: error.message, variant: "destructive" })
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to connect to Facebook. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[400px] sm:max-w-md mx-auto p-4 sm:p-6 max-h-[95vh] overflow-y-auto">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-gray-900">Create Account</DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center text-gray-600 px-2">
            Join DreamHome to find your perfect property
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="pl-10 h-11 sm:h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 h-11 sm:h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10 h-11 sm:h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 h-11 sm:h-12"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="pl-10 pr-10 h-11 sm:h-12"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-11 sm:h-12" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>

          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onSwitchToSignIn}
            className="w-full h-11 sm:h-12 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-4 sm:mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="h-10 sm:h-11 bg-transparent" onClick={signUpWithGoogle}>
              <span className="mr-2">🔵</span> Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 sm:h-11 bg-transparent"
              onClick={signUpWithFacebook}
            >
              <span className="mr-2">🔷</span> Facebook
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
