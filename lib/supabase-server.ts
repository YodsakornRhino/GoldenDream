import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config"

export function createSupabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        // In App Router, cookies() is mutable during the request lifecycle
        cookieStore.set(name, value, options as any)
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set(name, "", { ...options, maxAge: 0 } as any)
      },
    },
  })
}
