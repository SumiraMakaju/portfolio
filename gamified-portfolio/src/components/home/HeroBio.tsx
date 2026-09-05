"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import { FileText, Palette } from "lucide-react"
import TypewriterText from "@/components/ui/TypewriterText"
import { siteConfig } from "@/lib/config"
import {FaGithub as Github} from "react-icons/fa"

export default function HeroBio() {
  const { theme } = useTheme()
  if (!theme) return null

  return (
    <div className="lg:pl-10">
      <TypewriterText
        text={siteConfig.name}
        className="text-5xl sm:text-6xl font-bold tracking-tight block mb-4"
        style={{ fontFamily: "var(--font-display)", color: theme.text }}
      />
      <h3 className="text-xl sm:text-2xl font-medium tracking-wide mb-8" style={{ color: theme.primary }}>
        {siteConfig.title}
      </h3>
      
      <div className="space-y-6 mb-8">
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
      
      <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-bold mb-10" style={{ color: theme.textMuted }}>
        <span>LOCATION: {siteConfig.location}</span>
      </div>

      <div className="flex flex-wrap gap-4">
        <a 
          href={`https://github.com/${siteConfig.github}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold tracking-widest text-xs uppercase backdrop-blur-md shadow-xl"
          style={{ color: theme.primary }}
        >
          <Github size={18} />
          GitHub
        </a>
        <a 
          href={siteConfig.resumeUrl} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold tracking-widest text-xs uppercase text-white backdrop-blur-md shadow-xl"
        >
          <FileText size={18} />
          Resume
        </a>
      </div>
    </div>
  )
}