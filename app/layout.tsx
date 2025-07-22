import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GoldenDream',
  description: 'Created with Group',
  generator: 'GD.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
