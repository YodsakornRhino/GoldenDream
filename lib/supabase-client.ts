"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config"
import type { Database } from "./database.types"

let client: SupabaseClient<Database> | null = null

export function getSupabaseClient(): SupabaseClient<Database> {
  if (client) return client

  client = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
    global: {
      headers: {
        "X-Client-Info": "dreamhome-web",
      },
    },
  })

  return client
}
