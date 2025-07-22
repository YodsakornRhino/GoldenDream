import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { TrendingUp, TrendingDown, BarChart3, Download, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const inter = Inter({ subsets: ["latin"] })

export default function MarketReportsPage() {
  return (
    <div className={`${inter.className} bg-gray-50 min-h-screen`}>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-600 to-gray-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Market Reports & Analytics</h1>
            <p className="text-xl opacity-90">Stay informed with comprehensive real estate market data and trends</p>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Market Overview</h2>
            <p className="text-gray-600">Key metrics for the current real estate market</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">$485K</div>
                <div className="text-gray-600 mb-2">Median Home Price</div>
                <div className="flex items-center justify-center text-green-600">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">+5.2% YoY</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">28</div>
                <div className="text-gray-600 mb-2">Days on Market</div>
                <div className="flex items-center justify-center text-red-600">
                  <TrendingDown size={16} className="mr-1" />
                  <span className="text-sm">-12% YoY</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1,234</div>
                <div className="text-gray-600 mb-2">Active Listings</div>
                <div className="flex items-center justify-center text-green-600">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">+8.1% YoY</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">6.8%</div>
                <div className="text-gray-600 mb-2">Mortgage Rate</div>
                <div className="flex items-center justify-center text-red-600">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">+1.2% YoY</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports */}
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly">Monthly Reports</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly Reports</TabsTrigger>
              <TabsTrigger value="annual">Annual Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "March 2024 Market Report",
                    date: "March 2024",
                    location: "All Areas",
                    highlights: ["Price growth slowing", "Inventory increasing", "Buyer activity steady"],
                  },
                  {
                    title: "February 2024 Market Report",
                    date: "February 2024",
                    location: "All Areas",
                    highlights: ["Spring market prep", "New listings up", "Interest rates stable"],
                  },
                  {
                    title: "January 2024 Market Report",
                    date: "January 2024",
                    location: "All Areas",
                    highlights: ["New year trends", "Seasonal patterns", "Forecast updates"],
                  },
                ].map((report, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {report.date}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          {report.location}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {report.highlights.map((highlight, i) => (
                          <Badge key={i} variant="secondary" className="mr-2">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        <Download size={16} className="mr-2" />
                        Download Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quarterly" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Q1 2024 Quarterly Analysis",
                    period: "January - March 2024",
                    keyMetrics: ["Market performance", "Seasonal trends", "Economic factors"],
                  },
                  {
                    title: "Q4 2023 Quarterly Analysis",
                    period: "October - December 2023",
                    keyMetrics: ["Year-end summary", "Holiday market", "Annual comparison"],
                  },
                ].map((report, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{report.title}</CardTitle>
                      <p className="text-gray-600">{report.period}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {report.keyMetrics.map((metric, i) => (
                          <Badge key={i} variant="outline" className="mr-2">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full">
                        <Download size={16} className="mr-2" />
                        Download Full Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="annual" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "2023 Annual Market Review",
                    year: "2023",
                    sections: ["Market performance", "Price trends", "Future outlook", "Economic impact"],
                  },
                  {
                    title: "2022 Annual Market Review",
                    year: "2022",
                    sections: ["Historical data", "Comparative analysis", "Market shifts", "Predictions"],
                  },
                ].map((report, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{report.title}</CardTitle>
                      <p className="text-gray-600">Comprehensive {report.year} Analysis</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {report.sections.map((section, i) => (
                          <Badge key={i} variant="outline" className="mr-2 mb-2">
                            {section}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full" size="lg">
                        <Download size={16} className="mr-2" />
                        Download Annual Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Neighborhood Reports */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Neighborhood Reports</h2>
            <p className="text-gray-600">Detailed analysis by specific areas and neighborhoods</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Downtown", avgPrice: "$520K", change: "+6.2%", listings: 89 },
              { name: "Midtown", avgPrice: "$485K", change: "+4.8%", listings: 156 },
              { name: "Suburbs", avgPrice: "$425K", change: "+3.1%", listings: 234 },
              { name: "Waterfront", avgPrice: "$750K", change: "+8.9%", listings: 45 },
              { name: "Historic District", avgPrice: "$395K", change: "+2.4%", listings: 67 },
              { name: "New Development", avgPrice: "$580K", change: "+12.1%", listings: 78 },
            ].map((neighborhood, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{neighborhood.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Price</span>
                      <span className="font-semibold">{neighborhood.avgPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">YoY Change</span>
                      <span className="font-semibold text-green-600">{neighborhood.change}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Listings</span>
                      <span className="font-semibold">{neighborhood.listings}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    <BarChart3 size={16} className="mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Get the latest market reports delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 border rounded-lg" />
            <Button className="bg-slate-600 hover:bg-slate-700">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  )
}
