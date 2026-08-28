"use client"

import { cn } from "@/lib/utils"
import { 
  ArrowDown, 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  CheckCircle,
  Search, 
  MapPin, 
  Code,
  Briefcase
} from "lucide-react"

const pipelineSteps = [
  { label: "Internet Data", icon: Zap, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "AI Understanding", icon: Brain, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { label: "Trend Detection", icon: TrendingUp, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  { label: "Industry Demand", icon: Target, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { label: "Your Skill DNA", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { label: "Skill Gap", icon: Search, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { label: "Personalized Roadmap", icon: MapPin, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { label: "Projects", icon: Code, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { label: "Progress", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Industry Readiness", icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
]

export function LandingDifferentiator() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-blue-500/5" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Core Differentiator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            From Information to Action
          </h2>
          <p className="text-lg text-muted-foreground">
            SkillDNA doesn't just aggregate data. It transforms raw information through a 10-stage 
            intelligence pipeline that ends in personalized action.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {pipelineSteps.map((step, index) => (
              <div 
                key={step.label} 
                className="flex flex-col items-center relative z-10 flex-shrink-0"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className={cn("relative flex h-20 w-20 items-center justify-center rounded-2xl border group hover-lift", step.bg)}>
                  <step.icon className={cn("h-8 w-8", step.color)} />
                </div>
                <p className="mt-3 text-center text-sm font-medium max-w-xs">{step.label}</p>
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden lg:block absolute left-full top-10 h-0.5 w-12 bg-gradient-to-r from-transparent to-primary/30 -ml-6" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Continuous Intelligence Loop",
                description: "Every action you take feeds back into your Skill DNA, continuously refining gaps, roadmap, and recommendations. The system gets smarter as you grow.",
                icon: TrendingUp,
                color: "text-emerald-400",
              },
              {
                title: "Industry-Grounded, Not Academic",
                description: "Requirements come from real job descriptions, hiring trends, and industry signals — not textbook curriculums. Your roadmap reflects what employers actually need today.",
                icon: Briefcase,
                color: "text-blue-400",
              },
              {
                title: "Personalized at Every Layer",
                description: "From the tech feed to the roadmap to the mentor — every feature references your actual Skill DNA, target career, and progress. No generic advice.",
                icon: Target,
                color: "text-purple-400",
              },
            ].map((item, index) => (
              <div 
                key={item.title} 
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-transparent/10 mb-4", item.color)}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}