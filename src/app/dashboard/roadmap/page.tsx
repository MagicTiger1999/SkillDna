"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  BookOpen,
  Brain,
  Code,
  Cloud,
  Target,
  TrendingUp,
  Award,
  Zap,
  Calendar,
  ArrowRight
} from "lucide-react"

const roadmap = [
  { week: 1, title: "Python & NumPy Mastery", difficulty: "beginner", hours: 12, status: "completed", skills: ["Python", "NumPy"], description: "Master Python fundamentals and NumPy for numerical computing" },
  { week: 2, title: "Probability & Statistics", difficulty: "beginner", hours: 15, status: "completed", skills: ["Statistics", "Probability"], description: "Build strong statistical foundation for ML" },
  { week: 3, title: "Linear & Logistic Regression", difficulty: "intermediate", hours: 18, status: "in-progress", skills: ["ML Fundamentals", "Scikit-learn"], description: "Learn core ML algorithms and model evaluation" },
  { week: 4, title: "Classification Algorithms", difficulty: "intermediate", hours: 20, status: "pending", skills: ["ML Algorithms", "Model Selection"], description: "Master decision trees, random forests, SVMs, and ensemble methods" },
  { week: 5, title: "ML Mini Project: Predictive Model", difficulty: "intermediate", hours: 25, status: "pending", skills: ["End-to-end ML", "Model Deployment"], description: "Build and deploy a complete ML pipeline" },
  { week: 6, title: "Neural Networks Fundamentals", difficulty: "advanced", hours: 22, status: "pending", skills: ["Deep Learning", "PyTorch"], description: "Introduction to neural networks and backpropagation" },
  { week: 7, title: "CNNs & Computer Vision", difficulty: "advanced", hours: 24, status: "pending", skills: ["Deep Learning", "Computer Vision"], description: "Convolutional networks for image classification" },
  { week: 8, title: "RNNs & NLP Basics", difficulty: "advanced", hours: 24, status: "pending", skills: ["Deep Learning", "NLP"], description: "Sequence models and natural language processing" },
  { week: 9, title: "Transformer Architecture", difficulty: "advanced", hours: 20, status: "pending", skills: ["Deep Learning", "LLMs"], description: "Attention mechanisms and transformer models" },
  { week: 10, title: "MLOps & Model Deployment", difficulty: "advanced", hours: 18, status: "pending", skills: ["MLOps", "Docker", "Kubernetes"], description: "Production ML pipelines and monitoring" },
  { week: 11, title: "Capstone Project: AI Application", difficulty: "advanced", hours: 30, status: "pending", skills: ["Full Stack AI", "Portfolio"], description: "Build a production-ready AI application" },
  { week: 12, title: "Interview Prep & Portfolio Polish", difficulty: "advanced", hours: 15, status: "pending", skills: ["System Design", "Interviewing"], description: "Mock interviews and portfolio finalization" },
]

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState("timeline")
  const [filter, setFilter] = useState("all")

  const completed = roadmap.filter(r => r.status === "completed").length
  const inProgress = roadmap.filter(r => r.status === "in-progress").length
  const pending = roadmap.filter(r => r.status === "pending").length
  const totalHours = roadmap.reduce((sum, r) => sum + r.hours, 0)
  const completedHours = roadmap.filter(r => r.status === "completed").reduce((sum, r) => sum + r.hours, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Learning Roadmap</h1>
            <p className="text-muted-foreground">Your adaptive weekly plan to become an AI Engineer</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Export Calendar
            </Button>
            <Button variant="premium" size="sm">
              <Zap className="mr-2 h-4 w-4" />
              Regenerate Plan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Weeks Completed" value={`${completed}/12`} icon={<CheckCircle className="h-5 w-5" />} color="text-emerald-400" bgColor="bg-emerald-500/10 border-emerald-500/20" />
          <StatCard title="In Progress" value={inProgress} icon={<Clock className="h-5 w-5" />} color="text-blue-400" bgColor="bg-blue-500/10 border-blue-500/20" />
          <StatCard title="Pending" value={pending} icon={<BookOpen className="h-5 w-5" />} color="text-amber-400" bgColor="bg-amber-500/10 border-amber-500/20" />
          <StatCard title="Total Hours" value={`${totalHours}h`} subtitle={`${completedHours}h done`} icon={<Target className="h-5 w-5" />} color="text-purple-400" bgColor="bg-purple-500/10 border-purple-500/20" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="skills">Skill Focus</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            {roadmap.map((week, index) => (
              <RoadmapWeekCard key={week.week} week={week} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Skills Covered in This Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Python", "NumPy", "Statistics", "Probability", "Scikit-learn", "ML Fundamentals", "Model Evaluation", "Decision Trees", "Random Forests", "SVM", "Ensemble Methods", "End-to-end ML", "Model Deployment", "PyTorch", "Neural Networks", "Backpropagation", "CNNs", "Computer Vision", "RNNs", "NLP", "Transformers", "Attention", "LLMs", "MLOps", "Docker", "Kubernetes", "Full Stack AI", "System Design", "Interviewing"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roadmap.map((week) => (
                    <div key={week.week} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground w-20">Week {week.week}</span>
                        <span className="font-medium">{week.title}</span>
                        <Badge variant="secondary" className="text-xs capitalize">{week.difficulty}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{week.hours}h</span>
                        <Badge variant={week.status === "completed" ? "gap" : week.status === "in-progress" ? "gap" : "outline"} gapType={week.status === "completed" ? "strong" : week.status === "in-progress" ? "moderate" : "minor"}>
                          {week.status}
                        </Badge>
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

function StatCard({ title, value, subtitle, icon, color, bgColor }: any) {
  return (
    <Card className={cn("bg-card border-border/50 hover:border-primary/30 transition-colors", bgColor)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold {color} mt-1">{value}</p>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", bgColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RoadmapWeekCard({ week, index }: { week: any; index: number }) {
  const statusStyles = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse",
    pending: "bg-muted text-muted-foreground border-border/50",
  }

  return (
    <Card className={cn("bg-card border-border/50 transition-all hover:border-primary/30", statusStyles[week.status as keyof typeof statusStyles])}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg text-lg font-medium flex-shrink-0", statusStyles[week.status as keyof typeof statusStyles])}>
              {week.status === "completed" ? <CheckCircle className="h-6 w-6" /> : week.week}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold truncate">{week.title}</h4>
                <Badge variant="secondary" className="text-xs capitalize">{week.difficulty}</Badge>
                <Badge variant="outline" className="text-xs">{week.hours}h</Badge>
                <Badge variant={week.status === "completed" ? "gap" : week.status === "in-progress" ? "gap" : "outline"} gapType={week.status === "completed" ? "strong" : week.status === "in-progress" ? "moderate" : "minor"}>
                  {week.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{week.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {week.skills.map((skill: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
          {week.status === "pending" && (
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              <ArrowRight className="h-4 w-4" />
              Start
            </Button>
          )}
          {week.status === "in-progress" && (
            <Button variant="premium" size="sm" className="flex-shrink-0">
              <Clock className="mr-2 h-4 w-4" />
              Continue
            </Button>
          )}
          {week.status === "completed" && (
            <Badge variant="gap" gapType="strong" className="flex-shrink-0 self-center">
              <CheckCircle className="mr-1 h-3 w-3" />
              Done
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}