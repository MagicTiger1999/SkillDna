"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { 
  Newspaper, 
  Zap, 
  Brain, 
  Code, 
  Briefcase, 
  TrendingUp, 
  BookOpen,
  Filter,
  Bell,
  Bookmark,
  Share2,
  ExternalLink,
  Clock,
  Calendar,
  Tag,
  Star,
  Search
} from "lucide-react"
import { useState } from "react"

const articles = [
  { id: 1, title: "GPT-5: What We Know So Far", category: "AI Research", source: "OpenAI Blog", time: "2 hours ago", readTime: "8 min", relevance: 95, reason: "Directly impacts your LLM/RAG learning path", bookmarked: true, tags: ["LLM", "Generative AI", "Research"] },
  { id: 2, title: "Kubernetes 1.29: New Features for ML Workloads", category: "DevOps/MLOps", source: "CNCF", time: "5 hours ago", readTime: "12 min", relevance: 88, reason: "Critical for your MLOps gap closure", bookmarked: false, tags: ["Kubernetes", "MLOps", "Infrastructure"] },
  { id: 3, title: "State of AI Jobs 2024: Skills & Salaries", category: "Job Market", source: "Levels.fyi", time: "1 day ago", readTime: "15 min", relevance: 92, reason: "Shows demand for your target AI Engineer role", bookmarked: true, tags: ["Career", "Salaries", "Trends"] },
  { id: 4, title: "Building RAG Systems with LangChain v0.1", category: "Tutorial", source: "LangChain Blog", time: "1 day ago", readTime: "20 min", relevance: 90, reason: "Hands-on for your LLM application project", bookmarked: false, tags: ["RAG", "LangChain", "Tutorial"] },
  { id: 5, title: "PyTorch 2.3: Performance Improvements", category: "Tools", source: "PyTorch Blog", time: "2 days ago", readTime: "10 min", relevance: 85, reason: "Affects your deep learning workflow", bookmarked: false, tags: ["PyTorch", "Deep Learning", "Performance"] },
  { id: 6, title: "Vector Databases Compared: Pinecone vs Weaviate vs Qdrant", category: "Tools", source: "DB Weekly", time: "3 days ago", readTime: "18 min", relevance: 87, reason: "Needed for your RAG system project", bookmarked: true, tags: ["Vector DB", "RAG", "Comparison"] },
  { id: 7, title: "How Netflix Does ML at Scale", category: "Case Study", source: "Netflix Tech Blog", time: "4 days ago", readTime: "25 min", relevance: 80, reason: "Real-world ML system architecture", bookmarked: false, tags: ["ML Systems", "Scale", "Architecture"] },
  { id: 8, title: "Transformer Architecture Deep Dive", category: "AI Research", source: "Distill.pub", time: "1 week ago", readTime: "30 min", relevance: 93, reason: "Core knowledge for LLM understanding", bookmarked: true, tags: ["Transformers", "Attention", "Theory"] },
  { id: 9, title: "Senior AI Engineer Interview Guide", category: "Career", source: "Interviewing.io", time: "1 week ago", readTime: "22 min", relevance: 94, reason: "Direct interview prep for your target role", bookmarked: false, tags: ["Interview", "Career", "Preparation"] },
  { id: 10, title: "MLOps Best Practices 2024", category: "DevOps/MLOps", source: "MLOps Community", time: "1 week ago", readTime: "16 min", relevance: 89, reason: "Fills your MLOps skill gap", bookmarked: false, tags: ["MLOps", "Best Practices", "CI/CD"] },
]

const categories = ["All", "AI Research", "DevOps/MLOps", "Job Market", "Tutorial", "Tools", "Case Study", "Career"]

export default function TechIntelligencePage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const filteredArticles = articles.filter(a => 
    (filter === "All" || a.category === filter) &&
    a.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Tech Intelligence Feed</h1>
            <p className="text-muted-foreground">Personalized industry insights connected to your skill gaps</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
            <Button variant="premium" size="sm">
              <Zap className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">My Feed</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="digest">Weekly Digest</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(cat => (
                <Button key={cat} variant={filter === cat ? "premium" : "outline"} size="sm" onClick={() => setFilter(cat)}>
                  {cat}
                </Button>
              ))}
            </div>
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>

            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {articles.slice(0, 5).map((article, i) => (
                  <TrendingItem key={article.id} article={article} rank={i + 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Your Bookmarks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {articles.filter(a => a.bookmarked).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="digest" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Digest - Aug 26, 2024
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <DigestStat label="Articles Curated" value="24" />
                  <DigestStat label="High Relevance" value="18" />
                  <DigestStat label="Time Saved" value="4.2h" />
                </div>
                <div className="space-y-4">
                  {["AI Research", "DevOps/MLOps", "Career"].map((cat) => (
                    <DigestSection key={cat} category={cat} articles={articles.filter(a => a.category === cat).slice(0, 3)} />
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

function ArticleCard({ article }: { article: any }) {
  return (
    <Card className="bg-card border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Newspaper className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="secondary" className="text-xs">{article.category}</Badge>
              <span className="text-xs text-muted-foreground">{article.source}</span>
              <span className="text-xs text-muted-foreground">{article.time}</span>
              <span className="text-xs text-muted-foreground">{article.readTime}</span>
              <Badge variant="outline" className="text-xs ml-auto">
                <Star className="mr-1 h-3 w-3" />
                {article.relevance}%
              </Badge>
            </div>
            <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">Why this matters to you: {article.reason}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {article.tags.map((tag: string) => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className={article.bookmarked ? "text-amber-400" : ""}>
                <Bookmark className="mr-1 h-4 w-4" />
                {article.bookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="mr-1 h-4 w-4" />
                Read
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TrendingItem({ article, rank }: { article: any; rank: number }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
      <span className="text-2xl font-bold text-muted-foreground/50 w-8 text-center">#{rank}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{article.title}</p>
        <p className="text-sm text-muted-foreground">{article.category} • {article.readTime} • {article.time}</p>
      </div>
      <Badge variant="outline" className="text-xs">
        <Star className="mr-1 h-3 w-3" />
        {article.relevance}%
      </Badge>
    </div>
  )
}

function DigestStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50 text-center">
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function DigestSection({ category, articles }: { category: string; articles: any[] }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <Tag className="h-4 w-4" />
        {category}
      </h4>
      <ul className="space-y-2">
        {articles.map((a) => (
          <li key={a.id} className="flex items-center justify-between text-sm">
            <span className="truncate pr-2">{a.title}</span>
            <Badge variant="outline" className="text-xs">{a.relevance}%</Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}