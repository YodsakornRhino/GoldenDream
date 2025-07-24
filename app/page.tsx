import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import FeaturedProperties from "@/components/featured-properties"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <CallToAction />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
