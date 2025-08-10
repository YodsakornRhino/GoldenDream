import { NextResponse } from "next/server"
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "@/lib/supabase-config"

export async function GET() {
  const hasUrl = Boolean(SUPABASE_URL)
  const hasAnonKey = Boolean(SUPABASE_ANON_KEY)

  const result = {
    ok: isSupabaseConfigured(),
    hasUrl,
    hasAnonKey,
    urlHost: hasUrl ? safeHost(SUPABASE_URL) : null,
    // No secrets are exposed. This endpoint is safe to call.
  }

  return NextResponse.json(result, { status: 200 })
}

function safeHost(urlString: string) {
  try {
    const { host } = new URL(urlString)
    return host
  } catch {
    return null
  }
}
