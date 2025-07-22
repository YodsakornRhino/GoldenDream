import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Search, MapPin, Home, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const inter = Inter({ subsets: ["latin"] })

export default function BuyPage() {
  return (
    <div className={`${inter.className} bg-gray-50 min-h-screen`}>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Buy Your Dream Home</h1>
            <p className="text-xl opacity-90">Discover thousands of properties for sale</p>
          </div>

          {/* Advanced Search */}
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input placeholder="Location" className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-200k">$0 - $200,000</SelectItem>
                  <SelectItem value="200k-500k">$200,000 - $500,000</SelectItem>
                  <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                  <SelectItem value="1m+">$1,000,000+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2" size={20} />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="mr-2" size={20} />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Bedrooms</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <Button key={num} variant="outline" size="sm">
                          {num}+
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Bathrooms</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <Button key={num} variant="outline" size="sm">
                          {num}+
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Features</h3>
                    <div className="space-y-2">
                      {["Garage", "Pool", "Garden", "Fireplace", "Balcony"].map((feature) => (
                        <label key={feature} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          {feature}
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">1,234 Properties Found</h2>
                <div className="flex items-center gap-4">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="size">Size: Largest First</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex border rounded-lg">
                    <Button variant="ghost" size="sm">
                      <Grid size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                        <Home className="text-white" size={48} />
                      </div>
                      <Badge className="absolute top-2 left-2 bg-green-500">For Sale</Badge>
                      <div className="absolute top-2 right-2 text-2xl font-bold text-white">
                        ${(Math.random() * 500 + 200).toFixed(0)}K
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">Modern Family Home</h3>
                      <p className="text-gray-600 mb-3 flex items-center">
                        <MapPin size={16} className="mr-1" />
                        123 Oak Street, Downtown
                      </p>
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>3 Beds</span>
                        <span>2 Baths</span>
                        <span>1,200 sqft</span>
                      </div>
                      <Button className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Previous</Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button key={page} variant={page === 1 ? "default" : "outline"}>
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline">Next</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  )
}
