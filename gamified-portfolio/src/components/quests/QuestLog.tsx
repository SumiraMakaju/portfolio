"use client"

import { useTheme } from "@/components/layout/ThemeProvider"
import { ProjectConfig } from "@/lib/types"

interface QuestLogProps {
  project: ProjectConfig
}

export default function QuestLog({ project }: QuestLogProps) {
  const { theme } = useTheme()

  if (!theme) return null

  const renderStars = (difficulty: number) => {
    return (
      <span className="tracking-[0.2em]">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ color: i < difficulty ? theme.primary : theme.textMuted }}>
            {i < difficulty ? "★" : "☆"}
          </span>
        ))}
      </span>
    )
  }

  return (
    <div 
      className="relative font-mono p-6 sm:p-8 rounded-lg max-w-2xl mx-auto mb-12"
      style={{ 
        backgroundColor: `${theme.surface}e6`, // slight transparency
        border: `1px solid ${theme.primary}50`,
        boxShadow: `inset 0 0 20px ${theme.glow}, 0 10px 30px rgba(0,0,0,0.5)`,
        color: theme.text
      }}
    >
      {/* Decorative corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: theme.primary }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: theme.primary }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: theme.primary }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: theme.primary }} />

      <div className="flex items-center gap-3 mb-10 tracking-widest text-sm sm:text-base font-bold" style={{ color: theme.secondary }}>
        <span>⚔</span> <span>MAIN QUEST</span>
      </div>

      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-[0.15em] uppercase" style={{ color: theme.primary }}>
          {project.name}
        </h3>
      </div>

      <p className="text-center mb-12 text-sm sm:text-base px-4 leading-relaxed tracking-wide" style={{ color: theme.text }}>
        {project.description}
      </p>

      <div className="grid grid-cols-2 gap-y-4 max-w-sm mx-auto mb-12 text-xs sm:text-sm tracking-widest">
         <div style={{ color: theme.textMuted }}>DIFFICULTY</div>
         <div>{renderStars(project.difficulty)}</div>
         
         <div style={{ color: theme.textMuted }}>STATUS</div>
         <div style={{ color: theme.secondary }}>✓ COMPLETE</div>
         
         <div style={{ color: theme.textMuted }}>PARTY</div>
         <div style={{ color: theme.text }}>SOLO</div>
      </div>

      <div>
        <div className="mb-4 text-xs tracking-widest" style={{ color: theme.textMuted }}>LOOT</div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold" style={{ color: theme.primary }}>
           {project.tech.map((t, i) => (
             <span key={i}>[ {t} ]</span>
           ))}
        </div>
      </div>
    </div>
  )
}