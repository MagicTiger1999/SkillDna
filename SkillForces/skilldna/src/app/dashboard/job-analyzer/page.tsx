"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { 
  Briefcase, 
  Search, 
  FileText, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Download,
  Upload,
  Sparkles,
  Target
} from "lucide-react"
import { useState } from "react"

const sampleJD = `Senior AI/ML Engineer

We are looking for a Senior AI/ML Engineer to join our growing team. You will be responsible for designing, building, and deploying machine learning models at scale.

Required Skills:
- 5+ years of experience in Machine Learning / Deep Learning
- Expert in Python, PyTorch/TensorFlow
- Strong background in NLP, Computer Vision, or Generative AI
- Experience with MLOps, Docker, Kubernetes
- Proven track record of deploying models to production
- Strong software engineering fundamentals

Preferred Skills:
- Experience with LLMs and RAG systems
- Knowledge of distributed training
- Published research papers
- Open source contributions

Responsibilities:
- Design and implement ML pipelines
- Optimize models for latency and throughput
- Collaborate with product and engineering teams
- Mentor junior engineers
- Stay current with latest AI research`

export default function JobAnalyzerPage() {
  const [activeTab, setActiveTab] = useState("analyze")
  const [jobDescription, setJobDescription] = useState(sampleJD)
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    await new Promise(r => setTimeout(r, 2000))
    setAnalysis({
      readinessScore: 72,
      requiredSkills: [
        { skill: "Machine Learning", required: 90, current: 43, match: false },
        { skill: "Deep Learning", required: 85, current: 35, match: false },
        { skill: "Python", required: 95, current: 82, match: true },
        { skill: "PyTorch", required: 90, current: 40, match: false },
        { skill: "MLOps", required: 80, current: 35, match: false },
        { skill: "NLP", required: 85, current: 30, match: false },
        { skill: "Docker/Kubernetes", required: 75, current: 35, match: false },
        { skill: "Software Engineering", required: 80, current: 82, match: true },
      ],
      preferredSkills: [
        { skill: "LLMs/RAG", required: 80, current: 25, match: false },
        { skill: "Distributed Training", required: 70, current: 20, match: false },
        { skill: "Research", required: 60, current: 30, match: false },
      ],
      missingCritical: ["Machine Learning", "Deep Learning", "PyTorch", "MLOps", "NLP"],
      actionPlan: [
        "Complete Deep Learning specialization (3 months)",
        "Build 2-3 end-to-end ML projects with PyTorch",
        "Learn MLOps: Docker, Kubernetes, MLflow",
        "Implement RAG system with LLMs",
        "Contribute to open source ML projects",
      ]
    })
    setIsAnalyzing(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Job Description Analyzer</h1>
            <p className="text-muted-foreground">Paste a job description to analyze your fit and get an action plan</p>
          </div>
          <Button variant="premium" onClick={handleAnalyze} disabled={isAnalyzing}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analyze">Analyze JD</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Paste Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  rows={15}
                />
                <div className="flex items-center gap-4">
                  <Button variant="premium" onClick={handleAnalyze} disabled={isAnalyzing || !jobDescription.trim()}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isAnalyzing ? "Analyzing..." : "Analyze Job Description"}
                  </Button>
                  <Button variant="outline" onClick={() => navigator.clipboard.writeText(jobDescription)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Load from Clipboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" /> Include specific technologies (PyTorch, TensorFlow, etc.)</div>
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" /> Mention years of experience requirements</div>
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" /> List both required and preferred qualifications</div>
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" /> Include responsibilities and project examples</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {analysis ? (
              <>
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="bg-card border-border/50 bg-emerald-500/10 border-emerald-500/20">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-muted-foreground">Readiness Score</p>
                      <p className="text-4xl font-bold text-emerald-400">{analysis.readinessScore}%</p>
                      <p className="text-xs text-emerald-400 mt-1">Strong Match</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border/50">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-muted-foreground">Required Skills Match</p>
                      <p className="text-4xl font-bold text-blue-400">{analysis.requiredSkills.filter((s: any) => s.match).length}/{analysis.requiredSkills.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">Matched</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border/50 bg-destructive/10 border-destructive/20">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-muted-foreground">Critical Gaps</p>
                      <p className="text-4xl font-bold text-destructive">{analysis.missingCritical.length}</p>
                      <p className="text-xs text-destructive mt-1">Need Attention</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border/50">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-muted-foreground">Preferred Skills Match</p>
                      <p className="text-4xl font-bold text-purple-400">{analysis.preferredSkills.filter((s: any) => s.match).length}/{analysis.preferredSkills.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">Matched</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Required Skills Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {analysis.requiredSkills.map((s: any) => (
                        <SkillMatchRow key={s.skill} skill={s} />
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Preferred Skills Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {analysis.preferredSkills.map((s: any) => (
                        <SkillMatchRow key={s.skill} skill={s} />
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowRight className="h-5 w-5" />
                      Recommended Action Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.actionPlan.map((action: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary text-sm font-medium">{i + 1}</span>
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-card border-border/50">
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No Analysis Yet</h3>
                  <p className="text-muted-foreground mt-2">Paste a job description and click Analyze to see your fit</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Analysis History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { company: "TechCorp Inc.", role: "Senior AI Engineer", date: "2 days ago", score: 72 },
                    { company: "DataFlow Labs", role: "ML Engineer", date: "1 week ago", score: 68 },
                    { company: "AI Innovations", role: "Applied Scientist", date: "2 weeks ago", score: 75 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                      <div>
                        <p className="font-medium">{item.role} at {item.company}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-emerald-400">{item.score}%</span>
                        <Button variant="ghost" size="sm">View</Button>
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

function SkillMatchRow({ skill }: { skill: any }) {
  return (
    <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", skill.match ? "bg-emerald-500/10 text-emerald-400" : "bg-destructive/10 text-destructive")}>
            {skill.match ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          </div>
          <div className="min-w-0">
            <p className="font-medium truncate">{skill.skill}</p>
            <p className="text-xs text-muted-foreground">Required: {skill.required}% • Current: {skill.current}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 min-w-[120px]">
          <div className="flex-1 h-1.5 bg-muted rounded overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${skill.current}%` }} />
          </div>
          <span className="text-sm font-medium text-muted-foreground w-10 text-right">{skill.current}%</span>
        </div>
      </div>
    </div>
  )
}