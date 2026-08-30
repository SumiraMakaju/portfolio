"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import TypewriterText from "@/components/ui/TypewriterText"
import { siteConfig } from "@/lib/config"
import SkillTree from "./SkillTree"

export default function AboutSection() {
  const { character, theme } = useTheme()

  if (!theme || !character) return null

  return (
    <section
      id="about"
      className="min-h-screen relative flex items-center py-24 px-6 sm:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text & Experience */}
        <div>
          <div className="mb-2">
            <TypewriterText
              text={siteConfig.name}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight block"
              style={{
                fontFamily: "var(--font-display), 'Playfair Display', serif",
                color: theme.text,
              }}
              delay={0.2}
            />
          </div>

          <motion.p
            className="text-lg sm:text-xl font-medium mb-6"
            style={{ color: theme.primary }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {siteConfig.title}
          </motion.p>

          <div className="space-y-3 mb-10">
            {siteConfig.bio.map((line, i) => (
              <motion.p
                key={i}
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: theme.text }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + i * 0.2, duration: 0.6 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Experience Mini-Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: theme.primary }}
            >
              Quest History
            </h3>
            <div className="space-y-4">
              {siteConfig.experience.slice(0, 2).map((exp, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border-l-4"
                  style={{
                    backgroundColor: `${theme.surface}99`,
                    borderLeftColor: theme.primary,
                    borderTop: `1px solid ${theme.primary}20`,
                    borderRight: `1px solid ${theme.primary}20`,
                    borderBottom: `1px solid ${theme.primary}20`,
                  }}
                >
                  <p className="font-semibold text-base" style={{ color: theme.text }}>
                    {exp.title}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: theme.primary }}>
                    {exp.organization}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: RPG Skill Tree */}
        <motion.div
          className="flex flex-col items-center justify-center mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
        >
          <SkillTree skills={siteConfig.skills} />
        </motion.div>

      </div>
    </section>
  )
}