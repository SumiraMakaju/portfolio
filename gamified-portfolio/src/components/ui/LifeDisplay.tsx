"use client"

import { useLife } from "@/contexts/LifeContext"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"

const Heart = ({ filled, color }: { filled: boolean; color?: string }) => (
  <svg 
    width="24" height="24" viewBox="0 0 24 24" 
    fill={filled ? (color || "#ef4444") : "transparent"} 
    stroke={filled ? (color || "#ef4444") : "rgba(255,255,255,0.2)"} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

export default function LifeDisplay() {
  const { hp, maxHp } = useLife()
  const { theme } = useTheme()

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
      {Array.from({ length: maxHp }).map((_, i) => {
        const isFilled = i < hp
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{ scale: isFilled ? 1 : 0.8, opacity: isFilled ? 1 : 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Heart filled={isFilled} color={theme?.primary} />
          </motion.div>
        )
      })}
    </div>
  )
}
