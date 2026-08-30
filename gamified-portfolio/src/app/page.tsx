"use client"

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

export default function Home() {
  const { theme } = useTheme()

  return (
    <>
      <Background />
      <SideNav />
      {/* <ScrollProgress /> */}
      <CharacterCompanion />
      <main className="relative z-10 pb-24">
        
        <HeroProfile />
        
        {/* Split Skills Section */}
        <section id="skills" className="py-20 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Description Text */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold tracking-[0.2em] mb-6 uppercase" style={{ fontFamily: "var(--font-display)", color: theme?.primary }}>
                My Arsenal
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

            {/* Right: Skill Tree */}
            <div className="order-1 lg:order-2 flex justify-center">
              <SkillTree skills={siteConfig.skills} />
            </div>

          </div>
        </section>
        
        {/* Main Quests Section (Single Column, Wide Rectangles) */}
        <section id="quests" className="py-20 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-center mb-16 uppercase" style={{ fontFamily: "var(--font-display)", color: theme?.primary }}>
              Main Quests
            </h2>
            <div className="flex flex-col gap-8">
              {siteConfig.projects.map((project, index) => (
                <QuestCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section (Single Column, Wide Rectangles) */}
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
          <Contact />
          <p className="mt-24 text-[10px] tracking-widest uppercase opacity-40" style={{ color: theme?.text }}>
            THANK YOU FOR PLAYING
          </p>
        </section>
      </main>
    </>
  )
}