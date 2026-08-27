export interface Skill {
  id: string
  name: string
  category: string
  description?: string
  icon?: string
  proficiency?: number
  level?: string
  evidence?: string
  source?: string
  industryDemand?: 'low' | 'medium' | 'high' | 'critical'
  importanceForCareer?: number
  gapStatus?: 'strong' | 'minor' | 'moderate' | 'major' | 'critical'
}

export interface UserSkill extends Skill {
  userId: string
  lastAssessed: Date
}

export interface Career {
  id: string
  name: string
  description?: string
  category: string
  demandLevel: string
  avgSalary?: string
  skills?: CareerSkill[]
}

export interface CareerSkill {
  id: string
  careerId: string
  skillId: string
  importance: number
  minLevel: number
  isRequired: boolean
  skill?: Skill
}

export interface SkillGap {
  id: string
  userId: string
  skillId: string
  careerId?: string
  currentLevel: number
  requiredLevel: number
  gapType: 'critical' | 'major' | 'moderate' | 'minor' | 'strong'
  priority: number
  reason?: string
  recommendedAction?: string
  estimatedEffort?: string
  skill?: Skill
  career?: Career
}

export interface SkillDNA {
  skills: Skill[]
  strongestSkill: Skill
  biggestGap: Skill
  prioritySkill: Skill
  industryReadinessScore: number
}

export interface Roadmap {
  id: string
  userId: string
  careerId: string
  title: string
  description?: string
  totalWeeks: number
  isActive: boolean
  items: RoadmapItem[]
  career?: Career
}

export interface RoadmapItem {
  id: string
  roadmapId: string
  weekNumber: number
  title: string
  description?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  reason?: string
  prerequisites: string[]
  status: 'pending' | 'in-progress' | 'completed' | 'skipped'
  completedAt?: Date
}

export interface Project {
  id: string
  userId: string
  name: string
  description?: string
  techStack: string[]
  githubUrl?: string
  projectUrl?: string
  readmeContent?: string
  analysisScore?: number
  analysisData?: ProjectAnalysis
}

export interface ProjectAnalysis {
  technicalQuality: number
  industryRelevance: number
  complexity: number
  skillDepth: number
  innovation: number
  portfolioValue: number
  missingComponents: string[]
  strengths: string[]
  weaknesses: string[]
  missingSkills: string[]
  improvements: string[]
  industryRelevanceDetails: string
  recommendedFeatures: string[]
}

export interface JobDescription {
  id: string
  userId: string
  title: string
  company?: string
  description: string
  requiredSkills: string[]
  preferredSkills: string[]
  responsibilities: string[]
  experienceLevel?: string
  location?: string
  salaryRange?: string
  analysisScore?: number
  analysisData?: JobAnalysis
}

export interface JobAnalysis {
  jobReadinessScore: number
  matchedSkills: string[]
  missingSkills: string[]
  moderateSkills: string[]
  strongSkills: string[]
  actionPlan: ActionItem[]
}

export interface ActionItem {
  skill: string
  priority: 'high' | 'medium' | 'low'
  reason: string
  estimatedEffort: string
  resources: string[]
}

export interface TechNews {
  id: string
  title: string
  summary: string
  category: string
  source: string
  sourceUrl?: string
  publishedAt: Date
  trendStatus: 'rising' | 'stable' | 'declining' | 'booming'
  importance: number
  tags: string[]
  aiAnalysis?: string
  whyThisMatters?: WhyThisMatters
}

export interface WhyThisMatters {
  userGap: { skill: string; proficiency: number }
  industryDemand: 'low' | 'medium' | 'high' | 'critical'
  recommendedAction: string
  roadmapConnection?: string
}

export interface TechTrend {
  id: string
  name: string
  category: string
  description?: string
  demandLevel: string
  growthRate?: number
  relatedSkills: string[]
}

export interface ProgressEntry {
  id: string
  userId: string
  skillId: string
  date: Date
  proficiency: number
  source: string
  note?: string
}

export interface Achievement {
  id: string
  userId: string
  title: string
  description?: string
  type: string
  metadata?: string
  earnedAt: Date
}

export interface AIResponse<T> {
  data: T
  confidence: number
  reasoning: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: Record<string, unknown>
}

export interface DemoUser {
  id: string
  name: string
  email: string
  targetCareer: string
  industryReadiness: number
  skills: Skill[]
  strongestSkill: string
  biggestGap: string
  prioritySkill: string
}