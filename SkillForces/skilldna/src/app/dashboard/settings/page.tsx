"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
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
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  Building,
  Target,
  MapPin,
  Briefcase,
  Award,
  CheckCircle,
  Upload
} from "lucide-react"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
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
  const [profile, setProfile] = useState({
    name: "Satyam Kumar",
    email: "satyam@example.com",
    bio: "Aspiring AI Engineer passionate about ML and building intelligent systems.",
    location: "Bangalore, India",
    website: "https://satyam.dev",
    linkedin: "example.com",
    github: "example.com",
    twitter: "example.com",
  })

  useEffect(() => {
    const saved = localStorage.getItem("skilldna-profile")
    if (saved) {
      try {
        setProfile(JSON.parse(saved))
      } catch (e) {}
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    localStorage.setItem("skilldna-profile", JSON.stringify(profile))
    window.dispatchEvent(new Event("profile-updated"))
    setIsSaving(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account, preferences, and privacy</p>
          </div>
          <Button variant="premium" onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle>Profile Photo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center flex-col text-center">
                      <Avatar className="h-24 w-24 mb-3">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback className="text-2xl">SK</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                    </div>
                    <div className="flex flex-col gap-2 text-center">
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Photo
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <SocialInput label="LinkedIn" icon={LinkedinIcon} value={profile.linkedin} onChange={(v) => setProfile({...profile, linkedin: v})} placeholder="example.h" prefix="linkedin.com/in/" />
                    <SocialInput label="GitHub" icon={GitBranch} value={profile.github} onChange={(v) => setProfile({...profile, github: v})} placeholder="example.h" prefix="github.com/" />
                    <SocialInput label="Twitter/X" icon={TwitterIcon} value={profile.twitter} onChange={(v) => setProfile({...profile, twitter: v})} placeholder="example.h" prefix="x.com/" />
                    <SocialInput label="Website" icon={Globe} value={profile.website} onChange={(v) => setProfile({...profile, website: v})} placeholder="https://satyam.dev" prefix="" />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField label="Full Name" icon={User}>
                        <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} placeholder="Your name" />
                      </FormField>
                      <FormField label="Email" icon={Mail}>
                        <Input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} placeholder="your@email.com" disabled />
                      </FormField>
                    </div>
                    <FormField label="Bio" icon={User}>
                      <Textarea value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} placeholder="Tell us about yourself..." rows={3} />
                    </FormField>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField label="Location" icon={MapPin}>
                        <Input value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})} placeholder="City, Country" />
                      </FormField>
                      <FormField label="Phone" icon={Phone}>
                        <Input type="tel" placeholder="+91 98765 43210" />
                      </FormField>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Career Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField label="Target Role" icon={Briefcase}>
                        <Select value="ai-engineer" onValueChange={(v) => {}}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ai-engineer">AI Engineer</SelectItem>
                            <SelectItem value="ml-engineer">ML Engineer</SelectItem>
                            <SelectItem value="data-scientist">Data Scientist</SelectItem>
                            <SelectItem value="research-scientist">Research Scientist</SelectItem>
                            <SelectItem value="software-engineer">Software Engineer</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Experience Level" icon={Award}>
                        <Select value="mid" onValueChange={(v) => {}}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                            <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                            <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                            <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                    </div>
                    <FormField label="Preferred Industries" icon={Building}>
                      <div className="flex flex-wrap gap-2">
                        {["Technology", "Finance", "Healthcare", "E-commerce", "Automotive", "Research"].map((ind) => (
                          <Badge key={ind} variant="outline" className="gap">{ind}</Badge>
                        ))}
                      </div>
                    </FormField>
                    <FormField label="Work Preference" icon={Globe}>
                      <div className="flex flex-wrap gap-2">
                        {["Remote", "Hybrid", "On-site", "Relocation Open"].map((pref) => (
                          <Badge key={pref} variant="outline" className="gap">{pref}</Badge>
                        ))}
                      </div>
                    </FormField>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme & Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "light", label: "Light", icon: Sun, desc: "Always light mode" },
                      { value: "dark", label: "Dark", icon: Moon, desc: "Always dark mode" },
                      { value: "system", label: "System", icon: Monitor, desc: "Match system setting" },
                    ].map((t) => (
                      <Button
                        key={t.value}
                        variant={theme === t.value ? "premium" : "outline"}
                        className="flex flex-col items-start gap-2 h-auto p-4"
                        onClick={() => setTheme(t.value as any)}
                      >
                        <t.icon className="h-5 w-5" />
                        <span className="font-medium">{t.label}</span>
                        <span className="text-xs text-muted-foreground">{t.desc}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium mb-3 block">Accent Color</label>
                  <div className="flex flex-wrap gap-3">
                    {["#3b82f6", "#a855f7", "#ec4899", "#06b6d4", "#f97316", "#22c55e", "#ef4444", "#f59e0b"].map((color) => (
                      <button
                        key={color}
                        className={cn("h-10 w-10 rounded-lg border-2 transition-all", color === "#3b82f6" ? "border-primary" : "border-transparent")}
                        style={{ backgroundColor: color }}
                        onClick={() => {}}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Density</label>
                    <Select defaultValue="comfortable" onValueChange={() => {}}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Sidebar Default</label>
                    <Select defaultValue="expanded" onValueChange={() => {}}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expanded">Expanded</SelectItem>
                        <SelectItem value="collapsed">Collapsed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Email Notifications</h4>
                  <NotificationToggle label="Weekly Progress Digest" description="Summary of your weekly learning progress" enabled={notifications.weeklyDigest} onChange={(v) => setNotifications({...notifications, weeklyDigest: v})} />
                  <NotificationToggle label="Skill Assessment Updates" description="When skill assessments are ready or updated" enabled={notifications.skillUpdates} onChange={(v) => setNotifications({...notifications, skillUpdates: v})} />
                  <NotificationToggle label="Mentor Messages" description="New responses from your AI mentor" enabled={notifications.mentorMessages} onChange={(v) => setNotifications({...notifications, mentorMessages: v})} />
                  <NotificationToggle label="Job Alerts" description="New job matches for your profile" enabled={notifications.jobAlerts} onChange={(v) => setNotifications({...notifications, jobAlerts: v})} />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Push Notifications</h4>
                  <NotificationToggle label="Enable Push Notifications" description="Receive browser notifications" enabled={notifications.push} onChange={(v) => setNotifications({...notifications, push: v})} />
                  <NotificationToggle label="Daily Reminders" description="Daily learning reminders at 9 AM" enabled={false} onChange={() => {}} />
                  <NotificationToggle label="Milestone Achievements" description="Celebrate when you hit milestones" enabled={true} onChange={() => {}} />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Frequency</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Digest Frequency</label>
                      <Select defaultValue="weekly" onValueChange={() => {}}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Reminder Time</label>
                      <Select defaultValue="09:00" onValueChange={() => {}}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Profile Visibility</h4>
                  <div className="space-y-3">
                    <PrivacyOption 
                      value="public" 
                      label="Public" 
                      description="Anyone can view your profile and progress"
                      selected={privacy.profileVisibility === "public"}
                      onSelect={() => setPrivacy({...privacy, profileVisibility: "public"})}
                    />
                    <PrivacyOption 
                      value="connections" 
                      label="Connections Only" 
                      description="Only people you connect with can view your profile"
                      selected={privacy.profileVisibility === "connections"}
                      onSelect={() => setPrivacy({...privacy, profileVisibility: "connections"})}
                    />
                    <PrivacyOption 
                      value="private" 
                      label="Private" 
                      description="Only you can view your profile (recommended)"
                      selected={privacy.profileVisibility === "private"}
                      onSelect={() => setPrivacy({...privacy, profileVisibility: "private"})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Data Sharing</h4>
                  <PrivacyToggle label="Show Progress in Leaderboards" description="Include your progress in community rankings" enabled={privacy.showProgress} onChange={(v) => setPrivacy({...privacy, showProgress: v})} />
                  <PrivacyToggle label="Show Skills on Profile" description="Display your skill levels publicly" enabled={privacy.showSkills} onChange={(v) => setPrivacy({...privacy, showSkills: v})} />
                  <PrivacyToggle label="Analytics & Usage Data" description="Help improve the platform with anonymous usage data" enabled={privacy.analytics} onChange={(v) => setPrivacy({...privacy, analytics: v})} />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Data Management</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download My Data
                    </Button>
                    <Button variant="outline">
                      <Database className="mr-2 h-4 w-4" />
                      Export Progress Report
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Password</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField label="Current Password" icon={Key}>
                      <Input type="password" placeholder="••••••••" />
                    </FormField>
                    <FormField label="New Password" icon={Key}>
                      <Input type="password" placeholder="••••••••" />
                    </FormField>
                    <FormField label="Confirm Password" icon={Key}>
                      <Input type="password" placeholder="••••••••" />
                    </FormField>
                  </div>
                  <Button variant="outline">
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="premium">Enable 2FA</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Connected Accounts</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Google", icon: "G", connected: true, email: "satyam@gmail.com" },
                      { name: "GitHub", icon: "GH", connected: true, email: profile.github },
                      { name: "LinkedIn", icon: "in", connected: false, email: "" },
                    ].map((acc) => (
                      <div key={acc.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">{acc.icon}</div>
                          <div>
                            <p className="font-medium">{acc.name}</p>
                            {acc.connected && <p className="text-sm text-muted-foreground">{acc.email}</p>}
                          </div>
                        </div>
                        <Button variant={acc.connected ? "ghost" : "outline"} size="sm">
                          {acc.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="border-l-4 border-destructive/20 bg-destructive/5 p-4 rounded-r-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">Danger Zone</p>
                      <p className="text-sm text-muted-foreground">Irreversible actions</p>
                    </div>
                  </div>
                  <Button variant="destructive" className="mt-4">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Permanently Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function FormField({ label, icon: Icon, children }: { label: string; icon: React.ComponentType<any>; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </Label>
      {children}
    </div>
  )
}

interface SocialInputProps {
  label: string;
  icon?: React.ComponentType<any>;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
}

function SocialInput({ label, icon: Icon, value, onChange, placeholder, prefix }: SocialInputProps) {
  return (
    <div className="space-y-1">
      <Label className="flex items-center gap-2 text-sm">
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </Label>
      <div className="flex rounded-md shadow-sm w-full">
        {prefix && (
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-muted/80 text-muted-foreground text-sm select-none">
            {prefix}
          </span>
        )}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 min-w-0 w-0",
            prefix ? "rounded-l-none" : "rounded-md"
          )}
        />
      </div>
    </div>
  )
}

interface ToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}

function NotificationToggle({ label, description, enabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex-1">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={enabled} onCheckedChange={onChange} />
    </div>
  )
}

function PrivacyToggle({ label, description, enabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex-1">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={enabled} onCheckedChange={onChange} />
    </div>
  )
}

interface PrivacyOptionProps {
  value: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

function PrivacyOption({ value, label, description, selected, onSelect }: PrivacyOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-4 rounded-lg border-2 text-left transition-all",
        selected
          ? "border-primary bg-primary/5"
          : "border-border/50 hover:border-primary/30"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {selected && <CheckCircle className="h-5 w-5 text-primary" />}
      </div>
    </button>
  )
}

import { Textarea } from "@/components/ui/textarea"