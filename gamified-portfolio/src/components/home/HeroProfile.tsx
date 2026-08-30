"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import { Expression } from "@/lib/types"
import { characterIds, characters } from "@/lib/themes"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import TypewriterText from "@/components/ui/TypewriterText"
import { siteConfig } from "@/lib/config"

export default function HeroProfile() {
  const { character, setCharacter, theme } = useTheme()
  const [expression, setExpression] = useState<Expression>("default")
  const [hovered, setHovered] = useState(false)

  const currentIndex = characterIds.indexOf(character || "smart-cool")
  const config = characters[character || "smart-cool"]

  useEffect(() => {
    if (!hovered) {
      setExpression("default")
      return
    }
    const sequence: Expression[] = ["smile", "wink", "default"]
    let seqIndex = 0
    setExpression("smile")
    const interval = setInterval(() => {
      seqIndex = (seqIndex + 1) % sequence.length
      setExpression(sequence[seqIndex])
    }, 1000)
    return () => clearInterval(interval)
  }, [hovered])

  const handlePrev = () => setCharacter(characterIds[currentIndex === 0 ? characterIds.length - 1 : currentIndex - 1])
  const handleNext = () => setCharacter(characterIds[currentIndex === characterIds.length - 1 ? 0 : currentIndex + 1])

  if (!theme) return null

  return (
    <section id="about" className="min-h-[85vh] relative flex flex-col justify-center pt-24 pb-12 px-6 sm:px-12">
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <button className="p-2 transition-colors hover:bg-white/5" style={{ color: theme.text }}>
          <Menu size={28} />
        </button>
        <button className="text-xs tracking-[0.2em] transition-colors hover:scale-105 font-bold" style={{ color: theme.primary }}>
          SIDE QUESTS
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold mb-8" style={{ color: theme.textMuted }}>
            [ Active Avatar ]
          </span>
          
          <div className="flex items-center gap-6 w-full justify-center mb-8">
            <button onClick={handlePrev} className="p-2 transition-transform hover:-translate-x-1" style={{ color: theme.primary }}>
              <ChevronLeft size={40} strokeWidth={2} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={character}
                className="relative w-72 h-72 lg:w-96 lg:h-96 cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`/characters/${character}/${expression}.png`}
                  alt={config.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ animation: "float 4s ease-in-out infinite", filter: `drop-shadow(0 0 25px ${theme.glow})` }}
                />
              </motion.div>
            </AnimatePresence>

            <button onClick={handleNext} className="p-2 transition-transform hover:translate-x-1" style={{ color: theme.primary }}>
              <ChevronRight size={40} strokeWidth={2} />
            </button>
          </div>

          <div className="text-center h-16">
            <h2 className="text-2xl font-bold tracking-wider uppercase" style={{ color: theme.primary }}>{config.name}</h2>
            <p className="text-sm tracking-widest mt-2 uppercase" style={{ color: theme.textMuted }}>{config.subtitle}</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-10">
          <TypewriterText
            text={siteConfig.name}
            className="text-5xl sm:text-6xl font-bold tracking-tight block mb-4"
            style={{ fontFamily: "var(--font-display)", color: theme.text }}
          />
          <h3 className="text-xl sm:text-2xl font-medium tracking-wide mb-8" style={{ color: theme.primary }}>
            {siteConfig.title}
          </h3>
          <div className="space-y-6 mb-10">
            {siteConfig.bio.map((line, i) => (
              <motion.p
                key={i}
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: theme.text }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-bold" style={{ color: theme.textMuted }}>
            <span>LOCATION: {siteConfig.location}</span>
          </div>
        </div>

      </div>
    </section>
  )
}