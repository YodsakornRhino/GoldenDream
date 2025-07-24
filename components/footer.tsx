import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DH</span>
              </div>
              <span className="text-xl font-bold">DreamHome</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner in finding the perfect home. We make real estate dreams come true.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/buy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Buy Properties
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Find Agents
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/property-valuation"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mortgage-calculator"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/services/market-reports"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Market Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">info@dreamhome.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">123 Real Estate Ave, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} DreamHome. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
