import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: {
        getItem: async (key: string) => {
          const cookieStore = await cookies()
          return cookieStore.get(key)?.value ?? null
        },
        setItem: async (key: string, value: string) => {
          const cookieStore = await cookies()
          cookieStore.set(key, value, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          })
        },
        removeItem: async (key: string) => {
          const cookieStore = await cookies()
          cookieStore.delete(key)
        },
      },
    },
  })
}
