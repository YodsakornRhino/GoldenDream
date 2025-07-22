import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4 flex items-center">
              <Home className="mr-2" size={24} />
              DreamHome
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect property. We make real estate simple and accessible for
              everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Buy Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Rent Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sell Property
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Find Agents
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Market Trends
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Buying Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Selling Tips
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Phone className="mr-2" size={16} />
                (555) 123-4567
              </li>
              <li className="flex items-center">
                <Mail className="mr-2" size={16} />
                info@dreamhome.com
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2" size={16} />
                123 Real Estate Ave
              </li>
              <li className="ml-6">New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DreamHome. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
