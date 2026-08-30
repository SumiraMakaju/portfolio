"use client"

import { useState } from "react"
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

  if (!theme) return null

  const radius = 260
  const center = 320
  const size = center * 2

  return (
    <div className="relative flex items-center justify-center w-full" style={{ height: size, minWidth: size }}>
      <div 
        className="absolute w-72 h-72 rounded-full flex flex-col items-center justify-center z-10 transition-all duration-500 bg-slate-900/90 backdrop-blur-md"
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
              className="text-center p-8 flex flex-col items-center justify-center w-full h-full"
            >
              <h4 className="text-2xl font-bold mb-4 tracking-wider" style={{ color: theme.primary }}>
                {activeSkill.category}
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                {activeSkill.items.map((item, i) => (
                  <span key={i} className="text-sm leading-tight text-white/90 font-medium">
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
              <h4 className="text-3xl font-bold tracking-widest text-white/50 uppercase">
                Skills
              </h4>
              <p className="text-sm text-white/30 mt-4 uppercase tracking-widest font-bold">Hover Nodes</p>
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
              className="absolute w-24 h-24 -ml-12 -mt-12 rounded-full flex flex-col items-center justify-center group z-20 outline-none bg-slate-900"
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
                className="w-12 h-12 rounded-full mb-2 transition-all duration-300"
                style={{ 
                  backgroundColor: isHovered ? theme.primary : `${theme.primary}20`,
                  boxShadow: isHovered ? `0 0 20px ${theme.glow}` : 'none'
                }}
              />
              <span 
                className="absolute -bottom-8 text-base whitespace-nowrap font-bold tracking-wider transition-colors duration-300"
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
    </div>
  )
}