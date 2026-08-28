import { NemotronService, AIResponse } from "./nemotron"

export interface SkillExtractionResult {
  skills: Array<{
    name: string
    category: string
    proficiency: number
    evidence: string
    source: string
  }>
}

export interface SkillGapAnalysisResult {
  strongSkills: string[]
  moderateSkills: string[]
  missingSkills: string[]
  criticalGaps: Array<{
    skill: string
    reason: string
    industryRelevance: string
    currentLevel: number
    recommendedAction: string
    estimatedEffort: string
  }>
  recommendedPriorities: string[]
}

export interface ProjectAnalysisResult {
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

export interface JobAnalysisResult {
  jobReadinessScore: number
  matchedSkills: string[]
  missingSkills: string[]
  moderateSkills: string[]
  strongSkills: string[]
  actionPlan: Array<{
    skill: string
    priority: "high" | "medium" | "low"
    reason: string
    estimatedEffort: string
    resources: string[]
  }>
}

export interface RoadmapGenerationResult {
  title: string
  description: string
  totalWeeks: number
  items: Array<{
    weekNumber: number
    title: string
    description: string
    difficulty: "beginner" | "intermediate" | "advanced"
    estimatedHours: number
    reason: string
    prerequisites: string[]
  }>
}

export interface TechNewsAnalysisResult {
  summary: string
  category: string
  trendStatus: "rising" | "stable" | "declining" | "booming"
  importance: number
  tags: string[]
  aiAnalysis: string
  whyThisMatters?: {
    userGap: { skill: string; proficiency: number }
    industryDemand: "low" | "medium" | "high" | "critical"
    recommendedAction: string
    roadmapConnection: string
  }
}

export interface MentorResponse {
  response: string
  references: Array<{
    type: "skill" | "gap" | "roadmap" | "project" | "career"
    value: string
  }>
  suggestedActions: string[]
}

class AIService {
  private nemotron: NemotronService

  constructor() {
    this.nemotron = new NemotronService()
  }

  async extractSkillsFromResume(resumeText: string): Promise<AIResponse<SkillExtractionResult>> {
    const prompt = `
You are an expert career analyst. Extract skills from the following resume text and return structured JSON.

Resume:
${resumeText}

Return JSON in this exact format:
{
  "skills": [
    {
      "name": "skill name",
      "category": "category",
      "proficiency": 0-100,
      "evidence": "specific evidence from resume",
      "source": "resume"
    }
  ]
}

Categories: Programming, Data Structures & Algorithms, Machine Learning, Web Development, Git/GitHub, Cloud, Communication, Problem Solving
Only include skills that have clear evidence in the resume.
`

    return this.nemotron.generateStructured<SkillExtractionResult>(prompt, {
      temperature: 0.3,
      maxTokens: 2000,
    })
  }

  async analyzeSkillGaps(
    userSkills: Array<{ name: string; proficiency: number }>,
    careerRequirements: Array<{ skill: string; importance: number; minLevel: number }>
  ): Promise<AIResponse<SkillGapAnalysisResult>> {
    const prompt = `
You are an AI career advisor. Analyze the skill gaps between a student's current skills and their target career requirements.

Student Skills:
${userSkills.map(s => `- ${s.name}: ${s.proficiency}%`).join('\n')}

Career Requirements:
${careerRequirements.map(r => `- ${r.skill}: importance ${r.importance}/10, min level ${r.minLevel}%`).join('\n')}

Return JSON in this exact format:
{
  "strongSkills": ["skill names where student meets or exceeds requirements"],
  "moderateSkills": ["skill names where student is close but below requirements"],
  "missingSkills": ["skill names where student has little to no proficiency"],
  "criticalGaps": [
    {
      "skill": "skill name",
      "reason": "why this skill is critical for the career",
      "industryRelevance": "high/medium/low with explanation",
      "currentLevel": 0-100,
      "recommendedAction": "specific actionable step",
      "estimatedEffort": "time estimate (e.g., '4-6 weeks')"
    }
  ],
  "recommendedPriorities": ["top 3-5 skills to focus on in order"]
}

Be specific and actionable. Consider industry demand and career relevance.
`

    return this.nemotron.generateStructured<SkillGapAnalysisResult>(prompt, {
      temperature: 0.4,
      maxTokens: 3000,
    })
  }

  async analyzeProject(projectData: {
    name: string
    description: string
    techStack: string[]
    githubUrl?: string
    readmeContent?: string
  }): Promise<AIResponse<ProjectAnalysisResult>> {
    const prompt = `
You are an expert technical recruiter and engineer. Analyze this project for a student's portfolio.

Project: ${projectData.name}
Description: ${projectData.description}
Tech Stack: ${projectData.techStack.join(', ')}
GitHub: ${projectData.githubUrl || 'Not provided'}
README: ${projectData.readmeContent || 'Not provided'}

Return JSON in this exact format:
{
  "technicalQuality": 0-100,
  "industryRelevance": 0-100,
  "complexity": 0-100,
  "skillDepth": 0-100,
  "innovation": 0-100,
  "portfolioValue": 0-100,
  "missingComponents": ["specific missing pieces like 'authentication', 'testing', 'CI/CD', 'deployment'"],
  "strengths": ["specific strengths"],
  "weaknesses": ["specific weaknesses"],
  "missingSkills": ["skills demonstrated as weak or missing"],
  "improvements": ["specific actionable improvements"],
  "industryRelevanceDetails": "detailed explanation of industry relevance",
  "recommendedFeatures": ["specific features to add with reasoning"]
}

Be specific and actionable. Don't give vague feedback.
`

    return this.nemotron.generateStructured<ProjectAnalysisResult>(prompt, {
      temperature: 0.4,
      maxTokens: 3000,
    })
  }

  async analyzeJobDescription(
    jobDescription: string,
    userSkills: Array<{ name: string; proficiency: number }>
  ): Promise<AIResponse<JobAnalysisResult>> {
    const prompt = `
You are an AI career advisor. Analyze this job description against the student's skills.

Job Description:
${jobDescription}

Student Skills:
${userSkills.map(s => `- ${s.name}: ${s.proficiency}%`).join('\n')}

Return JSON in this exact format:
{
  "jobReadinessScore": 0-100,
  "matchedSkills": ["skills that match job requirements well"],
  "missingSkills": ["required skills the student lacks"],
  "moderateSkills": ["skills where student has some proficiency but needs improvement"],
  "strongSkills": ["skills where student exceeds requirements"],
  "actionPlan": [
    {
      "skill": "skill name",
      "priority": "high|medium|low",
      "reason": "why this matters for this specific job",
      "estimatedEffort": "time estimate",
      "resources": ["specific learning resources"]
    }
  ]
}

Focus on actionable insights for this specific job application.
`

    return this.nemotron.generateStructured<JobAnalysisResult>(prompt, {
      temperature: 0.4,
      maxTokens: 3000,
    })
  }

  async generateRoadmap(
    skillGaps: Array<{ skill: string; currentLevel: number; requiredLevel: number; priority: number; reason: string }>,
    targetCareer: string,
    existingSkills: string[]
  ): Promise<AIResponse<RoadmapGenerationResult>> {
    const prompt = `
You are an AI career coach. Create a personalized learning roadmap for a student targeting ${targetCareer}.

Skill Gaps (priority ordered):
${skillGaps.map(g => `- ${g.skill}: current ${g.currentLevel}%, required ${g.requiredLevel}%, priority ${g.priority}, reason: ${g.reason}`).join('\n')}

Existing Strong Skills (don't repeat these): ${existingSkills.join(', ')}

Return JSON in this exact format:
{
  "title": "${targetCareer} Roadmap",
  "description": "Personalized roadmap description",
  "totalWeeks": number,
  "items": [
    {
      "weekNumber": 1,
      "title": "Week title",
      "description": "Detailed description",
      "difficulty": "beginner|intermediate|advanced",
      "estimatedHours": number,
      "reason": "why this week matters",
      "prerequisites": ["prerequisite skills"]
    }
  ]
}

Create a progressive roadmap that builds on existing skills. Skip beginner content for skills the student already knows. Make it adaptive and practical.
`

    return this.nemotron.generateStructured<RoadmapGenerationResult>(prompt, {
      temperature: 0.5,
      maxTokens: 4000,
    })
  }

  async analyzeTechNews(newsItem: {
    title: string
    content: string
    source: string
  }, userProfile: {
    targetCareer: string
    skills: Array<{ name: string; proficiency: number }>
    skillGaps: string[]
  }): Promise<AIResponse<TechNewsAnalysisResult>> {
    const prompt = `
You are an AI tech intelligence analyst. Analyze this tech news for a student targeting ${userProfile.targetCareer}.

News: ${newsItem.title}
Content: ${newsItem.content}
Source: ${newsItem.source}

Student Profile:
- Target Career: ${userProfile.targetCareer}
- Skills: ${userProfile.skills.map(s => `${s.name} (${s.proficiency}%)`).join(', ')}
- Known Gaps: ${userProfile.skillGaps.join(', ')}

Return JSON in this exact format:
{
  "summary": "2-3 sentence summary",
  "category": "AI|Development|Career|Learning|Industry|Trending",
  "trendStatus": "rising|stable|declining|booming",
  "importance": 1-5,
  "tags": ["relevant", "tags"],
  "aiAnalysis": "detailed analysis of why this matters for the industry",
  "whyThisMatters": {
    "userGap": { "skill": "most relevant missing skill", "proficiency": current_level },
    "industryDemand": "low|medium|high|critical",
    "recommendedAction": "specific action student should take",
    "roadmapConnection": "how this connects to their learning roadmap"
  }
}

Make the "whyThisMatters" highly personalized to this specific student.
`

    return this.nemotron.generateStructured<TechNewsAnalysisResult>(prompt, {
      temperature: 0.5,
      maxTokens: 2500,
    })
  }

  async generateMentorResponse(
    question: string,
    userContext: {
      targetCareer: string
      skills: Array<{ name: string; proficiency: number }>
      skillGaps: Array<{ skill: string; gapType: string; priority: number }>
      roadmap: Array<{ week: number; title: string; status: string }>
      projects: Array<{ name: string; techStack: string[] }>
    }
  ): Promise<AIResponse<MentorResponse>> {
    const prompt = `
You are an AI career mentor for a student targeting ${userContext.targetCareer}. Answer their question using their actual profile data.

Student Question: "${question}"

Student Context:
- Target Career: ${userContext.targetCareer}
- Top Skills: ${userContext.skills.slice(0, 5).map(s => `${s.name} (${s.proficiency}%)`).join(', ')}
- Critical Gaps: ${userContext.skillGaps.filter(g => g.gapType === 'critical' || g.gapType === 'major').map(g => `${g.skill} (${g.gapType})`).join(', ')}
- Current Roadmap: ${userContext.roadmap.slice(0, 3).map(r => `Week ${r.week}: ${r.title} (${r.status})`).join(', ')}
- Projects: ${userContext.projects.map(p => `${p.name} [${p.techStack.join(', ')}]`).join(', ')}

Return JSON in this exact format:
{
  "response": "personalized response referencing their actual profile",
  "references": [
    { "type": "skill|gap|roadmap|project|career", "value": "specific reference" }
  ],
  "suggestedActions": ["specific actionable next steps"]
}

Reference their actual skills, gaps, and roadmap. Don't give generic advice.
`

    return this.nemotron.generateStructured<MentorResponse>(prompt, {
      temperature: 0.6,
      maxTokens: 2500,
    })
  }

  async analyzeWhatIf(
    scenario: string,
    userContext: {
      targetCareer: string
      skills: Array<{ name: string; proficiency: number }>
      skillGaps: Array<{ skill: string; currentLevel: number; requiredLevel: number }>
    }
  ): Promise<AIResponse<{
    projectedImprovement: number
    affectedGaps: string[]
    newReadinessScore: number
    explanation: string
    recommendedProjectScope: string
  }>> {
    const prompt = `
You are an AI career simulator. Analyze a "what-if" scenario for a student.

Scenario: "${scenario}"

Student Context:
- Target Career: ${userContext.targetCareer}
- Current Skills: ${userContext.skills.map(s => `${s.name} (${s.proficiency}%)`).join(', ')}
- Skill Gaps: ${userContext.skillGaps.map(g => `${g.skill}: ${g.currentLevel}% → ${g.requiredLevel}%`).join(', ')}

Return JSON in this exact format:
{
  "projectedImprovement": 0-100,
  "affectedGaps": ["skill names that would improve"],
  "newReadinessScore": 0-100,
  "explanation": "detailed explanation of impact",
  "recommendedProjectScope": "specific project scope to maximize learning"
}

Be realistic and specific about skill development from projects.
`

    return this.nemotron.generateStructured(prompt, {
      temperature: 0.5,
      maxTokens: 2000,
    })
  }
}

export const aiService = new AIService()