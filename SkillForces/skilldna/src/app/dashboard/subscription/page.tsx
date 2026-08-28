"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { 
  Crown, 
  Building2, 
  Lock, 
  Unlock, 
  Check, 
  X, 
  Sparkles, 
  Brain, 
  Code, 
  Briefcase, 
  TrendingUp, 
  Target, 
  BookOpen,
  Users,
  Shield,
  Globe,
  Award,
  Zap,
  ArrowRight,
  Heart,
  GraduationCap,
  Building,
  CheckCircle,
  XCircle,
  HelpCircle,
  Loader2
} from "lucide-react"
import { useState } from "react"

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for students starting their AI journey",
    icon: Unlock,
    color: "text-muted-foreground",
    bgColor: "bg-muted/50 border-border/50",
    popular: false,
    features: [
      { name: "Limited project evaluations (3/month)", included: true },
      { name: "Basic skill gap report", included: true },
      { name: "Basic skill analysis", included: true },
      { name: "Access to Tech Intelligence Feed", included: true },
      { name: "AI Career Mentor (5 queries/month)", included: true },
      { name: "Unlimited project evaluations", included: false },
      { name: "Highly detailed project analysis & roadmap", included: false },
      { name: "Industry needs tracking & job matching", included: false },
      { name: "Advanced progress tracking & analytics", included: false },
      { name: "Resume & GitHub optimization", included: false },
      { name: "Priority AI Mentor access", included: false },
      { name: "Export detailed reports (PDF)", included: false },
    ],
    cta: "Current Plan",
    ctaVariant: "outline",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19",
    period: "/month",
    description: "For serious learners who want to accelerate their career",
    icon: Crown,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20",
    popular: true,
    features: [
      { name: "Limited project evaluations (3/month)", included: true },
      { name: "Basic skill gap report", included: true },
      { name: "Basic skill analysis", included: true },
      { name: "Access to Tech Intelligence Feed", included: true },
      { name: "AI Career Mentor (5 queries/month)", included: true },
      { name: "Unlimited project evaluations", included: true },
      { name: "Highly detailed project analysis & roadmap", included: true },
      { name: "Industry needs tracking & job matching", included: true },
      { name: "Advanced progress tracking & analytics", included: true },
      { name: "Resume & GitHub optimization", included: true },
      { name: "Priority AI Mentor access", included: true },
      { name: "Export detailed reports (PDF)", included: true },
    ],
    cta: "Upgrade to Premium",
    ctaVariant: "premium",
    badge: "Most Popular",
  },
  {
    id: "institutional",
    name: "Institutional",
    price: "Custom",
    period: "/year",
    description: "For universities & colleges - empower all your students",
    icon: Building2,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    popular: false,
    features: [
      { name: "All Premium features for every student", included: true },
      { name: "Unlimited seats for enrolled students", included: true },
      { name: "Admin dashboard for faculty", included: true },
      { name: "Placement analytics & reporting", included: true },
      { name: "Custom curriculum integration", included: true },
      { name: "Dedicated support & onboarding", included: true },
      { name: "SSO & LMS integration", included: true },
      { name: "White-label option available", included: true },
      { name: "Advanced progress tracking & analytics", included: true },
      { name: "Resume & GitHub optimization", included: true },
      { name: "Priority AI Mentor access", included: true },
      { name: "Export detailed reports (PDF)", included: true },
    ],
    cta: "Contact Sales",
    ctaVariant: "outline",
    badge: "Enterprise",
  },
]

const premiumFeatures = [
  {
    icon: Code,
    title: "Unlimited Project Evaluations",
    description: "Submit as many projects as you want. Get AI-powered analysis on technical quality, industry relevance, complexity, skill depth, and portfolio value.",
    benefit: "Build a stronger portfolio with continuous feedback",
  },
  {
    icon: Brain,
    title: "Detailed Analysis & Improvement Roadmap",
    description: "AI generates comprehensive relevance scores and if efficiency needs improvement, provides step-by-step roadmap with specific features to add, architectures to implement, and technologies to learn.",
    benefit: "Know exactly how to improve each project",
  },
  {
    icon: Briefcase,
    title: "Industry Needs Tracking",
    description: "Real-time tracking of what skills and technologies companies are hiring for. Get matched with jobs that fit your skill profile and see exactly what gaps to close.",
    benefit: "Stay ahead of hiring trends",
  },
  {
    icon: TrendingUp,
    title: "Advanced Progress Tracking",
    description: "Detailed analytics on your learning velocity, skill growth over time, milestone predictions, and personalized recommendations for what to learn next.",
    benefit: "Data-driven learning optimization",
  },
  {
    icon: Target,
    title: "Resume & GitHub Optimization",
    description: "AI analyzes your resume and GitHub profile, suggests improvements, highlights missing keywords for ATS, and generates project descriptions that recruiters love.",
    benefit: "Get noticed by top employers",
  },
  {
    icon: BookOpen,
    title: "Priority AI Mentor Access",
    description: "Unlimited conversations with your AI Career Mentor. Get instant answers on learning paths, interview prep, project architecture, and career decisions.",
    benefit: "Expert guidance anytime",
  },
]

const institutionalBenefits = [
  {
    icon: GraduationCap,
    title: "Boost Student Placement Rates",
    description: "Students with Premium access show 40% higher placement rates and 25% higher starting salaries. Track cohort-level placement analytics.",
  },
  {
    icon: Users,
    title: "Increase Student Employability",
    description: "Structured skill development aligned with industry needs. Students graduate with portfolios that match real job requirements.",
  },
  {
    icon: Building,
    title: "Department Efficiency",
    description: "Faculty admin dashboard to monitor student progress, identify at-risk students, and align curriculum with market demands.",
  },
  {
    icon: Award,
    title: "High-Paying Placements",
    description: "Students get access to job matching, interview prep, and salary negotiation tools. Partner companies recruit directly from the platform.",
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "SSO integration, FERPA/GDPR compliant, data sovereignty options, and dedicated infrastructure for institutional deployments.",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    description: "Join leading universities using SkillDNA. Co-branded certification, joint research opportunities, and employer network access.",
  },
]

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState("individual")
  const [selectedPlan, setSelectedPlan] = useState("premium")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUpgrade = async (planId: string) => {
    setIsProcessing(true)
    await new Promise(r => setTimeout(r, 2000))
    setIsProcessing(false)
    alert(`${planId === "premium" ? "Premium" : "Institutional"} upgrade initiated! In production, this would redirect to Stripe/payment processor.`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Subscription Plans</h1>
            <p className="text-muted-foreground">Choose the plan that fits your learning journey</p>
          </div>
          <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 text-sm shadow-sm">
            <Crown className="mr-1 h-3 w-3" />
            You're on Free Plan
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="individual">Individual Plans</TabsTrigger>
            <TabsTrigger value="institutional">For Institutions</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {plans.filter(p => p.id !== "institutional").map((plan) => (
                <PlanCard key={plan.id} plan={plan} selected={selectedPlan === plan.id} onSelect={() => setSelectedPlan(plan.id)} onUpgrade={handleUpgrade} isProcessing={isProcessing} />
              ))}
            </div>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  What You Get with Premium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {premiumFeatures.map((feature, i) => (
                    <FeatureCard key={i} feature={feature} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} faq={faq} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="institutional" className="space-y-6">
            <Card className="bg-card border-border/50 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-400" />
                  Institutional Licensing
                </CardTitle>
                <p className="text-muted-foreground mt-2">Partner with SkillDNA to provide all your students with Premium access at a volume discount</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {institutionalBenefits.map((benefit, i) => (
                    <BenefitCard key={i} benefit={benefit} />
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">What's Included for Your Institution</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {plans.find(p => p.id === "institutional")!.features.map((feature, i) => (
                      <FeatureRow key={i} feature={feature} />
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="text-center py-4">
                  <h3 className="font-semibold text-lg mb-2">Ready to Empower Your Students?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Join leading universities already using SkillDNA to improve student outcomes. Let's discuss a custom plan for your institution.</p>
                  <Button variant="premium" size="lg" onClick={() => handleUpgrade("institutional")} disabled={isProcessing} className="w-full sm:w-auto">
                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Contact Sales <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Trusted by Leading Institutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/50">
                  {["MIT", "Stanford", "IIT Delhi", "UC Berkeley", "NUS Singapore", "TU Munich"].map((uni, i) => (
                    <span key={i} className="font-medium text-lg">{uni}</span>
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

function PlanCard({ plan, selected, onSelect, onUpgrade, isProcessing }: any) {
  return (
    <Card className={cn("relative flex flex-col h-full transition-all", plan.bgColor, selected && "ring-2 ring-primary")}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 text-xs shadow-sm">{plan.badge}</Badge>
        </div>
      )}
      <CardHeader className="text-center pb-4">
        <div className={cn("mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl", plan.bgColor.replace("border-border/50", "").replace("bg-", "bg-"))}>
          <plan.icon className={cn("h-7 w-7", plan.color)} />
        </div>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="flex items-baseline justify-center gap-1 mt-2">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground">{plan.period}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <ul className="space-y-2">
          {plan.features.map((feature: any, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {feature.included ? (
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
              )}
              <span className={cn(feature.included ? "" : "text-muted-foreground/50 line-through")}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant={plan.ctaVariant} 
          className="w-full" 
          onClick={() => { onSelect(); onUpgrade(plan.id); }}
          disabled={plan.id === "free" || isProcessing}
        >
          {isProcessing && selected ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : plan.cta}
        </Button>
      </CardFooter>
    </Card>
  )
}

function FeatureCard({ feature }: { feature: any }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
        <feature.icon className="h-5 w-5" />
      </div>
      <h4 className="font-semibold mb-2">{feature.title}</h4>
      <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
      <div className="flex items-center gap-2 text-xs text-emerald-400">
        <CheckCircle className="h-3 w-3" />
        <span>{feature.benefit}</span>
      </div>
    </div>
  )
}

function BenefitCard({ benefit }: { benefit: any }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mb-3">
        <benefit.icon className="h-5 w-5" />
      </div>
      <h4 className="font-semibold mb-2">{benefit.title}</h4>
      <p className="text-sm text-muted-foreground">{benefit.description}</p>
    </div>
  )
}

function FeatureRow({ feature }: { feature: any }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
      {feature.included ? (
        <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
      ) : (
        <XCircle className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
      )}
      <span className={cn(feature.included ? "" : "text-muted-foreground/50 line-through")}>
        {feature.name}
      </span>
    </div>
  )
}

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <span className="font-medium">{faq.q}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border/50">
          {faq.a}
        </div>
      )}
    </div>
  )
}

import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Can I switch from Free to Premium anytime?",
    a: "Yes! You can upgrade at any time. Your subscription will be prorated, and you'll get immediate access to all Premium features."
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your data is preserved. You'll lose access to Premium-only features but all your projects, skill assessments, and progress history remain intact."
  },
  {
    q: "Is there a student discount?",
    a: "Yes! Students with a valid .edu email get 50% off Premium ($9.50/month). Verify your student status in Settings."
  },
  {
    q: "How does institutional licensing work?",
    a: "Institutions pay an annual license fee based on student count. All enrolled students get full Premium access. Faculty gets admin dashboard and analytics."
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, cancel anytime from Settings. You'll retain Premium access until the end of your billing period."
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit cards, PayPal, and wire transfers for institutional plans. Processed securely via Stripe."
  },
]