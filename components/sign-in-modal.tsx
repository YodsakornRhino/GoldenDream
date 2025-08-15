"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignUp: () => void
}

export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [isResetLoading, setIsResetLoading] = useState(false)

  const supabase = getSupabaseClient()
  const { toast } = useToast()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        })
        onClose()
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResetLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) {
        toast({
          title: "Reset failed",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Reset email sent",
          description: "Check your email for password reset instructions.",
        })
        setShowForgotPassword(false)
        setResetEmail("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResetLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setEmail("")
    setPassword("")
    setShowForgotPassword(false)
    setResetEmail("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{showForgotPassword ? "Reset Password" : "Sign In"}</DialogTitle>
          <DialogDescription>
            {showForgotPassword
              ? "Enter your email address and we'll send you a link to reset your password."
              : "Enter your email and password to sign in to your account."}
          </DialogDescription>
        </DialogHeader>

        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Button type="submit" disabled={isResetLoading} className="w-full">
                {isResetLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowForgotPassword(false)} className="w-full">
                Back to Sign In
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowForgotPassword(true)}
                className="w-full text-sm"
              >
                Forgot your password?
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Button
                type="button"
                variant="link"
                onClick={onSwitchToSignUp}
                className="p-0 h-auto font-normal text-emerald-600 hover:text-emerald-700"
              >
                Sign up
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
