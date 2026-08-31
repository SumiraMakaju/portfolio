"use client"

import { useTheme } from "@/components/layout/ThemeProvider"
import { Menu } from "lucide-react"
import AvatarClicker from "./AvatarClicker"
import HeroBio from "./HeroBio"

export default function HeroProfile() {
  const { theme } = useTheme()
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
        <div className="lg:col-span-6">
          <AvatarClicker />
        </div>
        <div className="lg:col-span-6">
          <HeroBio />
        </div>
      </div>
    </section>
  )
}