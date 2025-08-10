"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
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
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" })
      return
    }
    if (!formData.agreeToTerms) {
      toast({ title: "Please agree to the terms and conditions", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    const { data, error } = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password,
      options: {
        data: { username: formData.username.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    setIsSubmitting(false)

    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" })
      return
    }

    if (!data.session) {
      toast({
        title: "Check your email",
        description: "We sent a confirmation link to complete your registration.",
      })
    } else {
      toast({ title: "Account created", description: "You're now signed in." })
    }

    onClose()
  }

  const togglePasswordVisibility = () => setShowPassword((v) => !v)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((v) => !v)

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
            <Label htmlFor="signup-username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="signup-username"
                name="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleInputChange}
                className="pl-10 h-11 sm:h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="signup-email"
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
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="pl-10 pr-10 h-11 sm:h-12"
                required
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

          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData((p) => ({ ...p, agreeToTerms: Boolean(checked) }))}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <button type="button" className="text-blue-600 hover:underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="text-blue-600 hover:underline">
                Privacy Policy
              </button>
            </Label>
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
              <span className="px-3 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-10 sm:h-11 bg-transparent"
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: { redirectTo: `${window.location.origin}/auth/callback` },
                })
              }
            >
              <span className="mr-2">🔵</span> Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 sm:h-11 bg-transparent"
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: "facebook",
                  options: { redirectTo: `${window.location.origin}/auth/callback` },
                })
              }
            >
              <span className="mr-2">🔷</span> Facebook
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
