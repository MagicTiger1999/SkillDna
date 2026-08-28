"use client"

import { useState, useRef } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Key, 
  Globe,
  Moon,
  Sun,
  Monitor,
  Mail,
  Phone,
  User as LinkedinIcon,
  GitBranch,
  MessageSquare as TwitterIcon,
  Save,
  Download,
  Loader2,
  Trash2,
  AlertTriangle,
  Building,
  Target,
  MapPin,
  Briefcase,
  Award,
  CheckCircle,
  Upload,
  Camera,
  Check
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserProfile, computeInitials } from "@/lib/user-profile-context"

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

export default function SettingsPage() {
  const { 
    profile, 
    updatePersonal, 
    updateProfilePhoto, 
    removeProfilePhoto, 
    updateCareer, 
    updateSocial 
  } = useUserProfile()

  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [showSavedToast, setShowSavedToast] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyDigest: true,
    skillUpdates: true,
    mentorMessages: true,
    jobAlerts: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "private",
    showProgress: true,
    showSkills: true,
    analytics: true,
  })

  const initials = computeInitials(profile.personal.fullName)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setIsSaving(false)
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 3000)
  }

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB")
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card/60 backdrop-blur-xl border border-border/50 p-6 rounded-2xl shadow-lg">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Profile Settings</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Manage your personal information, career preferences, and social links
            </p>
          </div>
          <div className="flex items-center gap-3">
            {showSavedToast && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg animate-in fade-in-0">
                <Check className="h-4 w-4" />
                Settings Saved!
              </span>
            )}
            <Button variant="premium" onClick={handleSave} disabled={isSaving} className="gap-2 shadow-md shadow-blue-600/20">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Settings Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card/60 border border-border/50 p-1 rounded-xl">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Privacy
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Account
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PROFILE (2-COLUMN LAYOUT MATCHING REFERENCE REQS) */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* LEFT COLUMN: Profile Photo Card & Social Links Card */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* 1. Profile Photo Card */}
                <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl rounded-2xl overflow-hidden">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                      <Camera className="h-5 w-5 text-blue-400" />
                      Profile Photo
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Your photo avatar visible across your profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-5">
                    <div className="flex items-center justify-center flex-col">
                      <Avatar className="h-28 w-28 ring-4 ring-blue-500/20 shadow-xl transition-all">
                        {profile.profilePhoto.url ? (
                          <AvatarImage src={profile.profilePhoto.url} alt="Profile" className="object-cover" />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-white font-bold text-3xl">
                            {initials || "SK"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <p className="text-xs text-muted-foreground mt-3">
                        {profile.profilePhoto.url ? "Custom image active" : `Using initials: "${initials || "SK"}"`}
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />

                    <div className="flex flex-col gap-2.5">
                      <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full gap-2 bg-background/50 border-border/60 hover:bg-muted/50 text-white"
                      >
                        <Upload className="h-4 w-4 text-blue-400" />
                        Change Photo
                      </Button>
                      
                      {profile.profilePhoto.url && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={removeProfilePhoto}
                          className="w-full gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove Photo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Social Links Card */}
                <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl rounded-2xl overflow-hidden">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-400" />
                      Social Links
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Connect your social & professional profiles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <SocialField 
                      label="LinkedIn" 
                      icon={LinkedinIcon} 
                      value={profile.social.linkedin || ""} 
                      onChange={(val) => updateSocial({ linkedin: val })} 
                      placeholder="https://linkedin.com/in/username"
                    />
                    <SocialField 
                      label="GitHub" 
                      icon={GitBranch} 
                      value={profile.social.github || ""} 
                      onChange={(val) => updateSocial({ github: val })} 
                      placeholder="https://github.com/username"
                    />
                    <SocialField 
                      label="Twitter / X" 
                      icon={TwitterIcon} 
                      value={profile.social.twitter || ""} 
                      onChange={(val) => updateSocial({ twitter: val })} 
                      placeholder="https://x.com/username"
                    />
                    <SocialField 
                      label="Website" 
                      icon={Globe} 
                      value={profile.social.website || ""} 
                      onChange={(val) => updateSocial({ website: val })} 
                      placeholder="https://yourwebsite.dev"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN: Personal Information Card & Career Preferences Card */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Personal Information Card */}
                <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl rounded-2xl overflow-hidden">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-400" />
                      Personal Information
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Update your contact details and public bio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="settings-fullName" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-blue-400" />
                          Full Name
                        </Label>
                        <Input 
                          id="settings-fullName"
                          value={profile.personal.fullName || ""} 
                          onChange={(e) => updatePersonal({ fullName: e.target.value })} 
                          placeholder="Full Name" 
                          className="bg-background/50 border-border/60 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="settings-email" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-blue-400" />
                          Email Address
                        </Label>
                        <Input 
                          id="settings-email"
                          type="email" 
                          value={profile.personal.email || ""} 
                          onChange={(e) => updatePersonal({ email: e.target.value })} 
                          placeholder="your@email.com" 
                          className="bg-background/50 border-border/60 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="settings-bio" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-blue-400" />
                        Bio
                      </Label>
                      <Textarea 
                        id="settings-bio"
                        value={profile.personal.bio || ""} 
                        onChange={(e) => updatePersonal({ bio: e.target.value })} 
                        placeholder="Tell us about yourself..." 
                        rows={3} 
                        className="bg-background/50 border-border/60 focus:border-blue-500 resize-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="settings-location" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-blue-400" />
                          Location
                        </Label>
                        <Input 
                          id="settings-location"
                          value={profile.personal.location || ""} 
                          onChange={(e) => updatePersonal({ location: e.target.value })} 
                          placeholder="City, Country" 
                          className="bg-background/50 border-border/60 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="settings-phone" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-blue-400" />
                          Phone Number
                        </Label>
                        <Input 
                          id="settings-phone"
                          type="tel"
                          value={profile.personal.phone || ""} 
                          onChange={(e) => updatePersonal({ phone: e.target.value })} 
                          placeholder="+91 98765 43210" 
                          className="bg-background/50 border-border/60 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Career Preferences Card */}
                <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl rounded-2xl overflow-hidden">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-emerald-400" />
                      Career Preferences
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Target role, experience level, and work environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
                          Target Role
                        </Label>
                        <Select 
                          value={profile.career.targetRole || ""} 
                          onValueChange={(val) => updateCareer({ targetRole: val })}
                        >
                          <SelectTrigger className="bg-background/50 border-border/60 focus:border-blue-500">
                            <SelectValue placeholder="Select Target Role" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#121722] border-border/60">
                            {TARGET_ROLES.map((role) => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-emerald-400" />
                          Experience Level
                        </Label>
                        <Select 
                          value={profile.career.experienceLevel || ""} 
                          onValueChange={(val) => updateCareer({ experienceLevel: val })}
                        >
                          <SelectTrigger className="bg-background/50 border-border/60 focus:border-blue-500">
                            <SelectValue placeholder="Select Experience Level" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#121722] border-border/60">
                            {EXPERIENCE_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-emerald-400" />
                        Preferred Industries
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {INDUSTRIES.map((ind) => {
                          const isSelected = (profile.career.preferredIndustries || []).includes(ind)
                          return (
                            <button
                              type="button"
                              key={ind}
                              onClick={() => {
                                const current = profile.career.preferredIndustries || []
                                const updated = isSelected 
                                  ? current.filter((i: string) => i !== ind)
                                  : [...current, ind]
                                updateCareer({ preferredIndustries: updated })
                              }}
                              className={cn(
                                "flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left",
                                isSelected
                                  ? "bg-emerald-500/15 border-emerald-500 text-white"
                                  : "bg-background/40 border-border/50 text-muted-foreground hover:bg-muted/40 hover:text-white"
                              )}
                            >
                              <Checkbox checked={isSelected} className="pointer-events-none border-emerald-500" />
                              <span>{ind}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-emerald-400" />
                        Work Preference
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {WORK_PREFERENCES.map((pref) => {
                          const isSelected = (profile.career.workPreference || []).includes(pref)
                          return (
                            <button
                              type="button"
                              key={pref}
                              onClick={() => {
                                const current = profile.career.workPreference || []
                                const updated = isSelected 
                                  ? current.filter((p: string) => p !== pref)
                                  : [...current, pref]
                                updateCareer({ workPreference: updated })
                              }}
                              className={cn(
                                "flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left",
                                isSelected
                                  ? "bg-purple-500/15 border-purple-500 text-white"
                                  : "bg-background/40 border-border/50 text-muted-foreground hover:bg-muted/40 hover:text-white"
                              )}
                            >
                              <Checkbox checked={isSelected} className="pointer-events-none border-purple-500" />
                              <span>{pref}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </TabsContent>

          {/* TAB 2: APPEARANCE */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Palette className="h-5 w-5 text-blue-400" />
                  Theme & Appearance
                </CardTitle>
                <CardDescription>Customize the look and layout of SkillDNA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-200 mb-3 block">Theme Preference</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { value: "light", label: "Light", icon: Sun, desc: "Light background interface" },
                      { value: "dark", label: "Dark", icon: Moon, desc: "Sleek dark mode (recommended)" },
                      { value: "system", label: "System", icon: Monitor, desc: "Sync with OS theme" },
                    ].map((t) => (
                      <Button
                        key={t.value}
                        variant={theme === t.value ? "premium" : "outline"}
                        className="flex flex-col items-start gap-2 h-auto p-4 bg-background/50 border-border/60 text-left"
                        onClick={() => setTheme(t.value as any)}
                      >
                        <t.icon className="h-5 w-5 text-blue-400" />
                        <span className="font-semibold">{t.label}</span>
                        <span className="text-xs text-muted-foreground">{t.desc}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: NOTIFICATIONS */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Bell className="h-5 w-5 text-blue-400" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Email Notifications</h4>
                  <NotificationToggle label="Weekly Progress Digest" description="Summary of your weekly learning progress" enabled={notifications.weeklyDigest} onChange={(v) => setNotifications({...notifications, weeklyDigest: v})} />
                  <NotificationToggle label="Skill Assessment Updates" description="When skill assessments are ready or updated" enabled={notifications.skillUpdates} onChange={(v) => setNotifications({...notifications, skillUpdates: v})} />
                  <NotificationToggle label="Mentor Messages" description="New responses from your AI mentor" enabled={notifications.mentorMessages} onChange={(v) => setNotifications({...notifications, mentorMessages: v})} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: PRIVACY */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5 text-blue-400" />
                  Privacy & Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Profile Visibility</h4>
                  <div className="space-y-3">
                    <PrivacyOption 
                      value="private" 
                      label="Private Profile" 
                      description="Only you can view your profile details and skill DNA"
                      selected={privacy.profileVisibility === "private"}
                      onSelect={() => setPrivacy({...privacy, profileVisibility: "private"})}
                    />
                    <PrivacyOption 
                      value="public" 
                      label="Public Profile" 
                      description="Anyone with the link can view your profile"
                      selected={privacy.profileVisibility === "public"}
                      onSelect={() => setPrivacy({...privacy, profileVisibility: "public"})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5: ACCOUNT */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Key className="h-5 w-5 text-blue-400" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Change Password</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-200">Current Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-background/50 border-border/60" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-200">New Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-background/50 border-border/60" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-200">Confirm Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-background/50 border-border/60" />
                    </div>
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

function SocialField({ label, icon: Icon, value, onChange, placeholder }: {
  label: string
  icon: any
  value: string
  onChange: (val: string) => void
  placeholder: string
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-2 text-xs font-medium text-gray-200">
        <Icon className="h-3.5 w-3.5 text-purple-400" />
        {label}
      </Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-background/50 border-border/60 focus:border-purple-500 text-xs"
      />
    </div>
  )
}

function NotificationToggle({ label, description, enabled, onChange }: any) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/50 border border-border/50">
      <div className="flex-1">
        <p className="font-medium text-sm text-white">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={enabled} onCheckedChange={onChange} />
    </div>
  )
}

function PrivacyOption({ label, description, selected, onSelect }: any) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left transition-all",
        selected
          ? "border-blue-500 bg-blue-500/10"
          : "border-border/50 hover:border-blue-500/40 bg-background/40"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-white text-sm">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {selected && <CheckCircle className="h-5 w-5 text-blue-400" />}
      </div>
    </button>
  )
}