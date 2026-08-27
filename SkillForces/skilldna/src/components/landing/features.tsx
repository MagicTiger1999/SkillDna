"use client"

import { cn } from "@/lib/utils"
import { 
  BarChart3, 
  Search, 
  Briefcase, 
  Code, 
  Newspaper, 
  MapPin,
  Bot,
  Target
} from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Skill DNA",
    tagline: "See what you're actually good at.",
    description: "Dynamic visual profile showing 8 core skill dimensions with proficiency percentages, evidence sources, industry demand, and career relevance. Identify your strongest skill, biggest gap, and priority focus instantly.",
    highlights: ["8 skill dimensions", "Evidence-based scoring", "Industry demand overlay", "Career relevance mapping"],
  },
  {
    icon: Search,
    title: "AI Skill Gap Analyzer",
    tagline: "Know exactly what you're missing.",
    description: "Select a target career and get detailed gap analysis: strong skills, moderate skills, missing skills, and critical gaps. Every gap explains why it matters, industry relevance, and recommended action with effort estimates.",
    highlights: ["Career-specific requirements", "Priority-ranked gaps", "Actionable recommendations", "Effort estimation"],
  },
  {
    icon: Briefcase,
    title: "Job Description Intelligence",
    tagline: "Understand your fit before you apply.",
    description: "Paste any job description to extract required/preferred skills, responsibilities, and experience requirements. Get a Job Readiness Score and prioritized action plan for what to improve before applying.",
    highlights: ["JD skill extraction", "Readiness scoring", "Missing skills identification", "Pre-application action plan"],
  },
  {
    icon: Code,
    title: "Project Intelligence",
    tagline: "Turn projects into stronger portfolios.",
    description: "Analyze any project for technical quality, industry relevance, complexity, skill depth, and portfolio value. Get specific strengths, weaknesses, missing components, and recommended next features.",
    highlights: ["Multi-dimensional scoring", "Missing component detection", "Portfolio value assessment", "Actionable improvements"],
  },
  {
    icon: Newspaper,
    title: "Tech Intelligence Feed",
    tagline: "Know what's changing in the industry.",
    description: "Personalized feed of AI, dev tools, frameworks, job trends, and emerging technologies. Every item includes 'Why This Matters to You' — connecting industry trends to your specific skill gaps.",
    highlights: ["Categorized intelligence", "Personalized relevance", "Trend detection", "Career-connected insights"],
  },
  {
    icon: MapPin,
    title: "Adaptive AI Roadmap",
    tagline: "Know exactly what to do next.",
    description: "Personalized weekly roadmap that adapts to your existing skills. Skip what you know, focus on gaps. Each item includes difficulty, time estimate, reasoning, prerequisites, and completion tracking.",
    highlights: ["Adaptive sequencing", "Weekly milestones", "Prerequisite awareness", "Progress tracking"],
  },
  {
    icon: Bot,
    title: "AI Career Mentor",
    tagline: "Your personal career advisor.",
    description: "Conversational AI that understands your Skill DNA and target career. Ask about learning priorities, project choices, interview prep, or career decisions. Gets context-aware, personalized answers.",
    highlights: ["Context-aware responses", "Profile-referenced advice", "Action-oriented guidance", "Continuous learning"],
  },
  {
    icon: Target,
    title: "What-If Simulator",
    tagline: "Project impact before you build.",
    description: "Ask 'What if I build an AI Agent project?' and see projected skill improvements, which gaps it addresses, and new industry readiness score. Make strategic project decisions.",
    highlights: ["Impact projection", "Gap coverage analysis", "Readiness forecasting", "Strategic planning"],
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Core Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Eight integrated capabilities that work as one continuous intelligence system.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{feature.tagline}</p>
                  <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {feature.highlights.map((highlight) => (
                      <span 
                        key={highlight} 
                        className="px-2.5 py-1 text-xs rounded bg-primary/10 text-primary/80 border border-primary/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}