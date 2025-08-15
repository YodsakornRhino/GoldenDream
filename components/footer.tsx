"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"

declare global {
  interface Window {
    __DREAMHOME_FOOTER_MOUNTED?: boolean
  }
}

export default function Footer() {
  // Singleton guard to prevent duplicate Footer rendering
  if (typeof window !== "undefined") {
    if (window.__DREAMHOME_FOOTER_MOUNTED) {
      return null
    }
    window.__DREAMHOME_FOOTER_MOUNTED = true
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DH</span>
              </div>
              <span className="text-xl font-bold">DreamHome</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              แพลตฟอร์มอสังหาริมทรัพย์ครบวงจรสำหรับทุกคน ค้นหา ซื้อ เช่า หรือประกาศขายได้ในที่เดียว ปลอดภัย และสะดวกขึ้นด้วยเทคโนโลยีสมัยใหม่
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/buy" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Buy Properties
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Sell Properties
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Blog & News
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400 text-sm">+66 2 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400 text-sm">info@dreamhome.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-emerald-400 mt-0.5" />
                <span className="text-gray-400 text-sm">123 Business District, Bangkok 10110, Thailand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 DreamHome. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
              Terms
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
