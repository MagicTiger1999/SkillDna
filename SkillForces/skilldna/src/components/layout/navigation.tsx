"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Menu, 
  X, 
  Sparkles, 
  Zap, 
  Layers, 
  PlayCircle, 
  AlertCircle, 
  ArrowRight,
  UserCheck,
  Rocket
} from "lucide-react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Features", href: "#features", icon: Sparkles, badge: "8-in-1 AI" },
    { name: "How It Works", href: "#how-it-works", icon: Zap },
    { name: "Problem", href: "#problem", icon: AlertCircle },
    { name: "Differentiator", href: "#differentiator", icon: Layers },
    { name: "Demo", href: "#demo", icon: PlayCircle },
  ]

  const authLinks = [
    { name: "Sign In", href: "/dashboard", variant: "ghost" as const, icon: UserCheck },
    { name: "Get Started Free", href: "/dashboard", variant: "premium" as const, icon: Rocket },
  ]

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md shadow-blue-500/20">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-semibold text-xl gradient-text">SkillDNA</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {authLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <Button variant={link.variant} size="sm">
                    {link.name}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className="relative z-50 text-foreground hover:bg-accent/50"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              {/* Mobile Drawer Navigation Menu */}
              {mobileMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in-0"
                    onClick={closeMenu}
                    aria-hidden="true"
                  />
                  <div className="fixed inset-x-0 top-16 z-50 p-4 bg-background/95 backdrop-blur-xl border-b border-border/60 shadow-2xl animate-in slide-in-from-top-4 duration-200">
                    <div className="flex flex-col gap-1.5 pb-3">
                      <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Navigation Options
                      </p>
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={closeMenu}
                          className="flex items-center justify-between px-3.5 py-2.5 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all border border-transparent hover:border-primary/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <link.icon className="h-4 w-4" />
                            </div>
                            <span>{link.name}</span>
                          </div>
                          {link.badge ? (
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-primary border border-primary/30">
                              {link.badge}
                            </span>
                          ) : (
                            <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
                          )}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-border/50 pt-3 flex flex-col gap-2">
                      <Link href="/dashboard" onClick={closeMenu} className="w-full">
                        <Button variant="outline" className="w-full justify-center gap-2 h-11 text-sm font-medium">
                          <UserCheck className="h-4 w-4" />
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/dashboard" onClick={closeMenu} className="w-full">
                        <Button variant="premium" className="w-full justify-center gap-2 h-11 text-sm font-medium">
                          <Rocket className="h-4 w-4" />
                          Get Started Free
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}