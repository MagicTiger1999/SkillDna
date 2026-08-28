"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, getProficiencyColor, getProficiencyBgColor } from "@/lib/utils"
import { 
  Dna, 
  Code, 
  GitBranch, 
  Brain, 
  Globe, 
  GitBranch as GithubIcon, 
  Cloud, 
  MessageSquare, 
  Puzzle,
  Target,
  TrendingUp,
  Award,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  PieChart as PieChartIcon,
  Search,
  Zap
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChartType,
  Pie,
  Cell as PieCell,
} from "recharts"
import { SkillPieChart, SkillBarChart, RadialProgress } from "@/components/ui/chart"

const skills = [
  { id: "programming", name: "Programming", value: 82, color: "#3b82f6", icon: Code, category: "Programming", level: "Advanced", evidence: "3+ years, multiple production apps", source: "Resume + GitHub", demand: "high", importance: 9 },
  { id: "dsa", name: "Data Structures & Algorithms", value: 61, color: "#a855f7", icon: GitBranch, category: "Data Structures & Algorithms", level: "Intermediate", evidence: "LeetCode 200+ problems", source: "Self-reported", demand: "high", importance: 10 },
  { id: "ml", name: "Machine Learning", value: 43, color: "#ec4899", icon: Brain, category: "Machine Learning", level: "Beginner", evidence: "Coursework + 2 projects", source: "Coursework", demand: "critical", importance: 10 },
  { id: "web", name: "Web Development", value: 72, color: "#06b6d4", icon: Globe, category: "Web Development", level: "Advanced", evidence: "5+ full-stack projects", source: "GitHub", demand: "high", importance: 7 },
  { id: "git", name: "Git/GitHub", value: 52, color: "#f97316", icon: GithubIcon, category: "Git/GitHub", level: "Intermediate", evidence: "Daily usage, 50+ repos", source: "Self-reported", demand: "medium", importance: 6 },
  { id: "cloud", name: "Cloud", value: 35, color: "#6366f1", icon: Cloud, category: "Cloud", level: "Beginner", evidence: "AWS Cloud Practitioner cert", source: "Certification", demand: "high", importance: 8 },
  { id: "comm", name: "Communication", value: 89, color: "#22c55e", icon: MessageSquare, category: "Communication", level: "Expert", evidence: "Tech blog, conference talks", source: "Portfolio", demand: "medium", importance: 7 },
  { id: "problem", name: "Problem Solving", value: 75, color: "#ef4444", icon: Puzzle, category: "Problem Solving", level: "Advanced", evidence: "Hackathon winner, CP rating 1800", source: "Achievements", demand: "high", importance: 9 },
]

const gapStatuses = [
  { skill: "Machine Learning", status: "critical" },
  { skill: "DSA", status: "major" },
  { skill: "Cloud", status: "major" },
  { skill: "System Design", status: "moderate" },
  { skill: "Git/GitHub", status: "moderate" },
  { skill: "Web Development", status: "minor" },
  { skill: "Programming", status: "strong" },
  { skill: "Communication", status: "strong" },
  { skill: "Problem Solving", status: "strong" },
]

export default function SkillDNAPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const strongestSkill = skills.reduce((max, s) => s.value > max.value ? s : max, skills[0])
  const biggestGap = skills.reduce((min, s) => s.value < min.value ? s : min, skills[0])
  const industryReadiness = Math.round(skills.reduce((sum, s) => sum + s.value, 0) / skills.length)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Skill DNA</h1>
            <p className="text-muted-foreground">Your dynamic skill profile with industry relevance mapping</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="premium" size="sm">
              <Zap className="mr-2 h-4 w-4" />
              Re-analyze
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Industry Readiness"
            value={`${industryReadiness}%`}
            icon={<Target className="h-5 w-5" />}
            color="text-emerald-400"
            bgColor="bg-emerald-500/10 border-emerald-500/20"
            trend={<ArrowUpRight className="h-4 w-4" />}
            trendLabel="+12% this month"
          />
          <MetricCard
            title="Strongest Skill"
            value={strongestSkill.name}
            subtitle={`${strongestSkill.value}% proficiency`}
            icon={<Award className="h-5 w-5" />}
            color="text-blue-400"
            bgColor="bg-blue-500/10 border-blue-500/20"
          />
          <MetricCard
            title="Biggest Gap"
            value={biggestGap.name}
            subtitle={`${biggestGap.value}% proficiency`}
            icon={<AlertTriangle className="h-5 w-5" />}
            color="text-amber-400"
            bgColor="bg-amber-500/10 border-amber-500/20"
          />
          <MetricCard
            title="Priority Focus"
            value="DSA"
            subtitle="Priority skill for AI Engineer"
            icon={<TrendingUp className="h-5 w-5" />}
            color="text-purple-400"
            bgColor="bg-purple-500/10 border-purple-500/20"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed View</TabsTrigger>
            <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
            <TabsTrigger value="progress">Progress History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Skill Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChartType>
                        <Pie
                          data={skills.map(s => ({ name: s.name, value: s.value }))}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                        >
                          {skills.map((s, i) => <PieCell key={`cell-${i}`} fill={s.color} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChartType>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Industry Demand vs Proficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skills.map(s => ({ ...s, demandScore: s.demand === "critical" ? 100 : s.demand === "high" ? 80 : s.demand === "medium" ? 60 : 40 }))}>
                        <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Proficiency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="demandScore" name="Industry Demand" fill="#a855f7" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="h-5 w-5" />
                  Radial Skill View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex flex-col items-center">
                      <RadialProgress value={skill.value} size={80} color={skill.color} />
                      <div className="mt-3 text-center">
                        <p className="font-medium text-sm">{skill.name}</p>
                        <p className={cn("text-xl font-bold", getProficiencyColor(skill.value))}>{skill.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>All Skills - Detailed Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <SkillDetailCard key={skill.id} skill={skill} gapStatus={gapStatuses.find(g => g.skill === skill.name)?.status || "minor"} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gaps" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Skill Gap Analysis for AI Engineer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {["critical", "major", "moderate", "minor", "strong"].map((type) => (
                    <div key={type} className="p-4 rounded-lg border" style={{ borderColor: `hsl(var(--${type === "critical" ? "destructive" : type === "major" ? "orange" : type === "moderate" ? "amber" : type === "minor" ? "blue" : "emerald"}-500))` }}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold capitalize">{type} Gaps</h4>
                        <Badge variant="gap" gapType={type as any}>{type}</Badge>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {gapStatuses.filter(g => g.status === type).map(g => (
                          <li key={g.skill} className="flex justify-between">
                            <span>{g.skill}</span>
                            <span className="text-muted-foreground">{skills.find(s => s.name === g.skill)?.value || 0}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Skill Progress History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <skill.icon className="h-4 w-4" style={{ color: skill.color }} />
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className={cn("font-bold", getProficiencyColor(skill.value))}>{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Jan: {Math.max(0, skill.value - 15)}%</span>
                        <span>Mar: {Math.max(0, skill.value - 8)}%</span>
                        <span>Now: {skill.value}%</span>
                        <span className="text-emerald-400">+{skill.value - Math.max(0, skill.value - 15)}% total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
    </DashboardLayout>
  )
}

function MetricCard({ title, value, subtitle, icon, color, bgColor, trend, trendLabel }: any) {
  return (
    <Card className={cn("bg-card border-border/50 hover:border-primary/30 transition-colors", bgColor)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-xl font-bold {color} mt-1">{value}</p>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            {trend && trendLabel && (
              <div className="flex items-center gap-1 mt-2 text-sm text-emerald-400">
                {trend}
                <span>{trendLabel}</span>
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

function SkillDetailCard({ skill, gapStatus }: { skill: any; gapStatus: string }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", getProficiencyBgColor(skill.value))}>
            <skill.icon className="h-5 w-5" style={{ color: skill.color }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold truncate">{skill.name}</h4>
              <Badge variant="gap" gapType={gapStatus as any}>{gapStatus}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{skill.category} • {skill.level}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 min-w-[120px]">
          <span className={cn("text-xl font-bold", getProficiencyColor(skill.value))}>{skill.value}%</span>
          <Progress value={skill.value} className="w-32 h-1.5" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Evidence</p>
          <p className="font-medium truncate">{skill.evidence}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Source</p>
          <p className="font-medium">{skill.source}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Industry Demand</p>
          <p className="font-medium capitalize">{skill.demand}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Career Importance</p>
          <p className="font-medium">{skill.importance}/10</p>
        </div>
      </div>
    </div>
  )
}