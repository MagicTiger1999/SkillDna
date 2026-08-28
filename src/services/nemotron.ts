export interface AIResponse<T> {
  data: T
  confidence: number
  reasoning: string
}

export interface NemotronConfig {
  apiKey: string
  apiUrl: string
  model: string
}

export class NemotronService {
  private config: NemotronConfig

  constructor() {
    this.config = {
      apiKey: process.env.NEMOTRON_API_KEY || "",
      apiUrl: process.env.NEMOTRON_API_URL || "https://integrate.api.nvidia.com/v1",
      model: "nvidia/nemotron-3-ultra",
    }
  }

  private async makeRequest(
    prompt: string,
    options: {
      temperature?: number
      maxTokens?: number
      responseFormat?: "json" | "text"
    } = {}
  ): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error("Nemotron API key not configured")
    }

    const response = await fetch(`${this.config.apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: "system",
            content: "You are an expert AI assistant. Always respond with valid JSON when requested. Be precise, actionable, and specific."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: options.temperature ?? 0.5,
        max_tokens: options.maxTokens ?? 2000,
        response_format: options.responseFormat === "json" ? { type: "json_object" } : undefined,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Nemotron API error: ${response.status} - ${error}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || ""
  }

  async generateStructured<T>(
    prompt: string,
    options: {
      temperature?: number
      maxTokens?: number
    } = {}
  ): Promise<AIResponse<T>> {
    const jsonPrompt = `${prompt}

IMPORTANT: Return ONLY valid JSON. No markdown, no explanations, no extra text. The response must be parseable by JSON.parse().`

    try {
      const content = await this.makeRequest(jsonPrompt, {
        ...options,
        responseFormat: "json",
      })

      const parsed = JSON.parse(content)

      return {
        data: parsed,
        confidence: 0.9,
        reasoning: "Generated via Nemotron 3 Ultra with structured output",
      }
    } catch (error) {
      console.error("Nemotron structured generation error:", error)
      
      if (error instanceof SyntaxError) {
        throw new Error("Failed to parse AI response as JSON")
      }
      throw error
    }
  }

  async generateText(
    prompt: string,
    options: {
      temperature?: number
      maxTokens?: number
    } = {}
  ): Promise<string> {
    return this.makeRequest(prompt, {
      ...options,
      responseFormat: "text",
    })
  }

  isConfigured(): boolean {
    return !!this.config.apiKey
  }
}

export const nemotronService = new NemotronService()