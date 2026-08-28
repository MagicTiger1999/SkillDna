"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Loader2, 
  Camera, 
  X, 
  User, 
  Briefcase, 
  Link2, 
  ImageIcon, 
  CheckCircle,
  Brain,
  Upload,
  Globe,
  Building,
  Award,
  MapPin,
  Mail,
  Phone,
  Sparkles
} from "lucide-react"
import { useUserProfile, computeInitials } from "@/lib/user-profile-context"

const STEPS = [
  { id: "personal", title: "Personal Info", icon: User, description: "Your basic contact details" },
  { id: "photo", title: "Profile Photo", icon: ImageIcon, description: "Add a picture or use initials" },
  { id: "career", title: "Career Preferences", icon: Briefcase, description: "Your role and work goals" },
  { id: "social", title: "Social Links", icon: Link2, description: "Your online profiles" },
  { id: "review", title: "Review & Complete", icon: CheckCircle, description: "Confirm your information" },
] as const

type StepId = typeof STEPS[number]["id"]

const TARGET_ROLES = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "MLOps Engineer",
  "Research Scientist",
  "Data Engineer",
  "AI Product Manager",
  "Other",
]

const EXPERIENCE_LEVELS = [
  "Student / Entry Level (0-1 years)",
  "Junior (1-2 years)",
  "Mid Level (2-5 years)",
  "Senior (5-8 years)",
  "Staff / Principal (8+ years)",
]

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Automotive",
  "Research",
]

const WORK_PREFERENCES = [
  "Remote",
  "Hybrid",
  "On-site",
  "Relocation Open",
]

export default function OnboardingPage() {
  const router = useRouter()
  const { 
    profile, 
    updatePersonal, 
    updateProfilePhoto, 
    removeProfilePhoto,
    updateCareer, 
    updateSocial, 
    completeOnboarding 
  } = useUserProfile()
  
  const [currentStep, setCurrentStep] = useState<StepId>("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep)
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === STEPS.length - 1

  const userInitials = computeInitials(profile.personal.fullName)

  const validateStep = useCallback((step: StepId): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case "personal":
        if (!profile.personal.fullName.trim()) {
          newErrors.fullName = "Full Name is required"
        }
        if (!profile.personal.email.trim()) {
          newErrors.email = "Email address is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.personal.email)) {
          newErrors.email = "Please enter a valid email address"
        }
        break
      case "career":
        if (!profile.career.targetRole) {
          newErrors.targetRole = "Target Role is required"
        }
        if (!profile.career.experienceLevel) {
          newErrors.experienceLevel = "Experience Level is required"
        }
        break
      default:
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [profile])

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStepIndex < STEPS.length - 1) {
        setCurrentStep(STEPS[currentStepIndex + 1].id)
      }
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1].id)
    }
  }

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB")
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        updateProfilePhoto(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSkipPhoto = () => {
    removeProfilePhoto()
    setCurrentStep("career")
  }

  const handleSkipSocial = () => {
    updateSocial({ github: "", linkedin: "", twitter: "", website: "" })
    setCurrentStep("review")
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    completeOnboarding()
    setIsSubmitting(false)
    router.push("/dashboard/settings")
  }

  return (
    <div className="min-h-screen bg-[#0a0d14] text-foreground flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center my-6">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">SkillDNA</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Create Your Account
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Complete your profile to personalize your AI career intelligence platform
          </p>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="mb-8 bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between relative">
            {/* Step Track */}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-muted/60 -z-0 hidden sm:block" />
            
            {STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex
              const isCurrent = index === currentStepIndex
              const StepIcon = step.icon

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (index < currentStepIndex) {
                        setCurrentStep(step.id)
                      }
                    }}
                    disabled={index > currentStepIndex}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl font-medium transition-all duration-300 border-2",
                      isCompleted && "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/30 cursor-pointer",
                      isCurrent && "bg-blue-600/20 border-blue-500 text-blue-400 ring-4 ring-blue-500/20",
                      !isCompleted && !isCurrent && "bg-muted/40 border-border/50 text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {isCompleted ? <Check className="h-5 w-5 stroke-[3]" /> : <StepIcon className="h-5 w-5" />}
                  </button>
                  <span className={cn(
                    "mt-2 text-xs font-semibold text-center transition-colors hidden sm:block max-w-[90px]",
                    isCurrent ? "text-white" : isCompleted ? "text-blue-300" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-blue-400">
              Step {currentStepIndex + 1} of {STEPS.length}: {STEPS[currentStepIndex].title}
            </span>
            <span>{STEPS[currentStepIndex].description}</span>
          </div>
        </div>

        {/* Step Card Content */}
        <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden rounded-2xl">
          <CardContent className="p-6 sm:p-8">
            {currentStep === "personal" && (
              <PersonalInfoStep 
                profile={profile.personal} 
                onChange={(data) => updatePersonal(data)} 
                errors={errors} 
              />
            )}

            {currentStep === "photo" && (
              <PhotoStep 
                photoUrl={profile.profilePhoto.url} 
                initials={userInitials}
                fileInputRef={fileInputRef}
                onPhotoSelect={handlePhotoSelect}
                onRemovePhoto={removeProfilePhoto}
                onSkip={handleSkipPhoto}
              />
            )}

            {currentStep === "career" && (
              <CareerStep 
                profile={profile.career} 
                onChange={(data) => updateCareer(data)} 
                errors={errors} 
              />
            )}

            {currentStep === "social" && (
              <SocialStep 
                profile={profile.social} 
                onChange={(data) => updateSocial(data)} 
                onSkip={handleSkipSocial}
              />
            )}

            {currentStep === "review" && (
              <ReviewStep profile={profile} initials={userInitials} />
            )}

            {/* Navigation Action Footer */}
            <div className="flex items-center justify-between pt-6 mt-8 border-t border-border/50">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                disabled={isFirstStep || isSubmitting}
                className={cn("gap-2", isFirstStep && "opacity-0 pointer-events-none")}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <div className="flex items-center gap-3">
                {currentStep === "photo" && (
                  <Button variant="ghost" onClick={handleSkipPhoto} disabled={isSubmitting} className="text-muted-foreground hover:text-white">
                    Skip for now
                  </Button>
                )}

                {currentStep === "social" && (
                  <Button variant="ghost" onClick={handleSkipSocial} disabled={isSubmitting} className="text-muted-foreground hover:text-white">
                    Skip for now
                  </Button>
                )}

                {isLastStep ? (
                  <Button 
                    variant="premium" 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="gap-2 px-6 py-2.5 text-sm font-semibold shadow-lg shadow-blue-600/25"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Completing Registration...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    variant="premium" 
                    onClick={handleNext} 
                    disabled={isSubmitting}
                    className="gap-2 px-6 py-2.5 text-sm font-semibold shadow-lg shadow-blue-600/25"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Need help? Contact support or learn more about{" "}
          <Link href="/" className="underline hover:text-white transition-colors">SkillDNA Privacy & Terms</Link>
        </p>
      </div>
    </div>
  )
}

/* STEP 1: Personal Information */
function PersonalInfoStep({ 
  profile, 
  onChange, 
  errors 
}: { 
  profile: any
  onChange: (data: any) => void
  errors: Record<string, string>
}) {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/40 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="h-5 w-5 text-blue-400" />
          Personal Information
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Please provide your contact details. Fields marked with * are required.
        </p>
      </div>

      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-200">
            Full Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="fullName"
            value={profile.fullName || ""}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="e.g. Satyam Kumar"
            className={cn("bg-background/50 border-border/60 focus:border-blue-500", errors.fullName && "border-red-500 focus:ring-red-500")}
          />
          {errors.fullName && (
            <p className="text-xs font-medium text-red-400">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-200">
            Email Address <span className="text-red-400">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={profile.email || ""}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="e.g. satyam@example.com"
            className={cn("bg-background/50 border-border/60 focus:border-blue-500", errors.email && "border-red-500 focus:ring-red-500")}
          />
          {errors.email && (
            <p className="text-xs font-medium text-red-400">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-sm font-medium text-gray-200">
            Bio
          </Label>
          <Textarea
            id="bio"
            value={profile.bio || ""}
            onChange={(e) => onChange({ bio: e.target.value })}
            placeholder="Tell us about your background, interests, and career goals..."
            rows={3}
            className="bg-background/50 border-border/60 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-200">
              Location
            </Label>
            <Input
              id="location"
              value={profile.location || ""}
              onChange={(e) => onChange({ location: e.target.value })}
              placeholder="e.g. Bangalore, India"
              className="bg-background/50 border-border/60 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone || ""}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
              className="bg-background/50 border-border/60 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* STEP 2: Profile Photo */
function PhotoStep({
  photoUrl,
  initials,
  fileInputRef,
  onPhotoSelect,
  onRemovePhoto,
  onSkip,
}: {
  photoUrl: string | null
  initials: string
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onPhotoSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemovePhoto: () => void
  onSkip: () => void
}) {
  return (
    <div className="space-y-6 text-center">
      <div className="border-b border-border/40 pb-4 text-left sm:text-center">
        <h2 className="text-xl font-bold text-white flex items-center justify-start sm:justify-center gap-2">
          <ImageIcon className="h-5 w-5 text-blue-400" />
          Profile Photo
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload a profile photo so mentors and collaborators can recognize you.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-4 space-y-6">
        <div className="relative group">
          <Avatar className="h-32 w-32 ring-4 ring-blue-500/20 shadow-2xl transition-all">
            {photoUrl ? (
              <AvatarImage src={photoUrl} alt="Profile preview" className="object-cover" />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-white font-bold text-3xl">
                {initials || "SK"}
              </AvatarFallback>
            )}
          </Avatar>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-2.5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-colors"
            title="Upload photo"
          >
            <Camera className="h-5 w-5" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onPhotoSelect}
          className="hidden"
        />

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2 bg-background/50 border-border/60 hover:bg-muted/50"
          >
            <Upload className="h-4 w-4 text-blue-400" />
            {photoUrl ? "Change Photo" : "Upload Photo"}
          </Button>

          {photoUrl && (
            <Button
              type="button"
              variant="ghost"
              onClick={onRemovePhoto}
              className="gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <X className="h-4 w-4" />
              Remove Photo
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground max-w-sm">
          If you choose to skip, your profile will display your initials (<span className="font-semibold text-white">{initials || "SK"}</span>). You can add or change your photo anytime in Profile Settings.
        </p>
      </div>
    </div>
  )
}

/* STEP 3: Career Preferences */
function CareerStep({
  profile,
  onChange,
  errors,
}: {
  profile: any
  onChange: (data: any) => void
  errors: Record<string, string>
}) {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/40 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-400" />
          Career Preferences
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us about your target role and goals to customize your career roadmap.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="targetRole" className="text-sm font-medium text-gray-200">
              Target Role <span className="text-red-400">*</span>
            </Label>
            <Select
              value={profile.targetRole || ""}
              onValueChange={(val) => onChange({ targetRole: val })}
            >
              <SelectTrigger 
                id="targetRole"
                className={cn("bg-background/50 border-border/60 focus:border-blue-500", errors.targetRole && "border-red-500")}
              >
                <SelectValue placeholder="Select target role" />
              </SelectTrigger>
              <SelectContent className="bg-[#121722] border-border/60">
                {TARGET_ROLES.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.targetRole && (
              <p className="text-xs font-medium text-red-400">{errors.targetRole}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceLevel" className="text-sm font-medium text-gray-200">
              Experience Level <span className="text-red-400">*</span>
            </Label>
            <Select
              value={profile.experienceLevel || ""}
              onValueChange={(val) => onChange({ experienceLevel: val })}
            >
              <SelectTrigger 
                id="experienceLevel"
                className={cn("bg-background/50 border-border/60 focus:border-blue-500", errors.experienceLevel && "border-red-500")}
              >
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent className="bg-[#121722] border-border/60">
                {EXPERIENCE_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.experienceLevel && (
              <p className="text-xs font-medium text-red-400">{errors.experienceLevel}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-200">
            Preferred Industries <span className="text-xs text-muted-foreground">(Select all that apply)</span>
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {INDUSTRIES.map((industry) => {
              const selected = (profile.preferredIndustries || []).includes(industry)
              return (
                <button
                  type="button"
                  key={industry}
                  onClick={() => {
                    const current = profile.preferredIndustries || []
                    const updated = selected
                      ? current.filter((i: string) => i !== industry)
                      : [...current, industry]
                    onChange({ preferredIndustries: updated })
                  }}
                  className={cn(
                    "flex items-center gap-2.5 p-3 rounded-xl border text-left text-sm font-medium transition-all",
                    selected
                      ? "bg-blue-600/15 border-blue-500 text-white shadow-sm"
                      : "bg-background/40 border-border/50 text-muted-foreground hover:bg-muted/40 hover:text-white"
                  )}
                >
                  <Checkbox checked={selected} className="pointer-events-none border-blue-400" />
                  <span>{industry}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-200">
            Work Preference <span className="text-xs text-muted-foreground">(Select all that apply)</span>
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {WORK_PREFERENCES.map((pref) => {
              const selected = (profile.workPreference || []).includes(pref)
              return (
                <button
                  type="button"
                  key={pref}
                  onClick={() => {
                    const current = profile.workPreference || []
                    const updated = selected
                      ? current.filter((p: string) => p !== pref)
                      : [...current, pref]
                    onChange({ workPreference: updated })
                  }}
                  className={cn(
                    "flex items-center gap-2.5 p-3 rounded-xl border text-left text-sm font-medium transition-all",
                    selected
                      ? "bg-purple-600/15 border-purple-500 text-white shadow-sm"
                      : "bg-background/40 border-border/50 text-muted-foreground hover:bg-muted/40 hover:text-white"
                  )}
                >
                  <Checkbox checked={selected} className="pointer-events-none border-purple-400" />
                  <span>{pref}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* STEP 4: Social Links */
function SocialStep({
  profile,
  onChange,
  onSkip,
}: {
  profile: any
  onChange: (data: any) => void
  onSkip: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/40 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Link2 className="h-5 w-5 text-blue-400" />
          Social Links
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add your professional profiles so others can see your work. This section is optional.
        </p>
      </div>

      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="github" className="text-sm font-medium text-gray-200">
            GitHub Profile URL
          </Label>
          <Input
            id="github"
            value={profile.github || ""}
            onChange={(e) => onChange({ github: e.target.value })}
            placeholder="e.g. https://github.com/satyamk"
            className="bg-background/50 border-border/60 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-sm font-medium text-gray-200">
            LinkedIn Profile URL
          </Label>
          <Input
            id="linkedin"
            value={profile.linkedin || ""}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="e.g. https://linkedin.com/in/satyam-kumar"
            className="bg-background/50 border-border/60 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter" className="text-sm font-medium text-gray-200">
            Twitter / X Profile URL
          </Label>
          <Input
            id="twitter"
            value={profile.twitter || ""}
            onChange={(e) => onChange({ twitter: e.target.value })}
            placeholder="e.g. https://x.com/satyamk"
            className="bg-background/50 border-border/60 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-sm font-medium text-gray-200">
            Personal Website / Portfolio URL
          </Label>
          <Input
            id="website"
            value={profile.website || ""}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="e.g. https://yourname.dev"
            className="bg-background/50 border-border/60 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

/* STEP 5: Review & Complete */
function ReviewStep({ profile, initials }: { profile: any; initials: string }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/40 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-400" />
          Review & Complete Registration
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review your information below. Once completed, your profile will be saved.
        </p>
      </div>

      <div className="grid gap-4">
        {/* Personal Info Summary */}
        <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              Personal Information
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs">Full Name</span>
              <span className="font-medium text-white">{profile.personal.fullName || "Not provided"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Email</span>
              <span className="font-medium text-white">{profile.personal.email || "Not provided"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Location</span>
              <span className="font-medium text-white">{profile.personal.location || "Not provided"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Phone</span>
              <span className="font-medium text-white">{profile.personal.phone || "Not provided"}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-muted-foreground block text-xs">Bio</span>
              <span className="font-medium text-white text-xs">{profile.personal.bio || "No bio provided"}</span>
            </div>
          </div>
        </div>

        {/* Profile Photo Summary */}
        <div className="p-4 rounded-xl bg-background/50 border border-border/50 flex items-center gap-4">
          <Avatar className="h-14 w-14 ring-2 ring-blue-500/20">
            {profile.profilePhoto.url ? (
              <AvatarImage src={profile.profilePhoto.url} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-blue-600 text-white font-bold text-lg">
                {initials || "SK"}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 block">Profile Photo</span>
            <p className="text-sm font-medium text-white">
              {profile.profilePhoto.url ? "Custom Photo Uploaded" : `Skipped (Using initials: "${initials || "SK"}")`}
            </p>
          </div>
        </div>

        {/* Career Preferences Summary */}
        <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              Career Preferences
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs">Target Role</span>
              <span className="font-medium text-white">{profile.career.targetRole || "Not provided"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Experience Level</span>
              <span className="font-medium text-white">{profile.career.experienceLevel || "Not provided"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Preferred Industries</span>
              <span className="font-medium text-white">
                {profile.career.preferredIndustries?.length > 0 ? profile.career.preferredIndustries.join(", ") : "None selected"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Work Preference</span>
              <span className="font-medium text-white">
                {profile.career.workPreference?.length > 0 ? profile.career.workPreference.join(", ") : "None selected"}
              </span>
            </div>
          </div>
        </div>

        {/* Social Links Summary */}
        <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5" />
              Social Links
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs">GitHub</span>
              <span className="font-medium text-white truncate block">{profile.social.github || "Not provided"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">LinkedIn</span>
              <span className="font-medium text-white truncate block">{profile.social.linkedin || "Not provided"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Twitter / X</span>
              <span className="font-medium text-white truncate block">{profile.social.twitter || "Not provided"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Website</span>
              <span className="font-medium text-white truncate block">{profile.social.website || "Not provided"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}