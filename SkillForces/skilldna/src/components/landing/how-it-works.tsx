"use client"

import { cn } from "@/lib/utils"
import { Upload, Brain, MapPin, TrendingUp, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Understand",
    description: "Upload your resume, projects, and skills. Our AI builds a comprehensive picture of your current capabilities.",
    details: ["Resume parsing", "Project analysis", "Skill extraction", "GitHub integration"],
  },
  {
    number: "02",
    icon: Brain,
    title: "Analyze",
    description: "AI builds your Skill DNA and identifies precise gaps against your target career's industry requirements.",
    details: ["Skill DNA profile", "Gap analysis", "Career matching", "Priority ranking"],
  },
  {
    number: "03",
    icon: MapPin,
    title: "Guide",
    description: "Get a personalized adaptive roadmap with weekly milestones, project recommendations, and learning resources.",
    details: ["Weekly milestones", "Project ideas", "Resource curation", "Progress tracking"],
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Improve",
    description: "Track progress, continuously increase industry readiness, and stay updated with personalized tech intelligence.",
    details: ["Readiness scoring", "Achievement system", "Tech feed", "Continuous adaptation"],
  },
]

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Four steps from confusion to clarity. Each step builds on the previous, creating a 
            continuous loop of improvement.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-transparent -translate-x-1/2 hidden lg:block" />
          
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div 
                key={step.title} 
                className="relative flex flex-col lg:flex-row gap-8 items-start"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative z-10 flex-shrink-0 w-full lg:w-32">
                  <div className="flex items-center justify-center lg:justify-end">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30">
                      <span className="text-2xl font-bold text-primary">{step.number}</span>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-transparent -translate-x-1/2 hidden lg:block" />
                  )}
                </div>
                
                <div className="flex-1 lg:pl-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail) => (
                      <span 
                        key={detail} 
                        className="px-3 py-1 text-xs rounded-full bg-muted border border-border/50 text-muted-foreground"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block lg:w-8 flex items-center justify-center text-primary/50">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}