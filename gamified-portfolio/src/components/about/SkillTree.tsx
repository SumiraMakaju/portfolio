"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"

interface SkillGroup {
  category: string
  items: string[]
}

interface SkillTreeProps {
  skills: SkillGroup[]
}

export default function SkillTree({ skills }: SkillTreeProps) {
  const { theme } = useTheme()
  const [activeSkill, setActiveSkill] = useState<SkillGroup | null>(null)
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ radius: 120, center: 160 })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDimensions({ radius: 260, center: 320 })
      } else if (window.innerWidth >= 640) {
        setDimensions({ radius: 180, center: 240 })
      } else {
        setDimensions({ radius: 120, center: 160 })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    setMounted(true)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!theme) return null
  if (!mounted) return <div className="w-full min-h-[320px] lg:min-h-[640px]" />

  const { radius, center } = dimensions
  const size = center * 2

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center justify-center w-full mx-auto"
      style={{ height: size, maxWidth: size }}
    >
      <div
        className="absolute w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full flex flex-col items-center justify-center z-10 transition-all duration-500 bg-slate-900/90 backdrop-blur-md"
        style={{
          border: `2px solid ${theme.primary}`,
          boxShadow: activeSkill ? `0 0 50px ${theme.glow}, inset 0 0 40px ${theme.glow}` : `0 0 20px ${theme.glow}`,
        }}
      >
        <AnimatePresence mode="wait">
          {activeSkill ? (
            <motion.div
              key={activeSkill.category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center w-full h-full"
            >
              <h4 className="text-sm sm:text-lg lg:text-2xl font-bold mb-2 lg:mb-4 tracking-wider uppercase" style={{ color: theme.primary }}>
                {activeSkill.category}
              </h4>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {activeSkill.items.map((item, i) => (
                  <span key={i} className="text-[10px] sm:text-xs lg:text-sm leading-tight text-white/90 font-medium">
                    {item}{i < activeSkill.items.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <h4 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-widest text-white/50 uppercase">
                Skills
              </h4>
              <p className="text-[9px] sm:text-xs lg:text-sm text-white/30 mt-2 sm:mt-4 uppercase tracking-widest font-bold">Hover Nodes</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {skills.map((skill, index) => {
        const angle = (index / skills.length) * (2 * Math.PI) - (Math.PI / 2)
        const x = center + radius * Math.cos(angle)
        const y = center + radius * Math.sin(angle)
        const isHovered = activeSkill?.category === skill.category

        return (
          <div key={skill.category}>
            <svg className="absolute inset-0 pointer-events-none" width={size} height={size}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={isHovered ? theme.primary : `${theme.primary}40`}
                strokeWidth={isHovered ? "4" : "1.5"}
                className="transition-all duration-300"
              />
            </svg>

            <motion.button
              className="absolute w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 -ml-6 -mt-6 sm:-ml-8 sm:-mt-8 lg:-ml-12 lg:-mt-12 rounded-full flex flex-col items-center justify-center group z-20 outline-none bg-slate-900"
              style={{
                left: x,
                top: y,
                border: `2px solid ${isHovered ? theme.primary : `${theme.primary}40`}`,
                boxShadow: isHovered ? `0 0 25px ${theme.glow}` : 'none',
              }}
              onMouseEnter={() => setActiveSkill(skill)}
              onMouseLeave={() => setActiveSkill(null)}
              whileHover={{ scale: 1.15 }}
            >
              <div
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-full mb-1 lg:mb-2 transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? theme.primary : `${theme.primary}20`,
                  boxShadow: isHovered ? `0 0 20px ${theme.glow}` : 'none'
                }}
              />
              <span
                className="absolute -bottom-5 sm:-bottom-6 lg:-bottom-8 text-[8px] sm:text-[10px] lg:text-base whitespace-nowrap font-bold tracking-wider transition-colors duration-300 uppercase"
                style={{ color: isHovered ? theme.primary : theme.textMuted }}
              >
                {skill.category}
              </span>
            </motion.button>
          </div>
        )
      })}

      <div
        className="absolute rounded-full border pointer-events-none opacity-20"
        style={{ width: radius * 2, height: radius * 2, borderColor: theme.primary }}
      />
      <div
        className="absolute rounded-full border border-dashed pointer-events-none opacity-10"
        style={{ width: radius * 2.5, height: radius * 2.5, borderColor: theme.primary, animation: 'spin 60s linear infinite' }}
      />
    </motion.div>
  )
}