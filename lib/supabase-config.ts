// Centralized Supabase configuration for both client and server code.
// Uses environment variables first, then falls back to your provided project values
// so the app connects immediately in preview.
//
// For production, set these in your project settings and remove/override the defaults:
// NEXT_PUBLIC_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY
//
// Client-side variables must be prefixed with NEXT_PUBLIC to be accessible in the browser.

const DEFAULT_URL = "https://gjucezhoahgooomrhugj.supabase.co"
const DEFAULT_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdWNlemhvYWhnb29vbXJodWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MTMzMjgsImV4cCI6MjA3MDM4OTMyOH0.0Y9INqTD5bKMot0EDIquYYqGA0AvJGjT0TU0THY5jlU"

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON

/**
 * Returns true if both URL and ANON KEY are present.
 */
export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL) && Boolean(SUPABASE_ANON_KEY)
}

/**
 * Safe getter used by client and server factories.
 */
export function getSupabaseConfig() {
  return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY }
}
