"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { CharacterId, ThemeColors } from "@/lib/types"
import { themes } from "@/lib/themes"
import { useKonamiCode } from "@/hooks/useKonamiCode"

interface ThemeContextType {
  character: CharacterId | null
  theme: ThemeColors | null
  setCharacter: (id: CharacterId) => void
}

const ThemeContext = createContext<ThemeContextType>({
  character: null,
  theme: null,
  setCharacter: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start with 'smart-cool' selected by default so the page is instantly colorful
  const [character, setCharacterState] = useState<CharacterId>("smart-cool")
  const [theme, setTheme] = useState<ThemeColors>(themes["smart-cool"])
  
  const isKonamiUnlocked = useKonamiCode()

  const setCharacter = useCallback((id: CharacterId) => {

    document.body.classList.add("glitch-active")
    setTimeout(() => {
      setCharacterState(id)
      localStorage.setItem("character", id)
      setTheme(themes[id])
      document.body.classList.remove("glitch-active")
    }, 200) // Delay change slightly to match glitch peak
  }, [])

  useEffect(() => {
    if (isKonamiUnlocked) {
      setCharacter("hidden")
    }
  }, [isKonamiUnlocked, setCharacter])

  useEffect(() => {
    if (!character) return
    const t = themes[character]
    const root = document.documentElement
    root.style.setProperty("--color-primary", t.primary)
    root.style.setProperty("--color-secondary", t.secondary)
    root.style.setProperty("--color-bg", t.background)
    root.style.setProperty("--color-text", t.text)
    root.style.setProperty("--color-text-muted", t.textMuted)
    root.style.setProperty("--color-surface", t.surface)
    root.style.setProperty("--color-glow", t.glow)
  }, [character])

  return (
    <ThemeContext.Provider value={{ character, theme, setCharacter }}>
      {children}
    </ThemeContext.Provider>
  )
}