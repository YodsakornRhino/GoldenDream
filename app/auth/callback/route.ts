import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"

// Exchanges the OAuth/email confirmation code for a session, then redirects.
// Based on Supabase's App Router example. [^1]
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  let next = searchParams.get("next") ?? "/"
  if (!next.startsWith("/")) next = "/"

  if (code) {
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = (request.headers.get("x-forwarded-host") || "").trim()
      const isLocal = process.env.NODE_ENV === "development"
      if (isLocal) return NextResponse.redirect(`${origin}${next}`)
      if (forwardedHost) return NextResponse.redirect(`https://${forwardedHost}${next}`)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
