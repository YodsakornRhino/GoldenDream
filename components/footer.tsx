"use client"

import Link from "next/link"
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    __DREAMHOME_FOOTER_MOUNTED?: boolean
  }
}

/**
 * Footer พร้อมกันซ้ำ (singleton guard) เพื่อหลีกเลี่ยงการเรนเดอร์ซ้ำ
 * - ถ้ามี instance อื่นในหน้าอยู่แล้ว จะไม่เรนเดอร์ซ้ำ
 */
export default function Footer() {
  const [allowRender, setAllowRender] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.__DREAMHOME_FOOTER_MOUNTED) {
      setAllowRender(false)
      return
    }
    window.__DREAMHOME_FOOTER_MOUNTED = true
    setAllowRender(true)
    return () => {
      if (window.__DREAMHOME_FOOTER_MOUNTED) window.__DREAMHOME_FOOTER_MOUNTED = false
    }
  }, [])

  if (!allowRender) return null

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold mb-4 flex items-center hover:opacity-90">
              <Home className="mr-2" size={24} />
              DreamHome
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect property. We make real estate simple and accessible for
              everyone.
            </p>
            <div className="flex space-x-4">
              {/* Social links (placeholders) */}
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links - only pages that exist */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/buy" className="hover:text-white transition-colors">
                  Buy Properties
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-white transition-colors">
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white transition-colors">
                  Sell Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Phone className="mr-2" size={16} aria-hidden="true" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2" size={16} aria-hidden="true" />
                <span>info@dreamhome.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2" size={16} aria-hidden="true" />
                <span>123 Real Estate Ave</span>
              </li>
              <li className="ml-6">New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DreamHome. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
