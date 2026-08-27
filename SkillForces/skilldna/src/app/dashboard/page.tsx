"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn, getProficiencyColor } from "@/lib/utils"
import { 
  Dna, 
  Search, 
  MapPin, 
  Code, 
  Briefcase, 
  Newspaper, 
  Bot, 
  TrendingUp,
  Target,
  Brain,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Trophy
} from "lucide-react"
import Link from "next/link"

const demoSkills = [
  { name: "Programming", value: 82, color: "#3b82f6", icon: Code },
  { name: "DSA", value: 61, color: "#a855f7", icon: Search },
  { name: "Machine Learning", value: 43, color: "#ec4899", icon: Brain },
  { name: "Web Development", value: 72, color: "#06b6d4", icon: Code },
  { name: "Git/GitHub", value: 52, color: "#f97316", icon: Dna },
  { name: "Communication", value: 89, color: "#22c55e", icon: Brain },
]

const demoGaps: Array<{ skill: string; current: number; required: number; type: "critical" | "major" | "moderate" | "minor" | "strong" }> = [
  { skill: "Machine Learning", current: 43, required: 80, type: "critical" },
  { skill: "DSA", current: 61, required: 75, type: "major" },
  { skill: "Cloud Fundamentals", current: 25, required: 60, type: "major" },
  { skill: "System Design", current: 30, required: 65, type: "moderate" },
]

const demoRoadmap = [
  { week: 1, title: "Python & NumPy Mastery", difficulty: "beginner", hours: 12, status: "completed" },
  { week: 2, title: "Probability & Statistics", difficulty: "beginner", hours: 15, status: "completed" },
  { week: 3, title: "Linear & Logistic Regression", difficulty: "intermediate", hours: 18, status: "in-progress" },
  { week: 4, title: "Classification Algorithms", difficulty: "intermediate", hours: 20, status: "pending" },
  { week: 5, title: "ML Mini Project: Predictive Model", difficulty: "intermediate", hours: 25, status: "pending" },
  { week: 6, title: "Neural Networks Fundamentals", difficulty: "advanced", hours: 22, status: "pending" },
]

const recentActivity = [
  { action: "Completed: Python & NumPy Mastery", time: "2 hours ago", type: "completion" },
  { action: "Started: Linear & Logistic Regression", time: "1 day ago", type: "started" },
  { action: "Analyzed project: AI Code Reviewer", time: "3 days ago", type: "analysis" },
  { action: "Skill updated: DSA → 61%", time: "5 days ago", type: "skill" },
  { action: "Read: AI Agents: The Next Frontier", time: "1 week ago", type: "reading" },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Satyam</h1>
            <p className="text-muted-foreground">Here's your AI Engineer journey progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard/skill-dna">View Full Skill DNA</Link>
            </Button>
            <Button variant="premium" asChild>
              <Link href="/dashboard/roadmap">Continue Roadmap</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Industry Readiness"
            value="67%"
            icon={<Target className="h-5 w-5" />}
            trend={<ArrowUpRight className="h-4 w-4 text-emerald-400" />}
            trendLabel="+12% this month"
            color="text-emerald-400"
            bgColor="bg-emerald-500/10 border-emerald-500/20"
          />
          <StatCard
            title="Strongest Skill"
            value="Programming"
            subtitle="82% proficiency"
            icon={<Code className="h-5 w-5" />}
            color="text-blue-400"
            bgColor="bg-blue-500/10 border-blue-500/20"
          />
          <StatCard
            title="Biggest Gap"
            value="Machine Learning"
            subtitle="43% proficiency"
            icon={<Brain className="h-5 w-5" />}
            color="text-pink-400"
            bgColor="bg-pink-500/10 border-pink-500/20"
          />
          <StatCard
            title="Roadmap Progress"
            value="2/6 weeks"
            subtitle="Week 3 in progress"
            icon={<MapPin className="h-5 w-5" />}
            color="text-purple-400"
            bgColor="bg-purple-500/10 border-purple-500/20"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Dna className="h-5 w-5" />
                  Skill DNA Overview
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/skill-dna">View Details</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {demoSkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium flex items-center gap-2">
                          <skill.icon className="h-4 w-4" style={{ color: skill.color }} />
                          {skill.name}
                        </span>
                        <span className={cn("text-sm font-semibold", getProficiencyColor(skill.value))}>
                          {skill.value}%
                        </span>
                      </div>
                      <Progress value={skill.value} className="h-1.5" />
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-sm text-muted-foreground">Industry Readiness</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-emerald-400">67%</span>
                      <span className="text-sm text-emerald-400">+12% this month</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-muted-foreground">Priority Skill</p>
                    <p className="text-xl font-bold text-amber-400">DSA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Your Roadmap
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/roadmap">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {demoRoadmap.map((item) => (
                  <div key={item.week} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium flex-shrink-0",
                      item.status === "completed" && "bg-emerald-500/10 text-emerald-400",
                      item.status === "in-progress" && "bg-blue-500/10 text-blue-400 animate-pulse",
                      item.status === "pending" && "bg-muted text-muted-foreground"
                    )}>
                      {item.status === "completed" ? <CheckCircle className="h-5 w-5" /> : item.week}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.difficulty} • {item.hours}h estimated</p>
                    </div>
                    <Badge variant="gap" gapType={item.status === "completed" ? "strong" : item.status === "in-progress" ? "moderate" : "minor"}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Critical Gaps
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/skill-gaps">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {demoGaps.map((gap) => (
                  <div key={gap.skill} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{gap.skill}</span>
                      <Badge variant="gap" gapType={gap.type}>{gap.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{gap.current}%</span>
                      <Progress value={gap.current} className="flex-1 h-1" />
                      <span>{gap.required}% target</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/progress">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-sm flex-shrink-0",
                      activity.type === "completion" && "bg-emerald-500/10 text-emerald-400",
                      activity.type === "started" && "bg-blue-500/10 text-blue-400",
                      activity.type === "analysis" && "bg-purple-500/10 text-purple-400",
                      activity.type === "skill" && "bg-amber-500/10 text-amber-400",
                      activity.type === "reading" && "bg-cyan-500/10 text-cyan-400",
                    )}>
                      {activity.type === "completion" && <CheckCircle className="h-4 w-4" />}
                      {activity.type === "started" && <Clock className="h-4 w-4" />}
                      {activity.type === "analysis" && <Brain className="h-4 w-4" />}
                      {activity.type === "skill" && <TrendingUp className="h-4 w-4" />}
                      {activity.type === "reading" && <Newspaper className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link href="/dashboard/job-analyzer">
                    <Briefcase className="h-4 w-4" />
                    Analyze a Job Description
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link href="/dashboard/project-intelligence">
                    <Code className="h-4 w-4" />
                    Analyze a Project
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link href="/dashboard/tech-intelligence">
                    <Newspaper className="h-4 w-4" />
                    Browse Tech Intelligence
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link href="/dashboard/mentor">
                    <Bot className="h-4 w-4" />
                    Ask AI Mentor
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendLabel, 
  color, 
  bgColor 
}: { 
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  trend?: React.ReactNode
  trendLabel?: string
  color: string
  bgColor: string
}) {
  return (
    <Card className={cn("bg-card border-border/50 hover:border-primary/30 transition-colors", bgColor)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold {color} mt-1">{value}</p>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            {trend && trendLabel && (
              <div className="flex items-center gap-1 mt-2 text-sm">
                {trend}
                <span className="text-emerald-400">{trendLabel}</span>
              </div>
            )}
          </div>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", bgColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}