"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, getProficiencyColor } from "@/lib/utils"
import { 
  Search, 
  AlertTriangle, 
  Target, 
  TrendingUp,
  ArrowRight,
  BookOpen,
  Code,
  Cloud,
  Brain,
  GitBranch,
  Globe,
  MessageSquare,
  Puzzle,
  Zap
} from "lucide-react"

const gaps = [
  { skill: "Machine Learning", current: 43, required: 80, type: "critical", reason: "Core requirement for AI Engineer roles", effort: "High (6-8 months)", resources: ["Deep Learning Specialization", "Fast.ai Course", "ML Projects"] },
  { skill: "Data Structures & Algorithms", current: 61, required: 75, type: "major", reason: "Essential for technical interviews", effort: "Medium (3-4 months)", resources: ["LeetCode 150", "NeetCode Roadmap", "System Design Primer"] },
  { skill: "Cloud Fundamentals", current: 25, required: 60, type: "major", reason: "Required for production ML deployment", effort: "Medium (2-3 months)", resources: ["AWS Solutions Architect", "GCP Cloud Engineer", "Terraform Basics"] },
  { skill: "System Design", current: 30, required: 65, type: "moderate", reason: "Needed for senior-level positions", effort: "Medium (3-4 months)", resources: ["Designing Data-Intensive Apps", "System Design Interview", "Alex Xu Course"] },
  { skill: "Git/GitHub", current: 52, required: 70, type: "moderate", reason: "Daily workflow proficiency expected", effort: "Low (1-2 months)", resources: ["Advanced Git", "GitHub Actions", "Open Source Contribution"] },
  { skill: "Web Development", current: 72, required: 75, type: "minor", reason: "Full-stack capability for demos", effort: "Low (1 month)", resources: ["Next.js Advanced", "React Patterns", "TypeScript Deep Dive"] },
  { skill: "Programming", current: 82, required: 80, type: "strong", reason: "Exceeds requirement", effort: "Maintain", resources: ["Code Review Practice", "Mentoring"] },
  { skill: "Communication", current: 89, required: 70, type: "strong", reason: "Exceeds requirement", effort: "Maintain", resources: ["Technical Writing", "Conference Speaking"] },
  { skill: "Problem Solving", current: 75, required: 70, type: "strong", reason: "Exceeds requirement", effort: "Maintain", resources: ["Competitive Programming", "Algorithm Design"] },
]

export default function SkillGapsPage() {
  const [activeTab, setActiveTab] = useState("analysis")

  const criticalGaps = gaps.filter(g => g.type === "critical")
  const majorGaps = gaps.filter(g => g.type === "major")
  const moderateGaps = gaps.filter(g => g.type === "moderate")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Skill Gap Analysis</h1>
            <p className="text-muted-foreground">Identify and prioritize skills needed for your target career</p>
          </div>
          <Button variant="premium" size="sm">
            <Zap className="mr-2 h-4 w-4" />
            Re-analyze Gaps
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Gap Analysis</TabsTrigger>
            <TabsTrigger value="plan">Action Plan</TabsTrigger>
            <TabsTrigger value="progress">Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <GapSummaryCard title="Critical Gaps" count={criticalGaps.length} color="text-destructive" bgColor="bg-destructive/10 border-destructive/20" icon={<AlertTriangle className="h-5 w-5" />} />
              <GapSummaryCard title="Major Gaps" count={majorGaps.length} color="text-orange-400" bgColor="bg-orange-500/10 border-orange-500/20" icon={<Target className="h-5 w-5" />} />
              <GapSummaryCard title="Moderate Gaps" count={moderateGaps.length} color="text-amber-400" bgColor="bg-amber-500/10 border-amber-500/20" icon={<TrendingUp className="h-5 w-5" />} />
            </div>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Detailed Gap Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {gaps.map((gap) => (
                  <GapDetailCard key={gap.skill} gap={gap} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plan" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Personalized Learning Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {criticalGaps.concat(majorGaps).concat(moderateGaps).map((gap, index) => (
                  <ActionPlanCard key={gap.skill} gap={gap} priority={index + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Gap Closure Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {gaps.filter(g => g.type !== "strong").map((gap) => (
                  <GapProgressCard key={gap.skill} gap={gap} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function GapSummaryCard({ title, count, color, bgColor, icon }: any) {
  return (
    <Card className={cn("bg-card border-border/50", bgColor)}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold {color} mt-1">{count}</p>
          </div>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", bgColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function GapDetailCard({ gap }: { gap: any }) {
  const gapSize = gap.required - gap.current
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Search className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold truncate">{gap.skill}</h4>
              <Badge variant="gap" gapType={gap.type as any}>{gap.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Gap: {gapSize}% • {gap.reason}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 min-w-[140px]">
          <div className="flex items-baseline gap-1">
            <span className={cn("text-xl font-bold", getProficiencyColor(gap.current))}>{gap.current}%</span>
            <span className="text-muted-foreground">→ {gap.required}%</span>
          </div>
          <Progress value={gap.current} className="w-40 h-1.5" />
        </div>
      </div>
    </div>
  )
}

function ActionPlanCard({ gap, priority }: { gap: any; priority: number }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
            {priority}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold truncate">{gap.skill}</h4>
            <p className="text-sm text-muted-foreground">{gap.reason}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 min-w-[200px]">
          <Badge variant="gap" gapType={gap.type as any} className="text-xs">{gap.effort}</Badge>
          <div className="flex flex-wrap gap-1">
            {gap.resources.slice(0, 2).map((r: string, i: number) => (
              <Badge key={i} variant="secondary" className="text-xs">{r}</Badge>
            ))}
            {gap.resources.length > 2 && (
              <Badge variant="outline" className="text-xs">+{gap.resources.length - 2} more</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function GapProgressCard({ gap }: { gap: any }) {
  const progress = Math.min(100, Math.round((gap.current / gap.required) * 100))
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{gap.skill}</span>
        <span className="text-sm text-muted-foreground">{progress}% closed</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground mt-1">Target: {gap.required}% • Current: {gap.current}% • Remaining: {gap.required - gap.current}%</p>
    </div>
  )
}