import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/sonner"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DreamHome - Find Your Perfect Property",
  description:
    "Discover amazing properties for sale and rent. Your dream home awaits with DreamHome real estate platform.",
  generator: "DreamHome Real Estate",
  keywords: ["real estate", "properties", "homes", "apartments", "buy", "rent", "sell"],
  authors: [{ name: "DreamHome Team" }],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "white",
                color: "black",
                border: "1px solid #e5e7eb",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
