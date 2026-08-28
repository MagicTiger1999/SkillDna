"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  LayoutDashboard, 
  Dna, 
  Search, 
  MapPin, 
  Briefcase, 
  Code, 
  Newspaper, 
  Bot, 
  TrendingUp, 
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Brain,
  Target,
  Users,
  Crown
} from "lucide-react"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Skill DNA", href: "/dashboard/skill-dna", icon: Dna },
  { name: "Skill Gaps", href: "/dashboard/skill-gaps", icon: Search },
  { name: "Roadmap", href: "/dashboard/roadmap", icon: MapPin },
  { name: "Projects", href: "/dashboard/projects", icon: Code },
  { name: "Job Analyzer", href: "/dashboard/job-analyzer", icon: Briefcase },
  { name: "Tech Intelligence", href: "/dashboard/tech-intelligence", icon: Newspaper },
  { name: "AI Mentor", href: "/dashboard/mentor", icon: Bot },
  { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Subscription", href: "/dashboard/subscription", icon: Crown },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const session = {
    user: {
      name: "Satyam Kumar",
      email: "satyam@example.com",
      image: ""
    }
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024

  const handleNavClick = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border/50 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b border-border/50">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Brain className="h-5 w-5 text-white" />
              </div>
              {sidebarOpen && <span className="font-semibold text-lg gradient-text">SkillDNA</span>}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-muted-foreground hover:text-foreground"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  title={sidebarOpen ? undefined : item.name}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          <div className="p-3 border-t border-border/50">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              asChild
            >
              <Link href="/" onClick={handleNavClick}>
                <Users className="h-4 w-4" />
                {sidebarOpen && <span>Sign Out</span>}
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      <div className={cn("flex-1 flex flex-col overflow-hidden transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-20")}>
        <header className="h-16 bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-30">
          <div className="flex h-full items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold truncate">
                {navigation.find((item) => pathname === item.href || pathname.startsWith(item.href + "/"))?.name || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>

              <Link href="/dashboard/subscription">
                <Button variant="premium" size="sm" className="hidden sm:flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  <span>Upgrade</span>
                </Button>
              </Link>

              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">AI Engineer</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  67% Ready
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                      <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="w-full">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/subscription" className="w-full flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Subscription
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/" className="w-full text-red-400 focus:text-red-400">
                      Sign Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}