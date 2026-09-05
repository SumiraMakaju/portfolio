"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"

export default function SectionDivider() {
  const { theme } = useTheme()
  if (!theme) return null

  return (
    <div className="flex items-center justify-center py-12 px-6 select-none">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${theme.primary}40)` }} />
        <motion.div
          animate={{
            boxShadow: [
              `0 0 8px ${theme.glow}`,
              `0 0 20px ${theme.glow}`,
              `0 0 8px ${theme.glow}`,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-3 h-3 rotate-45"
          style={{ backgroundColor: theme.primary }}
        />
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${theme.primary}40)` }} />
      </div>
    </div>
  )
}
