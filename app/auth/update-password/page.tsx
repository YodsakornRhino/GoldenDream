"use client"

import type React from "react"

import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function UpdatePasswordPage() {
  const supabase = getSupabaseClient()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" })
      return
    }
    if (password !== confirm) {
      toast({ title: "Passwords do not match", variant: "destructive" })
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" })
      return
    }
    toast({ title: "Password updated", description: "You can now continue using your account." })
    // Optionally redirect home:
    // window.location.href = "/"
  }

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 border rounded-lg p-6">
        <h1 className="text-2xl font-semibold">Set a new password</h1>
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm new password</Label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter new password"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update password"}
        </Button>
      </form>
    </main>
  )
}
