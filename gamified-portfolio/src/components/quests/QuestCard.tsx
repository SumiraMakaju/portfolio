"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import { useLife } from "@/contexts/LifeContext"
import { ProjectConfig } from "@/lib/types"
import { siteConfig } from "@/lib/config"
import { fetchReadme } from "@/lib/github"
import { Shield, FileText, Star, CheckCircle2 } from "lucide-react"
import { FaGithub as Github } from "react-icons/fa"

interface QuestCardProps {
  project: ProjectConfig
}

export default function QuestCard({ project }: QuestCardProps) {
  const { theme } = useTheme()
  const { addXp } = useLife()
  const [showReadme, setShowReadme] = useState(false)
  const [readme, setReadme] = useState<string | null>(null)
  const [loadingReadme, setLoadingReadme] = useState(false)

  if (!theme) return null

  const renderStars = (difficulty: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={15} 
        className={i < difficulty ? "fill-amber-400 text-amber-400" : "text-white/20"} 
      />
    ))
  }

  const toggleReadme = async () => {
    const nextState = !showReadme
    setShowReadme(nextState)
    if (nextState && !readme && !loadingReadme) {
      setLoadingReadme(true)
      const content = await fetchReadme(siteConfig.github, project.repo)
      setReadme(content || "No README found in repository.")
      setLoadingReadme(false)
    }
  }

  return (
    <div 
      className="relative rounded-xl shadow-2xl overflow-hidden flex flex-col p-1 transition-transform hover:-translate-y-1 duration-300 border-2 w-full h-full"
      style={{ backgroundColor: theme.surfaceAlt, borderColor: `${theme.primary}50` }}
    >
      
      <div 
        className="relative z-10 flex flex-col w-full h-full rounded-lg border p-3 gap-3 overflow-hidden"
        style={{ backgroundColor: theme.surface, borderColor: `${theme.primary}30` }}
      >
        
        <div 
          className="w-full flex-shrink-0 relative rounded-md overflow-hidden border h-36"
          style={{ backgroundColor: theme.background, borderColor: `${theme.primary}30` }}
        >
    
          
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-90" 
          />

          <AnimatePresence>
            {showReadme && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-black/80 backdrop-blur-md p-3 overflow-y-auto"
              >
                {loadingReadme ? (
                  <div className="flex items-center justify-center h-full text-[9px] text-white/50 uppercase tracking-widest font-bold">
                    Fetching Data
                  </div>
                ) : (
                  <pre className="text-[9px] text-white/90 whitespace-pre-wrap font-mono leading-relaxed">
                    {readme}
                  </pre>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full flex flex-col justify-between py-1 flex-1 overflow-hidden">
          <div className="overflow-y-auto pr-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-white tracking-wide leading-tight">{project.name}</h3>
            </div>
            
            <p className="text-[11px] text-white/70 leading-relaxed mb-3">
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-[9px] uppercase tracking-widest font-bold mb-1.5" style={{ color: theme.text }}>
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/5 text-white/80 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[8px] text-white/50 uppercase tracking-widest block mb-1 font-bold">Level</span>
                <div className="flex items-center h-5">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase border border-white/20 text-white/90">{project.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2">
             <span className="text-[8px] font-bold text-white/50 tracking-widest mb-1.5 block uppercase">Quest Timeline</span>
             <div className="flex justify-between text-[8px] mb-1 uppercase font-bold px-1 text-white/40">
               <span style={{ color: theme.accent }}>Idea</span>
               <span style={{ color: theme.accent }}>Dev</span>
               <span style={{ color: theme.accent }}>Complete</span>
             </div>
             <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
               <div className="h-full w-full rounded-full shadow-sm" style={{ backgroundColor: theme.accent }} />
             </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-end gap-1.5 py-1 mt-auto shrink-0">
          <div className="w-full py-2 rounded-lg bg-white/10 border border-white flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider shadow-sm text-white uppercase">
            STATUS: COMPLETE
          </div>

          <a href={`https://github.com/${siteConfig.github}/${project.repo}`} target="_blank" rel="noreferrer"
             onClick={(e) => {
               e.stopPropagation()
               addXp(20)
             }}
             className="w-full py-2 rounded-lg flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider transition-all hover:brightness-110 shadow-sm"
             style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: '#fff' }}>
            <Github size={14} /> VIEW ON GITHUB
          </a>
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              addXp(20)
              toggleReadme()
            }}
            className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider transition-all shadow-sm"
          >
            <FileText size={14} /> README
          </button>
        </div>
      </div>
    </div>
  )
}