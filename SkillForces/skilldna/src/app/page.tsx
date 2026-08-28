import { LandingHero } from "@/components/landing/hero"
import { LandingProblem } from "@/components/landing/problem"
import { LandingHowItWorks } from "@/components/landing/how-it-works"
import { LandingFeatures } from "@/components/landing/features"
import { LandingDifferentiator } from "@/components/landing/differentiator"
import { LandingDemo } from "@/components/landing/demo"
import { LandingFooter } from "@/components/landing/footer"
import { Navigation } from "@/components/layout/navigation"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <LandingHero />
        <LandingProblem />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingDifferentiator />
        <LandingDemo />
      </main>
      <LandingFooter />
    </div>
  )
}