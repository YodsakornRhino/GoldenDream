import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "DreamHome - Find Your Perfect Property",
  description:
    "Discover amazing properties for sale and rent. Your dream home awaits with DreamHome real estate platform.",
  generator: "DreamHome Real Estate",
  keywords: ["real estate", "properties", "homes", "apartments", "buy", "rent", "sell"],
  authors: [{ name: "DreamHome Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          {children}
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
