import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if both URL and key are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Helper function to safely get the client
export function getSupabaseClient() {
  if (!supabase) {
    console.warn("Supabase client not initialized - missing environment variables")
    return null
  }
  return supabase
}
