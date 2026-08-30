"use client"

import { useTheme } from "@/components/layout/ThemeProvider"
import { Trophy } from "lucide-react"

interface ExperienceConfig {
  title: string
  organization: string
  details: string[]
}

interface AchievementCardProps {
  exp: ExperienceConfig
}

export default function AchievementCard({ exp }: AchievementCardProps) {
  const { theme } = useTheme()
  if (!theme) return null

  return (
    <div className="relative rounded-2xl shadow-2xl overflow-hidden p-1.5 transition-transform hover:-translate-y-1 duration-300 bg-white/5 backdrop-blur-md border border-white/10">
      
      <div className="relative z-10 flex flex-col md:flex-row w-full rounded-xl border border-white/5 bg-black/20 p-6 gap-6 items-start md:items-center">
        
        <div className="w-full md:w-1/3 flex-shrink-0 flex items-start gap-5">
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 shadow-sm flex-shrink-0" style={{ color: theme.primary }}>
            <Trophy size={28} />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-1.5">
              Guild Record
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide leading-tight mb-1.5">
              {exp.title}
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
              {exp.organization}
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex-grow space-y-4 md:pl-8 md:border-l border-white/10">
          {exp.details.map((detail, i) => (
            <div key={i} className="flex gap-4 text-xs text-white/70 leading-relaxed">
              <span className="mt-0.5 font-bold" style={{ color: theme.primary }}>&gt;</span>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}