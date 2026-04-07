import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TargetAudienceSection } from "@/components/target-audience-section"
import { ModulesSection } from "@/components/modules-section"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TargetAudienceSection />
      <ModulesSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </main>
  )
}
