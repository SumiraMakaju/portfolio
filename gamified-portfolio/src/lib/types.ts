export type CharacterId = "shy-sweet" | "smart-cool" | "confident"

export type Expression = "default" | "smile" | "wink"

export interface CharacterConfig {
  id: CharacterId
  name: string
  subtitle: string
}

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  backgroundAlt: string
  surface: string
  surfaceAlt: string
  text: string
  textMuted: string
  glow: string
  gradientFrom: string
  gradientVia: string
  gradientTo: string
  particleColor1: string
  particleColor2: string
  particleColor3: string
}

export interface ProjectConfig {
  name: string
  repo: string
  description: string
  role: string
  tech: string[]
  image: string
  difficulty: number
}

export interface SiteConfig {
  name: string
  title: string
  location: string
  bio: string[]
  email: string
  github: string
  linkedin: string
  resumeUrl: string
  weatherLocation: string
  education: {
    institution: string
    degree: string
    period: string
  }
  experience: {
    title: string
    organization: string
    details: string[]
  }[]
  skills: {
    category: string
    items: string[]
  }[]
  projects: ProjectConfig[]
}
