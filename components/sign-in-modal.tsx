"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignUp: () => void
}

export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const supabase = getSupabaseClient()
  const { toast } = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      })

      if (error) {
        console.error("Sign in error:", error)
        toast({
          title: "Sign in failed",
          description: error.message || "Unable to sign in. Please check your credentials.",
          variant: "destructive",
        })
        return
      }

      if (data.user) {
        toast({ title: "Signed in", description: "Welcome back to DreamHome!" })
        onClose()
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

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast({ title: "Enter your email", description: "Please enter your email above first." })
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email.trim(), {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) {
        toast({ title: "Reset failed", description: error.message, variant: "destructive" })
        return
      }

      toast({ title: "Password reset sent", description: "Check your inbox for the reset link." })
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to send reset email. Please try again.",
        variant: "destructive",
      })
    }
  }

  const togglePasswordVisibility = () => setShowPassword((v) => !v)

  const signInWithGoogle = async () => {
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

  const signInWithFacebook = async () => {
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
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-gray-900">Welcome Back</DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center text-gray-600 px-2">
            Sign in to your DreamHome account
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
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
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 h-11 sm:h-12"
                required
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

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full h-11 sm:h-12" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onSwitchToSignUp}
            className="w-full h-11 sm:h-12 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            disabled={isSubmitting}
          >
            Create Account
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
            <Button type="button" variant="outline" className="h-10 sm:h-11 bg-transparent" onClick={signInWithGoogle}>
              <span className="mr-2">🔵</span> Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 sm:h-11 bg-transparent"
              onClick={signInWithFacebook}
            >
              <span className="mr-2">🔷</span> Facebook
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
