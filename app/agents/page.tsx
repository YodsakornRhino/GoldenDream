import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Star, Phone, Mail, Award, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const inter = Inter({ subsets: ["latin"] })

export default function AgentsPage() {
  const agents = [
    {
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      specialties: ["Luxury Homes", "First-time Buyers"],
      rating: 4.9,
      reviews: 127,
      sales: 89,
      experience: "8 years",
      phone: "(555) 123-4567",
      email: "sarah@dreamhome.com",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Michael Chen",
      title: "Commercial Specialist",
      specialties: ["Commercial", "Investment"],
      rating: 4.8,
      reviews: 94,
      sales: 156,
      experience: "12 years",
      phone: "(555) 234-5678",
      email: "michael@dreamhome.com",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Emily Rodriguez",
      title: "Residential Expert",
      specialties: ["Family Homes", "Condos"],
      rating: 4.9,
      reviews: 203,
      sales: 134,
      experience: "6 years",
      phone: "(555) 345-6789",
      email: "emily@dreamhome.com",
      image: "/placeholder-user.jpg",
    },
    {
      name: "David Thompson",
      title: "Luxury Property Specialist",
      specialties: ["Luxury", "Waterfront"],
      rating: 5.0,
      reviews: 78,
      sales: 67,
      experience: "15 years",
      phone: "(555) 456-7890",
      email: "david@dreamhome.com",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Lisa Park",
      title: "New Construction Expert",
      specialties: ["New Builds", "Developments"],
      rating: 4.8,
      reviews: 112,
      sales: 98,
      experience: "9 years",
      phone: "(555) 567-8901",
      email: "lisa@dreamhome.com",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Robert Wilson",
      title: "Investment Advisor",
      specialties: ["Investments", "Rentals"],
      rating: 4.7,
      reviews: 156,
      sales: 201,
      experience: "11 years",
      phone: "(555) 678-9012",
      email: "robert@dreamhome.com",
      image: "/placeholder-user.jpg",
    },
  ]

  return (
    <div className={`${inter.className} bg-gray-50 min-h-screen`}>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Expert Agents</h1>
            <p className="text-xl opacity-90">Professional real estate agents ready to help you succeed</p>
          </div>

          {/* Agent Search */}
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl mx-auto">
            <div className="flex gap-4">
              <Input placeholder="Search by name, specialty, or location" className="flex-1" />
              <Button className="bg-indigo-600 hover:bg-indigo-700">Find Agent</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Agents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">2,500+</div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Top Agents</h2>
            <p className="text-gray-600">Choose from our experienced team of real estate professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={agent.image || "/placeholder.svg"} alt={agent.name} />
                    <AvatarFallback>
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <p className="text-gray-600">{agent.title}</p>

                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(agent.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      {agent.rating} ({agent.reviews} reviews)
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty, i) => (
                      <Badge key={i} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                      <span>{agent.sales} Sales</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{agent.experience}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{agent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{agent.email}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1" size="sm">
                      Contact Agent
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Agents */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Agents?</h2>
            <p className="text-gray-600">Our agents provide exceptional service and expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">Deep knowledge of local markets, neighborhoods, and trends</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
              <p className="text-gray-600">Consistent results and satisfied clients across all price ranges</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
              <p className="text-gray-600">Access to exclusive market data and pricing strategies</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with an Agent?</h2>
          <p className="text-gray-600 mb-8">Get matched with the perfect agent for your needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Find My Agent
            </Button>
            <Button size="lg" variant="outline">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  )
}
