"use client"

import { cn } from "@/lib/utils"
import { XCircle, HelpCircle, Target, Search, Zap, Brain } from "lucide-react"

const problems = [
  {
    icon: HelpCircle,
    title: "What should I learn next?",
    description: "Endless tutorials but no clear direction on what actually matters for your target career."
  },
  {
    icon: Target,
    title: "Is my project actually valuable?",
    description: "You've built projects but don't know if they demonstrate the skills employers actually want."
  },
  {
    icon: Search,
    title: "Am I ready for this job?",
    description: "Job descriptions are vague. You can't tell if you're qualified or what you're missing."
  },
  {
    icon: Zap,
    title: "Which technologies should I learn?",
    description: "New frameworks every week. Hard to distinguish hype from genuine industry demand."
  },
  {
    icon: Brain,
    title: "What skills does the industry actually want?",
    description: "University curriculums lag behind. You're learning yesterday's tools for tomorrow's jobs."
  },
]

export function LandingProblem() {
  return (
    <section id="problem" className="py-20 lg:py-32 bg-muted/30 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            The Problem Isn&apos;t Information.
            <br />
            <span className="gradient-text">It&apos;s Direction.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Students don't lack access to learning resources. They lack a system that connects 
            their current abilities to real industry requirements and tells them exactly what to do next.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={problem.title} 
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <XCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                <problem.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            SkillDNA transforms these problems into a continuous intelligence system that guides you 
            from where you are to where you need to be.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary/20">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">From Information to Action</span>
          </div>
        </div>
      </div>
    </section>
  )
}