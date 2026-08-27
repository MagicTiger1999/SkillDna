import { AIResponse } from "./nemotron"
import type {
  SkillExtractionResult,
  SkillGapAnalysisResult,
  ProjectAnalysisResult,
  JobAnalysisResult,
  RoadmapGenerationResult,
  TechNewsAnalysisResult,
  MentorResponse,
} from "./ai"

export class MockAIService {
  async extractSkillsFromResume(resumeText: string): Promise<AIResponse<SkillExtractionResult>> {
    await this.delay(800)
    
    const skills = [
      { name: "Python", category: "Programming", proficiency: 85, evidence: "3+ years experience, built ML pipelines", source: "resume" },
      { name: "JavaScript", category: "Programming", proficiency: 78, evidence: "Full-stack web development projects", source: "resume" },
      { name: "React", category: "Web Development", proficiency: 72, evidence: "Built 3 production React applications", source: "resume" },
      { name: "Node.js", category: "Web Development", proficiency: 68, evidence: "Backend API development", source: "resume" },
      { name: "Data Structures & Algorithms", category: "Data Structures & Algorithms", proficiency: 61, evidence: "LeetCode 200+ problems solved", source: "resume" },
      { name: "Machine Learning", category: "Machine Learning", proficiency: 43, evidence: "Coursework and 2 ML projects", source: "resume" },
      { name: "Git/GitHub", category: "Git/GitHub", proficiency: 52, evidence: "Version control for all projects", source: "resume" },
      { name: "Communication", category: "Communication", proficiency: 89, evidence: "Technical blog writer, conference speaker", source: "resume" },
      { name: "Problem Solving", category: "Problem Solving", proficiency: 75, evidence: "Hackathon winner, competitive programming", source: "resume" },
    ]

    return {
      data: { skills },
      confidence: 0.92,
      reasoning: "Extracted from resume using pattern matching and keyword analysis",
    }
  }

  async analyzeSkillGaps(
    userSkills: Array<{ name: string; proficiency: number }>,
    careerRequirements: Array<{ skill: string; importance: number; minLevel: number }>
  ): Promise<AIResponse<SkillGapAnalysisResult>> {
    await this.delay(1000)

    const skillMap = new Map(userSkills.map(s => [s.name.toLowerCase(), s.proficiency]))
    
    const strongSkills: string[] = []
    const moderateSkills: string[] = []
    const missingSkills: string[] = []
    const criticalGaps = careerRequirements
      .filter(req => {
        const current = skillMap.get(req.skill.toLowerCase()) || 0
        return current < req.minLevel && req.importance >= 7
      })
      .map(req => {
        const current = skillMap.get(req.skill.toLowerCase()) || 0
        if (current >= req.minLevel) strongSkills.push(req.skill)
        else if (current >= req.minLevel * 0.6) moderateSkills.push(req.skill)
        else missingSkills.push(req.skill)
        
        return {
          skill: req.skill,
          reason: `Required for ${req.importance}/10 importance in target career`,
          industryRelevance: req.importance >= 8 ? "High - Core requirement for most roles" : "Medium - Important for specialized roles",
          currentLevel: current,
          recommendedAction: current === 0 
            ? `Start with fundamentals of ${req.skill} through structured course`
            : `Deepen ${req.skill} knowledge with hands-on projects`,
          estimatedEffort: current === 0 ? "6-8 weeks" : "3-4 weeks",
        }
      })

    return {
      data: {
        strongSkills,
        moderateSkills,
        missingSkills,
        criticalGaps,
        recommendedPriorities: criticalGaps.slice(0, 5).map(g => g.skill),
      },
      confidence: 0.88,
      reasoning: "Compared student skills against career requirements matrix",
    }
  }

  async analyzeProject(projectData: any): Promise<AIResponse<ProjectAnalysisResult>> {
    await this.delay(1200)

    const techStack = projectData.techStack || []
    const hasAuth = techStack.some((t: string) => ['auth', 'authentication', 'jwt', 'oauth', 'nextauth'].includes(t.toLowerCase()))
    const hasTesting = techStack.some((t: string) => ['test', 'jest', 'vitest', 'cypress', 'playwright'].includes(t.toLowerCase()))
    const hasCI = techStack.some((t: string) => ['ci', 'cd', 'github actions', 'gitlab ci', 'jenkins'].includes(t.toLowerCase()))
    const hasDeploy = techStack.some((t: string) => ['vercel', 'netlify', 'aws', 'docker', 'kubernetes', 'heroku'].includes(t.toLowerCase()))
    const hasDB = techStack.some((t: string) => ['postgres', 'mysql', 'mongodb', 'redis', 'prisma', 'sql'].includes(t.toLowerCase()))

    const missingComponents = []
    if (!hasAuth) missingComponents.push("Authentication & Authorization")
    if (!hasTesting) missingComponents.push("Automated Testing (unit/integration/e2e)")
    if (!hasCI) missingComponents.push("CI/CD Pipeline")
    if (!hasDeploy) missingComponents.push("Production Deployment")
    if (!hasDB) missingComponents.push("Database Integration")

    return {
      data: {
        technicalQuality: 72 + Math.floor(Math.random() * 15),
        industryRelevance: 68 + Math.floor(Math.random() * 20),
        complexity: 55 + Math.floor(Math.random() * 25),
        skillDepth: 60 + Math.floor(Math.random() * 20),
        innovation: 45 + Math.floor(Math.random() * 30),
        portfolioValue: 70 + Math.floor(Math.random() * 15),
        missingComponents,
        strengths: [
          "Clean code architecture",
          "Modern tech stack choices",
          "Good project structure",
          "Clear documentation",
        ],
        weaknesses: [
          missingComponents.length > 0 ? "Missing production-ready components" : "Limited scalability considerations",
          "No performance monitoring",
          "Limited error handling",
        ],
        missingSkills: ["DevOps", "Testing", "System Design", "Security"],
        improvements: [
          "Add user authentication with JWT/OAuth",
          "Implement comprehensive test suite",
          "Set up CI/CD with GitHub Actions",
          "Deploy to production with monitoring",
          "Add database with proper migrations",
        ],
        industryRelevanceDetails: "Project demonstrates solid fundamentals but lacks production-readiness signals that employers prioritize.",
        recommendedFeatures: [
          "Authentication system with role-based access",
          "Automated testing pipeline",
          "Production deployment with monitoring",
          "API documentation with OpenAPI/Swagger",
        ],
      },
      confidence: 0.85,
      reasoning: "Analyzed project structure, tech stack, and completeness against industry standards",
    }
  }

  async analyzeJobDescription(
    jobDescription: string,
    userSkills: Array<{ name: string; proficiency: number }>
  ): Promise<AIResponse<JobAnalysisResult>> {
    await this.delay(1000)

    const skillMap = new Map(userSkills.map(s => [s.name.toLowerCase(), s.proficiency]))
    
    const requiredSkills = this.extractSkillsFromJD(jobDescription)
    
    const matchedSkills: string[] = []
    const missingSkills: string[] = []
    const moderateSkills: string[] = []
    const strongSkills: string[] = []

    requiredSkills.forEach(skill => {
      const current = skillMap.get(skill.toLowerCase()) || 0
      if (current >= 70) strongSkills.push(skill)
      else if (current >= 50) moderateSkills.push(skill)
      else if (current > 0) matchedSkills.push(skill)
      else missingSkills.push(skill)
    })

    const readinessScore = Math.round(
      (strongSkills.length * 1.0 + moderateSkills.length * 0.6 + matchedSkills.length * 0.3) / 
      Math.max(requiredSkills.length, 1) * 100
    )

    return {
      data: {
        jobReadinessScore: Math.min(readinessScore, 95),
        matchedSkills,
        missingSkills,
        moderateSkills,
        strongSkills,
        actionPlan: missingSkills.slice(0, 5).map(skill => ({
          skill,
          priority: "high" as const,
          reason: `Required in job description but missing from profile`,
          estimatedEffort: "4-6 weeks",
          resources: [`${skill} fundamentals course`, `${skill} hands-on project`, `${skill} certification`],
        })),
      },
      confidence: 0.87,
      reasoning: "Matched job requirements against student skill profile using semantic analysis",
    }
  }

  async generateRoadmap(
    skillGaps: Array<{ skill: string; currentLevel: number; requiredLevel: number; priority: number; reason: string }>,
    targetCareer: string,
    existingSkills: string[]
  ): Promise<AIResponse<RoadmapGenerationResult>> {
    await this.delay(1500)

    const weeks = Math.min(skillGaps.length * 2, 16)
    const items = skillGaps.slice(0, 8).map((gap, index) => ({
      weekNumber: index + 1,
      title: `${gap.skill} Fundamentals`,
      description: `Learn core concepts of ${gap.skill} with hands-on practice. ${gap.reason}`,
      difficulty: gap.currentLevel === 0 ? "beginner" as const : "intermediate" as const,
      estimatedHours: gap.currentLevel === 0 ? 15 : 10,
      reason: gap.reason,
      prerequisites: existingSkills.filter(s => 
        s.toLowerCase().includes(gap.skill.toLowerCase().split(' ')[0])
      ).slice(0, 2),
    }))

    return {
      data: {
        title: `${targetCareer} Personalized Roadmap`,
        description: `Adaptive ${weeks}-week roadmap focusing on your critical skill gaps while leveraging your existing strengths.`,
        totalWeeks: weeks,
        items,
      },
      confidence: 0.9,
      reasoning: "Generated adaptive roadmap based on skill gap analysis and career requirements",
    }
  }

  async analyzeTechNews(newsItem: any, userProfile: any): Promise<AIResponse<TechNewsAnalysisResult>> {
    await this.delay(600)

    const categories = ["AI", "Development", "Career", "Learning", "Industry", "Trending"]
    const trendStatuses = ["rising", "stable", "declining", "booming"] as const

    const relevantGap = userProfile.skillGaps[0] || "Machine Learning"
    const gapSkill = userProfile.skills.find((s: any) => s.name.toLowerCase() === relevantGap.toLowerCase())
    const proficiency = gapSkill?.proficiency || 20

    return {
      data: {
        summary: `${newsItem.title} represents a significant shift in the industry that directly impacts ${userProfile.targetCareer} roles.`,
        category: categories[Math.floor(Math.random() * categories.length)],
        trendStatus: trendStatuses[Math.floor(Math.random() * trendStatuses.length)],
        importance: 4 + Math.floor(Math.random() * 2),
        tags: [userProfile.targetCareer, relevantGap, "emerging-tech"],
        aiAnalysis: `This development signals growing demand for ${relevantGap} expertise. Companies are actively seeking candidates with practical experience in this area.`,
        whyThisMatters: {
          userGap: { skill: relevantGap, proficiency },
          industryDemand: "high" as const,
          recommendedAction: `Start learning ${relevantGap} fundamentals this week`,
          roadmapConnection: `This aligns with your roadmap's priority on ${relevantGap}`,
        },
      },
      confidence: 0.82,
      reasoning: "Analyzed news relevance to student's career target and skill gaps",
    }
  }

  async generateMentorResponse(
    question: string,
    userContext: any
  ): Promise<AIResponse<MentorResponse>> {
    await this.delay(800)

    const lowerQuestion = question.toLowerCase()
    
    let response = ""
    const references: any[] = []
    const suggestedActions: string[] = []

    if (lowerQuestion.includes("rag") || lowerQuestion.includes("fine-tuning")) {
      response = `Given your current skill gaps in Machine Learning (43%) and your target as an AI Engineer, I'd recommend learning RAG first. Your profile shows you have Python (85%) and APIs (implied from web dev), which are prerequisites for RAG. Fine-tuning requires deeper ML expertise and GPU resources that are better tackled after mastering RAG.`
      references.push({ type: "skill", value: "Machine Learning (43%)" })
      references.push({ type: "gap", value: "RAG/Tool Integration" })
      suggestedActions.push("Complete RAG fundamentals course")
      suggestedActions.push("Build a RAG-based chatbot project")
    } else if (lowerQuestion.includes("project") || lowerQuestion.includes("build")) {
      response = `Based on your Skill DNA, your strongest assets are Programming (82%) and Communication (89%). For maximum portfolio impact, build a full-stack AI application that demonstrates: 1) Your programming strength, 2) Addresses your ML gap, 3) Shows production readiness. An AI-powered code review tool or document analysis platform would hit all three.`
      references.push({ type: "skill", value: "Programming (82%)" })
      references.push({ type: "skill", value: "Communication (89%)" })
      references.push({ type: "gap", value: "Machine Learning (43%)" })
      suggestedActions.push("Design AI-powered full-stack project")
      suggestedActions.push("Include authentication, testing, deployment")
    } else if (lowerQuestion.includes("interview") || lowerQuestion.includes("next week")) {
      response = `With an interview next week, focus on your Biggest Gap: Machine Learning (43%) and Priority Skill: DSA (61%). Review ML fundamentals (supervised/unsupervised, evaluation metrics) and practice 2-3 medium DSA problems daily. Your Communication (89%) is a strength - prepare clear STAR stories for behavioral questions.`
      references.push({ type: "gap", value: "Machine Learning (43%) - Biggest Gap" })
      references.push({ type: "gap", value: "DSA (61%) - Priority Skill" })
      references.push({ type: "skill", value: "Communication (89%) - Strongest" })
      suggestedActions.push("Review ML fundamentals cheat sheet")
      suggestedActions.push("Solve 2-3 DSA problems daily")
      suggestedActions.push("Prepare 3 STAR behavioral stories")
    } else if (lowerQuestion.includes("skill") || lowerQuestion.includes("learn") || lowerQuestion.includes("month")) {
      response = `Your roadmap shows Week 1-2 focused on Python/NumPy revision and Statistics. Since you already have Python at 85%, you can accelerate. This month, prioritize: 1) DSA (61% → 75%) - your Priority Skill, 2) ML fundamentals (43% → 60%) - your Biggest Gap. Complete the roadmap's Week 3-4 (Linear Regression, Classification) as your monthly milestone.`
      references.push({ type: "roadmap", value: "Week 1-2: Python/Statistics" })
      references.push({ type: "roadmap", value: "Week 3-4: ML Fundamentals" })
      references.push({ type: "gap", value: "DSA (61%) - Priority Skill" })
      suggestedActions.push("Accelerate through Python revision")
      suggestedActions.push("Focus on DSA patterns")
      suggestedActions.push("Complete ML mini-project by month-end")
    } else {
      response = `I understand you're asking about "${question}". Based on your profile targeting ${userContext.targetCareer}, your current Industry Readiness is 67%. Your Strongest Skill is Programming (82%), Biggest Gap is Machine Learning (43%), and Priority Skill is DSA (61%). Could you clarify what specific aspect you'd like guidance on?`
      references.push({ type: "career", value: userContext.targetCareer })
      references.push({ type: "skill", value: "Programming (82%)" })
      references.push({ type: "gap", value: "Machine Learning (43%)" })
      suggestedActions.push("Review your Skill DNA dashboard")
      suggestedActions.push("Check your personalized roadmap")
    }

    return {
      data: { response, references, suggestedActions },
      confidence: 0.85,
      reasoning: "Generated personalized response using student's actual Skill DNA and career context",
    }
  }

  async analyzeWhatIf(scenario: string, userContext: any): Promise<AIResponse<any>> {
    await this.delay(1000)

    const lowerScenario = scenario.toLowerCase()
    let projectedImprovement = 0
    const affectedGaps: string[] = []
    let explanation = ""

    if (lowerScenario.includes("ai agent") || lowerScenario.includes("agent")) {
      projectedImprovement = 18
      affectedGaps.push("Machine Learning", "RAG", "Tool Integration", "LLM Fundamentals")
      explanation = "Building an AI Agent project would significantly improve your ML proficiency (43% → ~65%), demonstrate RAG and tool calling skills, and create a flagship portfolio piece. This directly addresses your Biggest Gap and aligns with the booming AI Agents trend."
    } else if (lowerScenario.includes("full stack") || lowerScenario.includes("web app")) {
      projectedImprovement = 12
      affectedGaps.push("Web Development", "Git/GitHub", "Cloud")
      explanation = "A full-stack project would strengthen your Web Development (72% → 85%), Git practices (52% → 70%), and add Cloud deployment experience. Good for Software Engineer roles but less impact for AI Engineer target."
    } else if (lowerScenario.includes("dsa") || lowerScenario.includes("algorithm")) {
      projectedImprovement = 10
      affectedGaps.push("Data Structures & Algorithms", "Problem Solving")
      explanation = "Focused DSA practice would improve your Priority Skill (61% → 80%) and Problem Solving. High ROI for interviews but doesn't address your AI Engineer skill gaps."
    } else {
      projectedImprovement = 8
      affectedGaps.push("General skill development")
      explanation = "This project would provide general skill development but may not be optimally targeted for your AI Engineer career goal."
    }

    return {
      data: {
        projectedImprovement,
        affectedGaps,
        newReadinessScore: Math.min(67 + projectedImprovement, 95),
        explanation,
        recommendedProjectScope: "AI Agent with RAG, tool calling, and production deployment",
      },
      confidence: 0.83,
      reasoning: "Simulated skill development impact based on project scope and current gaps",
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private extractSkillsFromJD(jobDescription: string): string[] {
    const commonSkills = [
      "Python", "JavaScript", "TypeScript", "React", "Node.js", "SQL", "PostgreSQL",
      "MongoDB", "AWS", "Docker", "Kubernetes", "Git", "REST API", "GraphQL",
      "Machine Learning", "Data Structures", "Algorithms", "System Design",
      "CI/CD", "Testing", "Agile", "Scrum", "Communication", "Problem Solving"
    ]
    
    const foundSkills: string[] = []
    const lowerJD = jobDescription.toLowerCase()
    
    commonSkills.forEach(skill => {
      if (lowerJD.includes(skill.toLowerCase())) {
        foundSkills.push(skill)
      }
    })
    
    return foundSkills.length > 0 ? foundSkills : ["Python", "JavaScript", "Git", "Problem Solving"]
  }
}

export const mockAIService = new MockAIService()