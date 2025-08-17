import type { ReactNode } from "react"
import { Suspense } from "react"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import ScrollToTop from "@/components/scroll-to-top"

export const metadata = {
  title: "DreamHome",
  description: "Find, list, and manage properties with DreamHome.",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {/* Navigation แสดงจาก layout ที่เดียว */}
        <Navigation />

        {/* เลื่อนขึ้นบนสุดอัตโนมัติเมื่อเปลี่ยนเส้นทาง */}
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>

        <main className="min-h-[60vh]">{children}</main>

        {/* Footer แสดงจาก layout ที่เดียว */}
        <Footer />

        {/* Global toasts */}
        <Toaster />
      </body>
    </html>
  )
}
