"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle, BarChart3, Brain, Target } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-purple-500/10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 animate-in slide-up-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Smart India Hackathon 2026 Project
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-in slide-up-2" style={{ animationDelay: '100ms' }}>
            Know Your Skills.
            <br />
            <span className="gradient-text">Know What&apos;s Next.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in slide-up-2" style={{ animationDelay: '200ms' }}>
            SkillDNA uses AI and real-world industry intelligence to identify your skill gaps,
            build your personalized career roadmap, and help you become industry-ready.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-up-2" style={{ animationDelay: '300ms' }}>
            <Link href="/dashboard">
              <Button size="xl" variant="premium" className="group">
                Build My Skill DNA
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="xl" variant="outline" className="w-full sm:w-auto">
                Explore Demo
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-in slide-up-2" style={{ animationDelay: '400ms' }}>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground text-center">Nemotron 3 Ultra reasoning</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Personalized Roadmaps</h3>
              <p className="text-sm text-muted-foreground text-center">Adaptive to your skills</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Industry Intelligence</h3>
              <p className="text-sm text-muted-foreground text-center">Real-time trend detection</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 relative animate-in slide-up-2" style={{ animationDelay: '500ms' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative rounded-2xl border border-border/50 bg-card/50 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/50">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
                skill-dna-dashboard.preview
              </div>
            </div>
            <div className="p-6">
              <SkillDNAPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillDNAPreview() {
  const skills = [
    { name: "Programming", value: 82, color: "#3b82f6" },
    { name: "DSA", value: 61, color: "#a855f7" },
    { name: "Machine Learning", value: 43, color: "#ec4899" },
    { name: "Web Development", value: 72, color: "#06b6d4" },
    { name: "Git/GitHub", value: 52, color: "#f97316" },
    { name: "Communication", value: 89, color: "#22c55e" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Satyam's Skill DNA</h4>
          <p className="text-sm text-muted-foreground">Target: AI Engineer • Industry Readiness: 67%</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
            <CheckCircle className="h-3 w-3" /> Strongest: Programming
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{skill.name}</span>
              <span className="text-muted-foreground">{skill.value}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ 
                  width: `${skill.value}%`,
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-border/50">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-sm text-muted-foreground">Industry Readiness</p>
            <p className="text-2xl font-bold text-emerald-400">67%</p>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-sm text-muted-foreground">Biggest Gap</p>
            <p className="text-2xl font-bold text-amber-400">Machine Learning</p>
          </div>
        </div>
      </div>
    </div>
  )
}