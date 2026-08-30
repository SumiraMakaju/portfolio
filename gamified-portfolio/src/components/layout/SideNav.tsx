"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/layout/ThemeProvider"
import { Gamepad2, User, Sparkles, Map, Trophy, Mail } from "lucide-react"

const navItems = [
  { id: "home", icon: Gamepad2, label: "Start" },
  { id: "about", icon: User, label: "Profile" },
  { id: "skills", icon: Sparkles, label: "Arsenal" },
  { id: "quests", icon: Map, label: "Quests" },
  { id: "experience", icon: Trophy, label: "Records" },
  { id: "contact", icon: Mail, label: "Contact" },
]

export default function SideNav() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!theme) return null

  return (
    <nav className="fixed left-0 top-0 h-full z-50 flex flex-col justify-center px-4 md:px-8 pointer-events-none hidden sm:flex">
      <div className="flex flex-col gap-8 p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 pointer-events-auto shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative group p-4 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: isActive ? theme.primary : "transparent",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
                boxShadow: isActive ? `0 0 25px ${theme.glow}` : "none"
              }}
            >
              <Icon size={26} strokeWidth={isActive ? 2.5 : 2} />
              
              <div className="absolute left-full ml-5 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 whitespace-nowrap">
                {item.label}
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}