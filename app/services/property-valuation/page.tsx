import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Calculator, TrendingUp, MapPin, Home, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const inter = Inter({ subsets: ["latin"] })

export default function PropertyValuationPage() {
  return (
    <div className={`${inter.className} bg-gray-50 min-h-screen`}>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Free Property Valuation</h1>
              <p className="text-xl opacity-90 mb-8">
                Get an accurate estimate of your property's current market value in minutes
              </p>
              <div className="flex items-center gap-4 mb-6">
                <CheckCircle size={24} />
                <span>Instant online valuation</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <CheckCircle size={24} />
                <span>Based on recent market data</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle size={24} />
                <span>No obligation required</span>
              </div>
            </div>

            {/* Valuation Form */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Calculator className="mr-2" />
                  Get Your Property Value
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Property Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                    <Input placeholder="Enter full address" className="pl-10" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Property Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">Single Family House</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Bedrooms</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Beds" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bathrooms</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Baths" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="1.5">1.5</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="2.5">2.5</SelectItem>
                        <SelectItem value="3+">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Square Footage</label>
                  <Input placeholder="e.g., 1,500" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Year Built</label>
                  <Input placeholder="e.g., 1995" />
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                  <Calculator className="mr-2" size={20} />
                  Get My Property Value
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Our Valuation Works</h2>
            <p className="text-gray-600">
              Our advanced algorithm analyzes multiple data points for accurate valuations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Property Analysis</h3>
              <p className="text-gray-600">We analyze your property's features, size, age, and condition</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Comparison</h3>
              <p className="text-gray-600">Compare with recent sales of similar properties in your area</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">Get your property valuation instantly with detailed breakdown</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Factors Affecting Value */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Factors That Affect Property Value</h2>
            <p className="text-gray-600">Understanding what influences your property's market value</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Location", description: "Neighborhood, schools, amenities" },
              { title: "Size & Layout", description: "Square footage, bedrooms, bathrooms" },
              { title: "Condition", description: "Age, maintenance, renovations" },
              { title: "Market Trends", description: "Supply, demand, economic factors" },
              { title: "Comparable Sales", description: "Recent sales in the area" },
              { title: "Property Features", description: "Garage, pool, garden, upgrades" },
              { title: "Local Amenities", description: "Transportation, shopping, parks" },
              { title: "Future Development", description: "Planned infrastructure projects" },
            ].map((factor, index) => (
              <Card key={index} className="p-4">
                <h3 className="font-semibold mb-2">{factor.title}</h3>
                <p className="text-sm text-gray-600">{factor.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a More Detailed Valuation?</h2>
          <p className="text-gray-600 mb-8">Our expert agents can provide a comprehensive market analysis</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Schedule Professional Appraisal
            </Button>
            <Button size="lg" variant="outline">
              Speak with an Agent
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  )
}
