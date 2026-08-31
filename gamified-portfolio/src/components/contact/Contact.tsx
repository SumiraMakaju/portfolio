"use client"

import { useTheme } from "@/components/layout/ThemeProvider"
import { siteConfig } from "@/lib/config"
import { Mail } from "lucide-react"
import { FaLinkedin as Linkedin } from "react-icons/fa"

export default function Contact() {
  const { theme } = useTheme()
  
  if (!theme) return null

  return (
    <section id="contact" className="flex flex-col items-center justify-center py-16 px-6 mb-12 relative z-10 w-full">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
          
          <a 
            href={`mailto:${siteConfig.email}`}
            className="group relative flex-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 hover:-translate-y-2 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: theme.primary }} />
            <div className="p-4 rounded-full bg-white/10 border border-white/20 mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: theme.primary }}>
              <Mail size={28} />
            </div>
            <span className="text-base font-bold text-white tracking-widest uppercase mb-1">Gmail</span>
            <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase">Direct Message</span>
          </a>

          <a 
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative flex-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 hover:-translate-y-2 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: theme.primary }} />
            <div className="p-4 rounded-full bg-white/10 border border-white/20 mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: theme.primary }}>
              <Linkedin size={28} />
            </div>
            <span className="text-base font-bold text-white tracking-widest uppercase mb-1">LinkedIn</span>
            <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase">Professional Network</span>
          </a>
          
        </div>

      </div>
    </section>
  )
}