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
  Bot, 
  MessageSquare, 
  Sparkles, 
  Brain, 
  Target, 
  BookOpen,
  Code,
  Briefcase,
  TrendingUp,
  Settings,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Plus,
  History,
  Mic,
  Send
} from "lucide-react"
import { useState, useRef, useEffect } from "react"

const suggestedPrompts = [
  "What should I learn next for AI Engineer?",
  "Review my Skill DNA and suggest improvements",
  "Create a 4-week plan to close my ML gap",
  "How do I prepare for AI Engineer interviews?",
  "Suggest a portfolio project for my level",
  "Explain transformer architecture simply",
]

const mockResponses: Record<string, string> = {
  "what should i learn next": "Based on your Skill DNA, your biggest gap is **Machine Learning (43%)**. I recommend focusing on:\n1. **Deep Learning Fundamentals** - Neural networks, backpropagation, CNNs\n2. **PyTorch** - Industry standard for research and production\n3. **MLOps** - Docker, Kubernetes, model deployment\n\nWould you like a detailed 12-week roadmap for this?",
  "review my skill dna": "Your Skill DNA shows:\n- **Strongest**: Communication (89%), Programming (82%)\n- **Biggest Gaps**: ML (43%), Cloud (35%), DSA (61%)\n- **Industry Readiness**: 67%\n\n**Priority Order**: ML → DSA → Cloud → System Design\nYour communication and programming are already interview-ready!",
  "create a 4-week plan": "**4-Week ML Gap Closure Plan**\n\n**Week 1**: Python + NumPy + Pandas mastery (12h)\n**Week 2**: Probability, Statistics, Linear Algebra (15h)\n**Week 3**: Linear/Logistic Regression, Scikit-learn (18h)\n**Week 4**: Decision Trees, Random Forests, Model Evaluation (20h)\n\nEach week includes: theory → coding practice → mini-project",
  "how do i prepare": "**AI Engineer Interview Prep**\n\n**Technical (60%)**:\n- ML System Design (Netflix, Uber case studies)\n- Coding: LeetCode 150 (focus on arrays, trees, graphs)\n- ML Theory: Bias-variance, regularization, evaluation metrics\n\n**Behavioral (20%)**: STAR stories for ML projects\n**Domain (20%)**: Your specific interest area (NLP/CV/GenAI)",
  "suggest a portfolio project": "**Recommended: RAG-based Document Q&A System**\n\n**Why**: Covers your gaps (LLMs, MLOps, Deployment) + high portfolio value\n\n**Stack**: LangChain, Pinecone, FastAPI, Docker, Kubernetes\n**Features**: Document ingestion, vector search, citation, streaming responses\n**Timeline**: 3-4 weeks\n\n**Alternative**: Real-time Fraud Detection with Kafka + Flink + XGBoost",
}

export default function AIPromptPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([
    { role: "assistant", content: "Hi! I'm your AI Career Mentor. I have access to your Skill DNA and can help with learning plans, interview prep, project ideas, and career decisions. What would you like to discuss?" }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{id: number, title: string, date: string}>>([
    { id: 1, title: "ML Roadmap Discussion", date: "2 days ago" },
    { id: 2, title: "Interview Prep Strategy", date: "1 week ago" },
    { id: 3, title: "Project Idea: RAG System", date: "2 weeks ago" },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return
    
    const userMessage = input
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setInput("")
    setIsLoading(true)

    await new Promise(r => setTimeout(r, 1500))
    
    const lowerInput = userMessage.toLowerCase()
    let response = "I understand. Let me think about that based on your profile..."
    
    for (const [key, value] of Object.entries(mockResponses)) {
      if (lowerInput.includes(key)) {
        response = value
        break
      }
    }
    
    setMessages(prev => [...prev, { role: "assistant", content: response }])
    setIsLoading(false)
  }

  const handleSuggestedClick = (prompt: string) => {
    setInput(prompt)
    handleSend()
  }

  const handleNewChat = () => {
    setMessages([{ role: "assistant", content: "Hi! I'm your AI Career Mentor. How can I help you today?" }])
    setActiveTab("chat")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">AI Career Mentor</h1>
            <p className="text-muted-foreground">Your personalized career advisor with full context of your Skill DNA</p>
          </div>
          <Button variant="premium" onClick={handleNewChat}>
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="context">My Context</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 flex flex-col h-[600px]">
                <Card className="bg-card border-border/50 flex-1 flex flex-col">
                  <CardHeader className="border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        Conversation
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Context Active</Badge>
                        <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                      <MessageBubble key={i} message={msg} />
                    ))}
                    <div ref={messagesEndRef} />
                    {isLoading && (
                      <div className="flex items-start gap-3 animate-pulse">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="flex-1 max-w-2xl">
                          <div className="bg-muted/50 rounded-2xl p-4">
                            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-border/50 p-4">
                    <form onSubmit={handleSend} className="flex items-end gap-3">
                      <Textarea
                        placeholder="Ask about learning paths, interviews, projects, or career decisions..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 min-h-[44px] max-h-32 resize-none pr-10"
                        rows={1}
                        disabled={isLoading}
                      />
                      <Button type="submit" variant="premium" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {suggestedPrompts.slice(0, 4).map((prompt) => (
                        <Button key={prompt} variant="outline" size="sm" onClick={() => handleSuggestedClick(prompt)} className="text-xs">
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Your Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ContextItem label="Target Role" value="AI Engineer" icon={<Target className="h-4 w-4" />} />
                    <ContextItem label="Industry Readiness" value="67%" icon={<TrendingUp className="h-4 w-4" />} />
                    <ContextItem label="Top Gap" value="Machine Learning (43%)" icon={<AlertTriangle className="h-4 w-4" />} />
                    <ContextItem label="Strongest" value="Communication (89%)" icon={<Award className="h-4 w-4" />} />
                    <ContextItem label="Current Focus" value="Deep Learning Fundamentals" icon={<BookOpen className="h-4 w-4" />} />
                    <ContextItem label="Week" value="3 of 12" icon={<Calendar className="h-4 w-4" />} />
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <QuickAction label="Generate Learning Plan" icon={<BookOpen className="h-4 w-4" />} onClick={() => handleSuggestedClick("Create a 4-week plan to close my ML gap")} />
                    <QuickAction label="Interview Prep Guide" icon={<Briefcase className="h-4 w-4" />} onClick={() => handleSuggestedClick("How do I prepare for AI Engineer interviews?")} />
                    <QuickAction label="Project Suggestion" icon={<Code className="h-4 w-4" />} onClick={() => handleSuggestedClick("Suggest a portfolio project for my level")} />
                    <QuickAction label="Skill Gap Analysis" icon={<TrendingUp className="h-4 w-4" />} onClick={() => handleSuggestedClick("Review my Skill DNA and suggest improvements")} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Chat History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className="p-4 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{chat.title}</p>
                      <p className="text-sm text-muted-foreground">{chat.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">Continue</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="context" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Mentor Context Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">What the mentor knows about you:</h4>
                  <ContextToggle label="Skill DNA Profile" enabled />
                  <ContextToggle label="Gap Analysis" enabled />
                  <ContextToggle label="Learning Roadmap" enabled />
                  <ContextToggle label="Project Portfolio" enabled />
                  <ContextToggle label="Job Preferences" enabled />
                  <ContextToggle label="Interview History" enabled={false} />
                </div>
                <div className="border-t border-border/50 pt-4">
                  <h4 className="font-semibold mb-4">Mentor Personality</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Encouraging", "Direct", "Detailed", "Concise"].map((style) => (
                      <Button key={style} variant="outline" className="capitalize">{style}</Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function MessageBubble({ message }: { message: { role: string; content: string } }) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex gap-3", isUser && "justify-end")}>
      {!isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div className={cn("flex-1 max-w-2xl", isUser && "text-right")}>
        <div className={cn("inline-block rounded-2xl p-4", isUser ? "bg-primary text-primary-foreground" : "bg-muted/50")}>
          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
        </div>
        {!isUser && (
          <div className="flex items-center gap-2 mt-1 ml-10 text-xs text-muted-foreground">
            <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsUp className="h-3 w-3" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsDown className="h-3 w-3" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6"><RotateCcw className="h-3 w-3" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-3 w-3" /></Button>
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted flex-shrink-0">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}

function ContextItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  )
}

function ContextToggle({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <span className="font-medium">{label}</span>
      <input type="checkbox" defaultChecked={enabled} className="h-4 w-4" readOnly />
    </div>
  )
}

function QuickAction({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <Button variant="outline" className="w-full justify-start gap-3" onClick={onClick}>
      {icon}
      <span>{label}</span>
    </Button>
  )
}

import { AlertTriangle, Award, Calendar, User } from "lucide-react"
import { CardFooter } from "@/components/ui/card"