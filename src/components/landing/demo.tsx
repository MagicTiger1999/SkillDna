"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Target, TrendingUp, Code, Brain, CheckCircle, MapPin } from "lucide-react"

const demoSkills = [
  { name: "Programming", value: 82, color: "#3b82f6", category: "Programming" },
  { name: "DSA", value: 61, color: "#a855f7", category: "Data Structures & Algorithms" },
  { name: "Machine Learning", value: 43, color: "#ec4899", category: "Machine Learning" },
  { name: "Web Development", value: 72, color: "#06b6d4", category: "Web Development" },
  { name: "Git/GitHub", value: 52, color: "#f97316", category: "Git/GitHub" },
  { name: "Communication", value: 89, color: "#22c55e", category: "Communication" },
]

const demoGaps = [
  { skill: "Machine Learning", current: 43, required: 80, type: "critical", reason: "Core requirement for AI Engineer roles" },
  { skill: "DSA", current: 61, required: 75, type: "major", reason: "Essential for technical interviews" },
  { skill: "Cloud Fundamentals", current: 25, required: 60, type: "major", reason: "Required for production ML deployment" },
  { skill: "System Design", current: 30, required: 65, type: "moderate", reason: "Needed for senior-level positions" },
]

const demoRoadmap = [
  { week: 1, title: "Python & NumPy Mastery", difficulty: "beginner", hours: 12, status: "completed" },
  { week: 2, title: "Probability & Statistics", difficulty: "beginner", hours: 15, status: "completed" },
  { week: 3, title: "Linear & Logistic Regression", difficulty: "intermediate", hours: 18, status: "in-progress" },
  { week: 4, title: "Classification Algorithms", difficulty: "intermediate", hours: 20, status: "pending" },
  { week: 5, title: "ML Mini Project: Predictive Model", difficulty: "intermediate", hours: 25, status: "pending" },
  { week: 6, title: "Neural Networks Fundamentals", difficulty: "advanced", hours: 22, status: "pending" },
]

export function LandingDemo() {
  return (
    <section id="demo" className="py-20 lg:py-32 bg-muted/30 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Live Demo: Satyam's AI Engineer Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore a complete student profile with Skill DNA, gaps, roadmap, and intelligence feed.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Skill DNA</h3>
                    <p className="text-sm text-muted-foreground">Target: AI Engineer • Readiness: 67%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Strongest: Programming
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Biggest Gap: ML
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {demoSkills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: skill.color }} />
                        {skill.name}
                      </span>
                      <span className="text-muted-foreground">{skill.value}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
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
            </div>
            
            <div className="rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Critical Skill Gaps</h3>
                    <p className="text-sm text-muted-foreground">Prioritized for AI Engineer target</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {demoGaps.map((gap) => (
                  <div key={gap.skill} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{gap.skill}</span>
                          <span className={cn(
                            "px-2 py-0.5 text-xs rounded-full",
                            gap.type === "critical" && "bg-red-500/10 text-red-400 border border-red-500/20",
                            gap.type === "major" && "bg-orange-500/10 text-orange-400 border border-orange-500/20",
                            gap.type === "moderate" && "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          )}>
                            {gap.type.charAt(0).toUpperCase() + gap.type.slice(1)} Gap
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{gap.reason}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-lg font-semibold">{gap.current}% → {gap.required}%</div>
                        <div className="text-xs text-muted-foreground">Gap: {gap.required - gap.current}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Adaptive Roadmap</h3>
                    <p className="text-sm text-muted-foreground">6 weeks • 3 in progress</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {demoRoadmap.map((item) => (
                  <div key={item.week} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium flex-shrink-0",
                      item.status === "completed" && "bg-emerald-500/10 text-emerald-400",
                      item.status === "in-progress" && "bg-blue-500/10 text-blue-400 animate-pulse",
                      item.status === "pending" && "bg-muted text-muted-foreground"
                    )}>
                      {item.status === "completed" ? <CheckCircle className="h-4 w-4" /> : item.week}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.difficulty} • {item.hours}h</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tech Intelligence</h3>
                    <p className="text-sm text-muted-foreground">Personalized for AI Engineer</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { title: "AI Agents: The Next Frontier", category: "AI", trend: "booming", reason: "Your ML gap (43%) makes this critical" },
                  { title: "RAG Patterns for Production", category: "Development", trend: "rising", reason: "Directly addresses your tool integration gap" },
                  { title: "ML Engineer Demand +40% YoY", category: "Career", trend: "rising", reason: "Your target career is accelerating" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary">{item.category}</span>
                      <span className={cn(
                        "px-2 py-0.5 text-xs rounded",
                        item.trend === "booming" && "bg-red-500/10 text-red-400",
                        item.trend === "rising" && "bg-amber-500/10 text-amber-400"
                      )}>
                        {item.trend.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">💡 {item.reason}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-primary/20 p-6 text-center hover-lift">
              <h3 className="font-semibold text-lg mb-2">Try the Full Experience</h3>
              <p className="text-muted-foreground text-sm mb-4">Sign up to build your own Skill DNA and get a personalized roadmap.</p>
              <Button variant="premium" size="lg" className="w-full">
                Start Free Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}