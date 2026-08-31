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
    <div className="relative rounded-xl shadow-2xl overflow-hidden flex flex-col p-1 transition-transform hover:-translate-y-1 duration-300 bg-white/5 backdrop-blur-md border border-white/10">
      
      <div className="relative z-10 flex flex-col lg:flex-row w-full rounded-lg border border-white/5 bg-black/20 p-4 gap-4">
        
        <div className="w-full lg:w-[25%] flex-shrink-0 relative rounded-md overflow-hidden border border-white/10 bg-black/40">
    
          
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover aspect-video lg:aspect-auto hover:scale-105 transition-transform duration-700 opacity-90" 
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

        <div className="w-full lg:w-[55%] flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-white tracking-wide">{project.name}</h3>
            </div>
            
            <p className="text-[11px] text-white/70 leading-relaxed mb-3">
              {project.description}
            </p>

            <p className="text-[11px] text-white/70 font-medium mb-3">
              <strong className="text-white font-bold uppercase tracking-widest text-[9px] mr-2">Loot:</strong>
              {project.tech.join(", ")}
            </p>

            <div className="flex gap-6 mb-3">
              <div>
                <span className="text-[8px] text-white/50 uppercase tracking-widest block mb-1 font-bold">Difficulty</span>
                <div className="flex gap-0.5 items-center h-5">
                  {renderStars(project.difficulty)}
                </div>
              </div>
              <div>
                <span className="text-[8px] text-white/50 uppercase tracking-widest block mb-1 font-bold">Level</span>
                <div className="flex items-center h-5">
                  <span className="text-white text-[11px] font-bold leading-none">{project.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1">
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

        <div className="w-full lg:w-[20%] flex flex-col justify-end gap-2 py-1">
          <div className="w-full py-2 rounded-lg bg-white/10 border border-white flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider shadow-sm text-white uppercase">
            STATUS: COMPLETE
          </div>

          <a href={`https://github.com/${siteConfig.github}/${project.repo}`} target="_blank" rel="noreferrer"
             onClick={() => addXp(20)}
             className="w-full py-2 rounded-lg flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider transition-all hover:brightness-110 shadow-sm"
             style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: '#fff' }}>
            <Github size={14} /> VIEW ON GITHUB
          </a>
          
          <button 
            onClick={() => {
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