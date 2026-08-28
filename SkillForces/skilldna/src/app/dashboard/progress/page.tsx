"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, getProficiencyColor } from "@/lib/utils"
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Target,
  Award,
  Clock,
  Brain,
  Code,
  GitBranch,
  Globe,
  Cloud,
  MessageSquare,
  Puzzle,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const skills = [
  { id: "programming", name: "Programming", color: "#3b82f6", icon: Code, category: "Programming" },
  { id: "dsa", name: "Data Structures & Algorithms", color: "#a855f7", icon: GitBranch, category: "Data Structures & Algorithms" },
  { id: "ml", name: "Machine Learning", color: "#ec4899", icon: Brain, category: "Machine Learning" },
  { id: "web", name: "Web Development", color: "#06b6d4", icon: Globe, category: "Web Development" },
  { id: "git", name: "Git/GitHub", color: "#f97316", icon: GitBranch, category: "Git/GitHub" },
  { id: "cloud", name: "Cloud", color: "#6366f1", icon: Cloud, category: "Cloud" },
  { id: "comm", name: "Communication", color: "#22c55e", icon: MessageSquare, category: "Communication" },
  { id: "problem", name: "Problem Solving", color: "#ef4444", icon: Puzzle, category: "Problem Solving" },
]

const historyData = [
  { month: "Jan", programming: 70, dsa: 50, ml: 25, web: 60, git: 40, cloud: 20, comm: 80, problem: 65 },
  { month: "Feb", programming: 74, dsa: 53, ml: 28, web: 63, git: 43, cloud: 22, comm: 82, problem: 68 },
  { month: "Mar", programming: 77, dsa: 56, ml: 32, web: 66, git: 46, cloud: 25, comm: 84, problem: 70 },
  { month: "Apr", programming: 79, dsa: 58, ml: 35, web: 68, git: 48, cloud: 28, comm: 86, problem: 72 },
  { month: "May", programming: 81, dsa: 60, ml: 38, web: 70, git: 50, cloud: 30, comm: 88, problem: 73 },
  { month: "Jun", programming: 82, dsa: 61, ml: 43, web: 72, git: 52, cloud: 35, comm: 89, problem: 75 },
]

const currentValues = { programming: 82, dsa: 61, ml: 43, web: 72, git: 52, cloud: 35, comm: 89, problem: 75 }

const activities = [
  { id: 1, type: "skill", title: "Machine Learning updated", detail: "43% → 43% (assessment completed)", time: "2 hours ago", icon: Brain, color: "#ec4899" },
  { id: 2, type: "completion", title: "Week 3: Linear Regression", detail: "Completed with 92% score", time: "1 day ago", icon: Award, color: "#22c55e" },
  { id: 3, type: "analysis", title: "Project analyzed", detail: "AI Code Reviewer - 95% portfolio value", time: "2 days ago", icon: Code, color: "#3b82f6" },
  { id: 4, type: "skill", title: "DSA updated", detail: "58% → 61% (LeetCode 50 problems)", time: "3 days ago", icon: GitBranch, color: "#a855f7" },
  { id: 5, type: "reading", title: "Article read", detail: "GPT-5: What We Know So Far", time: "4 days ago", icon: Brain, color: "#8b5cf6" },
  { id: 6, type: "milestone", title: "Milestone reached", detail: "Industry Readiness 65% → 67%", time: "5 days ago", icon: Target, color: "#f59e0b" },
  { id: 7, type: "completion", title: "Week 2: Statistics", detail: "Completed with 88% score", time: "1 week ago", icon: Award, color: "#22c55e" },
  { id: 8, type: "skill", title: "Cloud updated", detail: "30% → 35% (AWS Certified)", time: "1 week ago", icon: Cloud, color: "#6366f1" },
]

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("6m")
  const [selectedSkill, setSelectedSkill] = useState("programming")

  const overallProgress = historyData.map(d => ({
    month: d.month,
    average: Math.round(Object.values(d).slice(1).reduce((a: number, b: any) => a + Number(b), 0) / 8)
  }))

  const skillData = historyData.map(d => ({ month: d.month, value: d[selectedSkill as keyof typeof d] }))
  const currentValue = currentValues[selectedSkill as keyof typeof currentValues]
  const startValue = historyData[0][selectedSkill as keyof typeof historyData[0]]
  const totalGrowth = Number(currentValue) - Number(startValue)
  const selectedSkillInfo = skills.find(s => s.id === selectedSkill)!

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Progress Tracking</h1>
            <p className="text-muted-foreground">Monitor your skill growth and learning journey</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="premium" size="sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              Update Skills
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skill Trends</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Overall Progress" value="+18%" subtitle="6-month average" icon={<TrendingUp className="h-5 w-5" />} color="text-emerald-400" bgColor="bg-emerald-500/10 border-emerald-500/20" trend="+5% vs last month" />
              <StatCard title="Skills Improved" value="6/8" subtitle="This period" icon={<Target className="h-5 w-5" />} color="text-blue-400" bgColor="bg-blue-500/10 border-blue-500/20" />
              <StatCard title="Learning Hours" value="142h" subtitle="Tracked" icon={<Clock className="h-5 w-5" />} color="text-purple-400" bgColor="bg-purple-500/10 border-purple-500/20" />
              <StatCard title="Milestones Hit" value="4" subtitle="This quarter" icon={<Award className="h-5 w-5" />} color="text-amber-400" bgColor="bg-amber-500/10 border-amber-500/20" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Overall Skill Growth (6 Months)
                  </CardTitle>
                  <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="text-sm border border-border/50 rounded px-2 py-1 bg-background">
                    <option value="1m">1 Month</option>
                    <option value="3m">3 Months</option>
                    <option value="6m">6 Months</option>
                    <option value="1y">1 Year</option>
                  </select>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={overallProgress}>
                        <defs>
                          <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                        <Tooltip formatter={(value: any) => [`${value}%`, "Average"]} />
                        <Legend />
                        <Area type="monotone" dataKey="average" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOverall)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Gap Closure Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: "Machine Learning", start: 25, current: 43, target: 80 },
                    { skill: "Data Structures & Algorithms", start: 50, current: 61, target: 75 },
                    { skill: "Cloud", start: 20, current: 35, target: 60 },
                    { skill: "System Design", start: 20, current: 30, target: 65 },
                  ].map((gap) => (
                    <GapClosureCard key={gap.skill} gap={gap} />
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Week 3 Complete", desc: "Linear Regression", date: "Jun 15", icon: Award, color: "#22c55e" },
                    { label: "ML Assessment", desc: "Scored 43%", date: "Jun 10", icon: Brain, color: "#ec4899" },
                    { label: "LeetCode 50", desc: "DSA +3%", date: "Jun 8", icon: GitBranch, color: "#a855f7" },
                    { label: "AWS Certified", desc: "Cloud +5%", date: "Jun 5", icon: Cloud, color: "#6366f1" },
                  ].map((ach, i) => (
                    <AchievementCard key={i} ach={ach} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <Card className="bg-card border-border/50 lg:w-64 flex-shrink-0">
                <CardHeader>
                  <CardTitle>Select Skill</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {skills.map((skill) => (
                    <Button
                      key={skill.id}
                      variant={selectedSkill === skill.id ? "premium" : "outline"}
                      className="w-full justify-start gap-3"
                      onClick={() => setSelectedSkill(skill.id)}
                    >
                      <skill.icon className="h-4 w-4" style={{ color: skill.color }} />
                      {skill.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <div className="flex-1 space-y-6">
                <Card className="bg-card border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <selectedSkillInfo.icon className="h-6 w-6" style={{ color: selectedSkillInfo.color }} />
                      <div>
                        <h3 className="font-semibold">{selectedSkillInfo.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedSkillInfo.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ color: selectedSkillInfo.color }}>{currentValue}%</p>
                      <p className="text-sm text-emerald-400">+{totalGrowth}% total growth</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={skillData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                          <Tooltip formatter={(value: any) => [`${value}%`, "Proficiency"]} />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke={selectedSkillInfo.color} strokeWidth={3} dot={{ r: 6, strokeWidth: 3 }} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Starting</p>
                        <p className="font-bold">{startValue}%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Current</p>
                        <p className="font-bold" style={{ color: selectedSkillInfo.color }}>{currentValue}%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Target</p>
                        <p className="font-bold text-emerald-400">{selectedSkill === "ml" ? 80 : selectedSkill === "dsa" ? 75 : selectedSkill === "cloud" ? 60 : 80}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle>Monthly Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {historyData.map((d, i) => {
                        const val = d[selectedSkill as keyof typeof historyData[0]] as number
                        const prev = i > 0 ? historyData[i-1][selectedSkill as keyof typeof historyData[0]] as number : (startValue as number)
                        const change = val - prev
                        return (
                          <div key={d.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <span className="font-medium">{d.month}</span>
                            <div className="flex items-center gap-4">
                              <span className={cn("font-bold", getProficiencyColor(val))}>
                                {val}%
                              </span>
                              <Badge variant={change >= 0 ? "gap" : "outline"} gapType={change >= 0 ? "moderate" : "minor"} className="text-xs">
                                {change >= 0 ? "+" : ""}{change}%
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Learning Activity Log
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Python & NumPy Mastery", target: "Week 1", status: "completed", date: "Completed May 20", skills: ["Python", "NumPy"] },
                  { title: "Probability & Statistics", target: "Week 2", status: "completed", date: "Completed May 27", skills: ["Statistics", "Probability"] },
                  { title: "Linear & Logistic Regression", target: "Week 3", status: "in-progress", date: "Due Jun 15", skills: ["ML Fundamentals", "Scikit-learn"] },
                  { title: "Classification Algorithms", target: "Week 4", status: "pending", date: "Due Jun 22", skills: ["Decision Trees", "Random Forests"] },
                  { title: "ML Mini Project", target: "Week 5", status: "pending", date: "Due Jun 29", skills: ["End-to-end ML", "Deployment"] },
                  { title: "Neural Networks", target: "Week 6", status: "pending", date: "Due Jul 6", skills: ["Deep Learning", "PyTorch"] },
                ].map((ms, i) => (
                  <MilestoneCard key={i} milestone={ms} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function StatCard({ title, value, subtitle, icon, color, bgColor, trend }: any) {
  return (
    <Card className={cn("bg-card border-border/50 hover:border-primary/30 transition-colors", bgColor)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold {color} mt-1">{value}</p>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            {trend && <p className="text-xs text-emerald-400 mt-2">{trend}</p>}
          </div>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", bgColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function GapClosureCard({ gap }: { gap: any }) {
  const progress = Math.round(((gap.current - gap.start) / (gap.target - gap.start)) * 100)
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{gap.skill}</span>
        <span className="text-sm text-muted-foreground">{progress}% closed</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Start: {gap.start}%</span>
        <span>Current: {gap.current}%</span>
        <span>Target: {gap.target}%</span>
      </div>
    </div>
  )
}

function AchievementCard({ ach }: { ach: any }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl mx-auto mb-3" style={{ backgroundColor: `${ach.color}20` }}>
        <ach.icon className="h-6 w-6" style={{ color: ach.color }} />
      </div>
      <h4 className="font-semibold">{ach.label}</h4>
      <p className="text-sm text-muted-foreground">{ach.desc}</p>
      <p className="text-xs text-muted-foreground mt-1">{ach.date}</p>
    </div>
  )
}

function ActivityItem({ activity }: { activity: any }) {
  return (
    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: `${activity.color}20` }}>
        <activity.icon className="h-5 w-5" style={{ color: activity.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">{activity.title}</p>
        <p className="text-sm text-muted-foreground">{activity.detail}</p>
      </div>
      <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
    </div>
  )
}

function MilestoneCard({ milestone }: { milestone: any }) {
  const statusStyles = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    pending: "bg-muted text-muted-foreground border-border/50",
  }

  return (
    <Card className={cn("bg-card border-border/50", statusStyles[milestone.status as keyof typeof statusStyles])}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg text-lg font-medium flex-shrink-0", statusStyles[milestone.status as keyof typeof statusStyles])}>
              {milestone.status === "completed" ? <CheckCircle className="h-6 w-6" /> : milestone.target.replace("Week ", "")}
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold truncate">{milestone.title}</h4>
              <p className="text-sm text-muted-foreground">{milestone.date}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {milestone.skills.map((s: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
            </div>
          </div>
          <Badge variant={milestone.status === "completed" ? "gap" : milestone.status === "in-progress" ? "gap" : "outline"} gapType={milestone.status === "completed" ? "strong" : "moderate"}>
            {milestone.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

import { CheckCircle } from "lucide-react"