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
  Code, 
  GitBranch, 
  FileCode, 
  Star,
  ArrowUpRight,
  Brain,
  Search,
  Sparkles,
  Plus,
  Settings,
  Trash2,
  Edit,
  Eye,
  Download,
  Share2
} from "lucide-react"
import { useState } from "react"

const projects = [
  { id: 1, name: "AI Code Reviewer", description: "Automated code review using LLMs", tech: ["Python", "FastAPI", "GPT-4", "GitHub Actions"], status: "completed", stars: 245, lastUpdated: "2 days ago", analysis: { technicalQuality: 88, industryRelevance: 92, complexity: 85, skillDepth: 90, portfolioValue: 95 } },
  { id: 2, name: "ML Model Deployment Platform", description: "Kubernetes-based ML serving infrastructure", tech: ["Go", "Kubernetes", "Docker", "Prometheus"], status: "in-progress", stars: 89, lastUpdated: "5 hours ago", analysis: { technicalQuality: 82, industryRelevance: 88, complexity: 95, skillDepth: 87, portfolioValue: 88 } },
  { id: 3, name: "Real-time Fraud Detection", description: "Streaming ML pipeline for transaction monitoring", tech: ["Python", "Kafka", "Flink", "XGBoost"], status: "completed", stars: 156, lastUpdated: "1 week ago", analysis: { technicalQuality: 90, industryRelevance: 95, complexity: 88, skillDepth: 92, portfolioValue: 93 } },
  { id: 4, name: "Personal Portfolio Website", description: "Next.js portfolio with blog and analytics", tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"], status: "completed", stars: 67, lastUpdated: "2 weeks ago", analysis: { technicalQuality: 75, industryRelevance: 70, complexity: 45, skillDepth: 60, portfolioValue: 80 } },
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("my-projects")
  const [showAnalysis, setShowAnalysis] = useState<number | null>(null)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Project Intelligence</h1>
            <p className="text-muted-foreground">Analyze and showcase your projects for maximum portfolio impact</p>
          </div>
          <Button variant="premium" onClick={() => setActiveTab("analyze")}>
            <Plus className="mr-2 h-4 w-4" />
            Analyze New Project
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="analyze">Analyze Project</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} onAnalyze={() => setShowAnalysis(project.id)} />
              ))}
            </div>
            
            {showAnalysis && (
              <ProjectAnalysisModal project={projects.find(p => p.id === showAnalysis)!} onClose={() => setShowAnalysis(null)} />
            )}
          </TabsContent>

          <TabsContent value="analyze" className="space-y-6">
            <ProjectAnalyzerForm onComplete={() => setActiveTab("my-projects")} />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5" />
                  Project Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "ML Pipeline Template", description: "End-to-end ML project structure with CI/CD", tech: ["Python", "DVC", "MLflow", "GitHub Actions"], difficulty: "Intermediate" },
                  { name: "LLM Application Starter", description: "RAG system with vector database and API", tech: ["Python", "LangChain", "Pinecone", "FastAPI"], difficulty: "Advanced" },
                  { name: "Computer Vision Pipeline", description: "Image classification with training and deployment", tech: ["PyTorch", "YOLO", "ONNX", "Triton"], difficulty: "Advanced" },
                  { name: "Data Engineering Portfolio", description: "ETL pipelines with orchestration and monitoring", tech: ["Python", "Airflow", "dbt", "PostgreSQL"], difficulty: "Intermediate" },
                ].map((template, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Code className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {template.tech.map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{template.difficulty}</Badge>
                      <Button variant="ghost" size="sm">Use Template</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function ProjectCard({ project, onAnalyze }: { project: any; onAnalyze: () => void }) {
  const statusColors = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    planned: "bg-muted text-muted-foreground border-border/50",
  }

  return (
    <Card className={cn("bg-card border-border/50 hover:border-primary/30 transition-colors", statusColors[project.status as keyof typeof statusColors])}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold">{project.name}</h4>
            <Badge variant={project.status === "completed" ? "gap" : project.status === "in-progress" ? "gap" : "outline"} gapType={project.status === "completed" ? "strong" : "moderate"}>
              {project.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.tech.map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
          </div>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <Star className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium">{project.stars}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Last updated: {project.lastUpdated}</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onAnalyze}><Eye className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={onAnalyze}>
          <Brain className="mr-2 h-4 w-4" />
          View AI Analysis
        </Button>
      </CardContent>
    </Card>
  )
}

function ProjectAnalysisModal({ project, onClose }: { project: any; onClose: () => void }) {
  const metrics = [
    { label: "Technical Quality", value: project.analysis.technicalQuality, icon: Code },
    { label: "Industry Relevance", value: project.analysis.industryRelevance, icon: Briefcase },
    { label: "Complexity", value: project.analysis.complexity, icon: GitBranch },
    { label: "Skill Depth", value: project.analysis.skillDepth, icon: Brain },
    { label: "Portfolio Value", value: project.analysis.portfolioValue, icon: Star },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card border border-border/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h2 className="text-xl font-bold">{project.name} - AI Analysis</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="text-center p-4 rounded-lg bg-muted/50">
                <m.icon className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="text-3xl font-bold">{m.value}%</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border/50 pt-6">
            <h3 className="font-semibold mb-4">Strengths</h3>
            <div className="flex flex-wrap gap-2">
              {["Production-ready architecture", "Clean code with tests", "Comprehensive documentation", "CI/CD pipeline included", "Scalable design patterns"].map((s, i) => (
                <Badge key={i} variant="secondary" className="gap">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="border-t border-border/50 pt-6">
            <h3 className="font-semibold mb-4">Areas for Improvement</h3>
            <div className="flex flex-wrap gap-2">
              {["Add performance benchmarks", "Include load testing results", "Add monitoring dashboards", "Document deployment process"].map((s, i) => (
                <Badge key={i} variant="outline" className="gap">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="border-t border-border/50 pt-6">
            <h3 className="font-semibold mb-4">Missing Components</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Detailed README with architecture diagrams", "Contribution guidelines", "License file", "Changelog", "Issue templates"].map((s, i) => (
                <li key={i} className="flex items-center gap-2"><Search className="h-4 w-4" />{s}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border/50 pt-6 flex gap-3">
            <Button variant="premium" className="flex-1"><Download className="mr-2 h-4 w-4" />Export Report</Button>
            <Button variant="outline" className="flex-1"><Share2 className="mr-2 h-4 w-4" />Share Analysis</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { X, Briefcase } from "lucide-react"

function ProjectAnalyzerForm({ onComplete }: { onComplete: () => void }) {
  const [formData, setFormData] = useState({ name: "", description: "", githubUrl: "", techStack: "", readme: "" })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    await new Promise(r => setTimeout(r, 3000))
    setResult({
      technicalQuality: 85,
      industryRelevance: 90,
      complexity: 88,
      skillDepth: 82,
      portfolioValue: 92,
      strengths: ["Modern tech stack", "Clean architecture", "Good test coverage"],
      improvements: ["Add benchmarks", "Improve documentation", "Add CI/CD"],
      missing: ["License", "Contributing guide", "Changelog"]
    })
    setIsAnalyzing(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Project Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Name</label>
              <Input placeholder="e.g., AI Code Reviewer" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub Repository URL</label>
              <Input placeholder="https://github.com/username/repo" value={formData.githubUrl} onChange={(e) => setFormData({...formData, githubUrl: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tech Stack (comma separated)</label>
              <Input placeholder="Python, FastAPI, PostgreSQL, Docker" value={formData.techStack} onChange={(e) => setFormData({...formData, techStack: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Description</label>
              <Textarea placeholder="Describe your project, its purpose, and key features..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">README Content (optional)</label>
              <Textarea placeholder="Paste your README.md content for deeper analysis..." value={formData.readme} onChange={(e) => setFormData({...formData, readme: e.target.value})} rows={6} />
            </div>
            <Button type="submit" variant="premium" className="w-full" disabled={isAnalyzing}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isAnalyzing ? "Analyzing..." : "Analyze Project"}
            </Button>
          </form>

          {result && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Analysis Results</h3>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { label: "Technical Quality", value: result.technicalQuality },
                  { label: "Industry Relevance", value: result.industryRelevance },
                  { label: "Complexity", value: result.complexity },
                  { label: "Skill Depth", value: result.skillDepth },
                  { label: "Portfolio Value", value: result.portfolioValue },
                ].map((m) => (
                  <div key={m.label} className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{m.value}%</p>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <Button variant="premium" className="w-full" onClick={onComplete}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Save to Portfolio
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { CheckCircle } from "lucide-react"