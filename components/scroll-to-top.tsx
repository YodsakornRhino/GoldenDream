"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * ScrollToTop: เลื่อนหน้าไปบนสุดทุกครั้งที่เส้นทางเปลี่ยน
 */
export default function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // หน่วงเล็กน้อยให้ DOM อัปเดตก่อน
    const id = window.requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch {
        window.scrollTo(0, 0)
      }
    })
    return () => window.cancelAnimationFrame(id)
  }, [pathname, searchParams])

  return null
}
