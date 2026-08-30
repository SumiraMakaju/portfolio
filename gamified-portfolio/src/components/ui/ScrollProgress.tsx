"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"

const sections = [
  { id: "home", label: "Select Character" },
  { id: "about", label: "About" },
  { id: "quests", label: "Quests" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
]

export default function ScrollProgress() {
  const { theme } = useTheme()
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setProgress(window.scrollY / scrollHeight)
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveSection(sections[i].id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!theme) return null

  return (
    <motion.div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <div
        className="relative w-px h-32 rounded-full overflow-hidden"
        style={{ backgroundColor: `${theme.primary}20` }}
      >
        <div
          className="absolute top-0 left-0 w-full rounded-full transition-all duration-150"
          style={{
            backgroundColor: theme.primary,
            height: `${progress * 100}%`,
          }}
        />
      </div>

      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() =>
            document
              .getElementById(section.id)
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="group relative flex items-center"
        >
          <div
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                activeSection === section.id
                  ? theme.primary
                  : `${theme.primary}40`,
              transform:
                activeSection === section.id ? "scale(1.4)" : "scale(1)",
              boxShadow:
                activeSection === section.id
                  ? `0 0 8px ${theme.glow}`
                  : "none",
            }}
          />
          <span
            className="absolute right-8 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            style={{ color: theme.textMuted }}
          >
            {section.label}
          </span>
        </button>
      ))}
    </motion.div>
  )
}