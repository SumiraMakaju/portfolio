"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import Background from "@/components/layout/Background"
import ScrollProgress from "@/components/ui/ScrollProgress"
import CharacterCompanion from "@/components/layout/CharacterCompanion"
import HeroProfile from "@/components/home/HeroProfile"
import SkillTree from "@/components/about/SkillTree"
import QuestCard from "@/components/quests/QuestCard"
import AchievementCard from "@/components/experience/AchievementCard"
import { siteConfig } from "@/lib/config"
import SideNav from "@/components/layout/SideNav"
import Contact from "@/components/contact/Contact"
import EasterEgg from "@/components/layout/EasterEgg"
import MemoryGame from "@/components/games/MemoryGame"
import BlockBreaker from "@/components/games/BlockBreaker"
import GamePanel from "@/components/ui/GamePanel"

export default function Home() {
  const { theme, character } = useTheme()
  const [isMemoryOpen, setIsMemoryOpen] = useState(false)
  const [isFirewallOpen, setIsFirewallOpen] = useState(false)

  return (
    <>
      <Background />
      <SideNav />
      {/* <ScrollProgress /> */}
      <CharacterCompanion />
      <main className="relative z-10 pb-24">
        
        <HeroProfile />
        
        {/* Split Skills Section */}
        <section id="skills" className="py-20 px-6 sm:px-12 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Description Text */}
            <div className="order-2 lg:order-1 flex flex-col gap-12 relative">
              <div>
                <h2 className="text-3xl font-bold tracking-[0.2em] mb-6 uppercase flex items-center gap-4" style={{ fontFamily: "var(--font-display)", color: theme?.primary }}>
                  My Arsenal
                  {/* Game Icon Trigger */}
                  <button 
                    onClick={() => setIsMemoryOpen(true)}
                    className="p-1 hover:scale-110 transition-transform bg-black/40 backdrop-blur-sm rounded-full border border-white/10"
                    title="Play Memory Game"
                  >
                    <motion.img 
                      src={`/icons/memory.png`} 
                      alt="Mini Game" 
                      className="w-8 h-8 object-contain" 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      onError={(e: any) => { e.currentTarget.style.display = 'none' }}
                    />
                  </button>
                </h2>
                <div className="space-y-4" style={{ color: theme?.text }}>
                  <p className="text-base leading-relaxed opacity-90">
                    I am a passionate developer deeply interested in creating immersive digital experiences. My journey involves pursuing advanced concepts in game development, artificial intelligence, and robust web applications.
                  </p>
                  <p className="text-base leading-relaxed opacity-90">
                    I specialize in bridging the gap between highly interactive user interfaces and complex backend logic, constantly learning and expanding my constellation of skills.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Skill Tree */}
            <div className="order-1 lg:order-2 flex justify-center">
              <SkillTree skills={siteConfig.skills} />
            </div>

          </div>
        </section>
        
        {/* Main Quests Section */}
        <section id="quests" className="py-20 px-6 sm:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-center mb-16 uppercase flex items-center justify-center gap-4" style={{ fontFamily: "var(--font-display)", color: theme?.primary }}>
              Main Quests
              {/* Game Icon Trigger */}
              <button 
                onClick={() => setIsFirewallOpen(true)}
                className="p-1 hover:scale-110 transition-transform bg-black/40 backdrop-blur-sm rounded-full border border-white/10"
                title="Play Firewall Breaker"
              >
                <motion.img 
                  src={`/icons/firewallbreaker.png`} 
                  alt="Mini Game" 
                  className="w-8 h-8 object-contain" 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  onError={(e: any) => { e.currentTarget.style.display = 'none' }}
                />
              </button>
            </h2>
            <div className="flex flex-col gap-8">
              {siteConfig.projects.map((project, index) => (
                <QuestCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}

        <section id="experience" className="py-20 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-center mb-16 uppercase" style={{ fontFamily: "var(--font-display)", color: theme?.secondary }}>
              Achievements
            </h2>
            <div className="flex flex-col gap-8">
              {siteConfig.experience.map((exp, index) => (
                <AchievementCard key={index} exp={exp} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer/Contact */}
        <section id="contact" className="pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest" style={{ color: theme?.primary }}>
            Ready for the next quest?
          </h2>
          <p className="mb-8 max-w-md text-sm opacity-80" style={{ color: theme?.text }}>
            Whether it's a team raid or a solo expedition, I'm always looking for new challenges and opportunities.
          </p>
          <EasterEgg />
          <Contact />
          <p className="mt-24 text-[10px] tracking-widest uppercase opacity-40" style={{ color: theme?.text }}>
            THANK YOU FOR PLAYING
          </p>
        </section>
      </main>

      <GamePanel isOpen={isMemoryOpen} onClose={() => setIsMemoryOpen(false)} title="Tech Stack Memory">
        <MemoryGame />
      </GamePanel>

      <GamePanel isOpen={isFirewallOpen} onClose={() => setIsFirewallOpen(false)} title="Firewall Breaker">
        <BlockBreaker onWin={() => {}} />
      </GamePanel>
    </>
  )
}