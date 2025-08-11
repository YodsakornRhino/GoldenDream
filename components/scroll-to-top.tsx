"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

type Props = {
  behavior?: ScrollBehavior
}

export default function ScrollToTop({ behavior = "smooth" }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Ensure smooth scroll to top on route changes
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior })
    }
  }, [pathname, searchParams?.toString(), behavior])

  return null
}
