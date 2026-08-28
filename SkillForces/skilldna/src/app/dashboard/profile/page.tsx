"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { cn, getProficiencyColor } from "@/lib/utils"
import { 
  User, 
  Award, 
  Code, 
  BookOpen, 
  Briefcase, 
  Target, 
  Calendar,
  MapPin,
  Mail,
  Phone,
  User as LinkedinIcon,
  MessageSquare as TwitterIcon,
  Globe,
  Edit,
  Download,
  Share2,
  Settings,
  Star,
  Flame,
  Trophy,
  CheckCircle,
  Brain,
  GitBranch,
  Globe as GlobeIcon,
  Cloud,
  MessageSquare,
  Puzzle,
  Dna,
  TrendingUp,
  Clock,
  Zap,
  AlertTriangle
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"

const profileData = {
  name: "Satyam Kumar",
  role: "Aspiring AI Engineer",
  location: "Bangalore, India",
  email: "satyam@example.com",
  bio: "Passionate about building intelligent systems that solve real-world problems. Currently focused on deep learning, MLOps, and scalable ML infrastructure. Love contributing to open source and sharing knowledge through technical writing.",
  joinDate: "January 2024",
  stats: { projects: 4, articles: 12, hours: 142, streak: 23 },
  skills: [
    { name: "Programming", value: 82, color: "#3b82f6", icon: Code },
    { name: "DSA", value: 61, color: "#a855f7", icon: GitBranch },
    { name: "Machine Learning", value: 43, color: "#ec4899", icon: Brain },
    { name: "Web Development", value: 72, color: "#06b6d4", icon: GlobeIcon },
    { name: "Git/GitHub", value: 52, color: "#f97316", icon: GitBranch },
    { name: "Cloud", value: 35, color: "#6366f1", icon: Cloud },
    { name: "Communication", value: 89, color: "#22c55e", icon: MessageSquare },
    { name: "Problem Solving", value: 75, color: "#ef4444", icon: Puzzle },
  ],
  social: {
    linkedin: "linkedin.com/in/satyam-kumar",
    github: "github.com/shome-t",
    twitter: "x.com/soumyajit-b",
    website: "satyam.dev",
  },
  achievements: [
    { id: 1, title: "Week 3 Complete", desc: "Linear & Logistic Regression", date: "Jun 15, 2024", icon: Award, color: "#22c55e", type: "milestone" },
    { id: 2, title: "ML Assessment", desc: "Scored 43% proficiency", date: "Jun 10, 2024", icon: Brain, color: "#ec4899", type: "skill" },
    { id: 3, title: "LeetCode 50", desc: "Solved 50 DSA problems", date: "Jun 8, 2024", icon: Trophy, color: "#a855f7", type: "streak" },
    { id: 4, title: "AWS Certified", desc: "Cloud Practitioner certified", date: "Jun 5, 2024", icon: Award, color: "#6366f1", type: "cert" },
    { id: 5, title: "Project Published", desc: "AI Code Reviewer - 95% score", date: "May 28, 2024", icon: Code, color: "#3b82f6", type: "project" },
    { id: 6, title: "7-Day Streak", desc: "Consistent learning streak", date: "May 20, 2024", icon: Flame, color: "#f59e0b", type: "streak" },
  ],
  projects: [
    { name: "AI Code Reviewer", desc: "Automated code review using LLMs", tech: ["Python", "FastAPI", "GPT-4"], stars: 245, score: 95 },
    { name: "ML Deployment Platform", desc: "Kubernetes-based ML serving", tech: ["Go", "Kubernetes", "Docker"], stars: 89, score: 88 },
    { name: "Fraud Detection System", desc: "Real-time streaming ML pipeline", tech: ["Python", "Kafka", "XGBoost"], stars: 156, score: 93 },
  ],
  activity: [
    { action: "Completed Linear Regression module", time: "2 hours ago", type: "completion" },
    { action: "Analyzed project: AI Code Reviewer", time: "1 day ago", type: "analysis" },
    { action: "Skill updated: Machine Learning → 43%", time: "2 days ago", type: "skill" },
    { action: "Read: GPT-5: What We Know So Far", time: "3 days ago", type: "reading" },
    { action: "Completed Week 3 milestone", time: "4 days ago", type: "milestone" },
  ]
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Satyam Kumar",
    email: "satyam@example.com",
    bio: "Aspiring AI Engineer passionate about ML and building intelligent systems.",
    location: "Bangalore, India",
    website: "https://satyam.dev",
    linkedin: "example.h",
    github: "example.h",
    twitter: "example.h",
  })

  useEffect(() => {
    const saved = localStorage.getItem("skilldna-profile")
    if (saved) {
      try {
        setProfile(JSON.parse(saved))
      } catch (e) {}
    }
  }, [])

  const mergedProfile = {
    ...profileData,
    name: profile.name,
    bio: profile.bio,
    location: profile.location,
    email: profile.email,
    social: {
      linkedin: profile.linkedin.includes("linkedin.com") ? profile.linkedin : `linkedin.com/in/${profile.linkedin}`,
      github: profile.github.includes("github.com") ? profile.github : `github.com/${profile.github}`,
      twitter: profile.twitter.includes("x.com") || profile.twitter.includes("twitter.com") ? profile.twitter : `x.com/${profile.twitter}`,
      website: profile.website,
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Your public profile and portfolio showcase</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share Profile
            </Button>
            <Button variant={isEditing ? "premium" : "outline"} size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <CheckCircle className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
              {isEditing ? "Done Editing" : "Edit Profile"}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="" alt={mergedProfile.name} />
                      <AvatarFallback className="text-4xl">SK</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="default" size="icon" className="absolute bottom-2 right-2 h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600">
                        <Edit className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                      <h1 className="text-3xl font-bold">{mergedProfile.name}</h1>
                      <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">{mergedProfile.role}</Badge>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">{mergedProfile.bio}</p>
                    <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground flex-wrap">
                      <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{mergedProfile.location}</div>
                      <div className="flex items-center gap-1"><Mail className="h-4 w-4" />{mergedProfile.email}</div>
                      <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />Joined {mergedProfile.joinDate}</div>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
                      <SocialLink icon={LinkedinIcon} href={`https://${mergedProfile.social.linkedin}`} label="LinkedIn" />
                      <SocialLink icon={GitBranch} href={`https://${mergedProfile.social.github}`} label="GitHub" />
                      <SocialLink icon={TwitterIcon} href={`https://${mergedProfile.social.twitter}`} label="Twitter" />
                      <SocialLink icon={Globe} href={`https://${mergedProfile.social.website}`} label="Website" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center w-full md:w-auto">
                    <StatItem label="Projects" value={mergedProfile.stats.projects} icon={Code} color="#3b82f6" />
                    <StatItem label="Articles" value={mergedProfile.stats.articles} icon={BookOpen} color="#a855f7" />
                    <StatItem label="Hours" value={mergedProfile.stats.hours} icon={Clock} color="#ec4899" />
                    <StatItem label="Streak" value={`${mergedProfile.stats.streak} days`} icon={Flame} color="#f59e0b" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Current Focus
                  </CardTitle>
                  <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">Week 3 of 12</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                        <Brain className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold">Deep Learning Fundamentals</p>
                        <p className="text-sm text-muted-foreground">Neural Networks & Backpropagation</p>
                      </div>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">65% complete • 18h estimated remaining</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FocusItem label="This Week" value="18h" target="20h" icon={Clock} />
                    <FocusItem label="Overall" value="67%" target="80%" icon={TrendingUp} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Dna className="h-5 w-5" />
                    Skill DNA Summary
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/dashboard/skill-dna">View Details</a>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <SkillSummaryItem label="Industry Readiness" value="67%" color="#22c55e" icon={TrendingUp} />
                    <SkillSummaryItem label="Strongest Skill" value="Communication" sub="89%" color="#22c55e" icon={Award} />
                    <SkillSummaryItem label="Biggest Gap" value="Machine Learning" sub="43%" color="#ec4899" icon={AlertTriangle} />
                    <SkillSummaryItem label="Priority Focus" value="DSA" sub="61%" color="#a855f7" icon={Target} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill.name} variant="outline" className="gap" style={{ borderColor: `${skill.color}40`, color: skill.color }}>
                        <skill.icon className="mr-1 h-3 w-3" />
                        {skill.name} {skill.value}%
                      </Badge>
                    ))}
                    <Badge variant="secondary">+{profileData.skills.length - 4} more</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  All Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.skills.map((skill) => (
                  <SkillProfileRow key={skill.name} skill={skill} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {profileData.projects.map((project, i) => (
                <ProjectProfileCard key={i} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Achievements & Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profileData.achievements.map((ach) => (
                  <AchievementRow key={ach.id} ach={ach} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profileData.activity.map((act, i) => (
                  <ActivityRow key={i} activity={act} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function StatItem({ label, value, icon: Icon, color }: any) {
  return (
    <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg mx-auto mb-2" style={{ backgroundColor: `${color}20` }}>
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function SocialLink({ icon: Icon, href, label }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </a>
  )
}

function FocusItem({ label, value, target, icon: Icon }: any) {
  return (
    <div className="p-3 rounded-lg bg-muted/50 border border-border/50 text-center">
      <Icon className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">Target: {target}</p>
    </div>
  )
}

function SkillSummaryItem({ label, value, sub, color, icon: Icon }: any) {
  return (
    <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4" style={{ color }} />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-bold" style={{ color }}>{value}</span>
        {sub && <span className="text-sm text-muted-foreground">{sub}</span>}
      </div>
    </div>
  )
}

function SkillProfileRow({ skill }: { skill: any }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", `bg-[${skill.color}]/10`)}>
            <skill.icon className="h-6 w-6" style={{ color: skill.color }} />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold truncate">{skill.name}</h4>
            <p className="text-sm text-muted-foreground">Proficiency Level</p>
          </div>
        </div>
        <div className="flex items-center gap-4 min-w-[180px]">
          <span className={cn("text-xl font-bold", getProficiencyColor(skill.value))} style={{ color: skill.value > 70 ? "#22c55e" : skill.value > 50 ? "#f59e0b" : "#ef4444" }}>
            {skill.value}%
          </span>
          <Progress value={skill.value} className="w-32 h-1.5" />
        </div>
      </div>
    </div>
  )
}

function ProjectProfileCard({ project }: { project: any }) {
  return (
    <Card className="bg-card border-border/50 hover:border-primary/30 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold">{project.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">{project.desc}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{project.stars}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex flex-wrap gap-1">
          {project.tech.map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Badge variant="outline" className="gap">
            <Brain className="mr-1 h-3 w-3" />
            AI Score: {project.score}%
          </Badge>
          <Button variant="ghost" size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AchievementRow({ ach }: { ach: any }) {
  const typeLabels = { milestone: "Milestone", skill: "Skill", streak: "Streak", cert: "Certification", project: "Project" }
  const typeColors = { milestone: "#3b82f6", skill: "#ec4899", streak: "#f59e0b", cert: "#6366f1", project: "#22c55e" }

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${ach.color}20` }}>
        <ach.icon className="h-5 w-5" style={{ color: ach.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold truncate">{ach.title}</h4>
          <Badge variant="outline" className="text-xs" style={{ borderColor: `${typeColors[ach.type as keyof typeof typeColors]}40`, color: typeColors[ach.type as keyof typeof typeColors] }}>
            {typeLabels[ach.type as keyof typeof typeLabels]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">{ach.desc}</p>
      </div>
      <span className="text-sm text-muted-foreground flex-shrink-0">{ach.date}</span>
    </div>
  )
}

function ActivityRow({ activity }: { activity: any }) {
  const typeIcons = { completion: CheckCircle, analysis: Brain, skill: TrendingUp, reading: BookOpen, milestone: Trophy }
  const typeColors = { completion: "#22c55e", analysis: "#ec4899", skill: "#3b82f6", reading: "#a855f7", milestone: "#f59e0b" }
  const Icon = typeIcons[activity.type as keyof typeof typeIcons]

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: `${typeColors[activity.type as keyof typeof typeColors]}20` }}>
        <Icon className="h-4 w-4" style={{ color: typeColors[activity.type as keyof typeof typeColors] }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">{activity.action}</p>
        <p className="text-sm text-muted-foreground">{activity.time}</p>
      </div>
    </div>
  )
}