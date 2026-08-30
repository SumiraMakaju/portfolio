"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"
import { Expression } from "@/lib/types"

export default function CharacterCompanion() {
  const { character, theme } = useTheme()
  const [expression, setExpression] = useState<Expression>("default")

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const percent = window.scrollY / scrollHeight
      if (percent < 0.3) setExpression("default")
      else if (percent < 0.7) setExpression("smile")
      else setExpression("wink")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!character || !theme) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-30"
      initial={{ opacity: 0, scale: 0, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.7, type: "spring", bounce: 0.4 }}
      whileHover={{ scale: 1.12 }}
    >
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: `${theme.surface}ee`,
          boxShadow: `0 0 24px ${theme.glow}, 0 4px 16px rgba(0,0,0,0.25)`,
          border: `2px solid ${theme.primary}40`,
          animation: "companion-bob 4s ease-in-out infinite",
        }}
      >
        <img
          src={`/characters/${character}/${expression}.png`}
          alt="Companion"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
      </div>
    </motion.div>
  )
}
