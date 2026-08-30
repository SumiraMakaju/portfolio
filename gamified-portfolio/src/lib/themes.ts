import { CharacterId, ThemeColors } from "./types"

export const characterIds: CharacterId[] = ["shy-sweet", "smart-cool", "confident"]

export const characters = {
  "shy-sweet": {
    id: "shy-sweet",
    name: "Shy Sweet",
    subtitle: "The Gentle Creator",
  },
  "smart-cool": {
    id: "smart-cool",
    name: "Smart Cool",
    subtitle: "The Logical Architect",
  },
  "confident": {
    id: "confident",
    name: "Confident",
    subtitle: "The Bold Visionary",
  },
} as const

export const themes: Record<CharacterId, ThemeColors> = {
  "shy-sweet": {
    primary: "#f9d3e7",
    secondary: "#f5c9d0",
    accent: "#f43f5e",
    background: "#0f1016",
    backgroundAlt: "#1f1f2e",
    surface: "#1f1f2e",
    surfaceAlt: "#374151",
    text: "#ffffff",
    textMuted: "#d1d5db",
    glow: "rgba(244, 114, 182, 0.5)",
    gradientFrom: "#fdf2f8",
    gradientVia: "#fbcfe8",
    gradientTo: "#f9a8d4",
    particleColor1: "#f472b6",
    particleColor2: "#fb7185",
    particleColor3: "#fda4af",
  },
  "smart-cool": {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    accent: "#2563eb",
    background: "#0f1016",
    backgroundAlt: "#1e1b4b",
    surface: "#1e1b4b",
    surfaceAlt: "#312e81",
    text: "#ffffff",
    textMuted: "#94a3b8",
    glow: "rgba(59, 130, 246, 0.5)",
    gradientFrom: "#eff6ff",
    gradientVia: "#bfdbfe",
    gradientTo: "#93c5fd",
    particleColor1: "#3b82f6",
    particleColor2: "#60a5fa",
    particleColor3: "#818cf8",
  },
  "confident": {
    primary: "#ef4444",
    secondary: "#f59e0b",
    accent: "#dc2626",
    background: "#0f1016",
    backgroundAlt: "#450a0a",
    surface: "#450a0a",
    surfaceAlt: "#7f1d1d",
    text: "#ffffff",
    textMuted: "#fecdd3",
    glow: "rgba(239, 68, 68, 0.5)",
    gradientFrom: "#fef2f2",
    gradientVia: "#fecaca",
    gradientTo: "#fca5a5",
    particleColor1: "#ef4444",
    particleColor2: "#f87171",
    particleColor3: "#fbbf24",
  },
}