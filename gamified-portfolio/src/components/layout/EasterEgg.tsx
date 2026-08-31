"use client"

import { useKonamiCode } from "@/hooks/useKonamiCode"
import { useLife } from "@/contexts/LifeContext"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function EasterEgg() {
  const isUnlocked = useKonamiCode()
  const { setInvincible } = useLife()
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    if (isUnlocked) {
      setInvincible(true)
      setShowOverlay(true)
      const timer = setTimeout(() => {
        setShowOverlay(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isUnlocked, setInvincible])

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="text-center"
          >
            <h1
              className="text-4xl md:text-7xl font-black tracking-widest text-transparent bg-clip-text uppercase mb-4"
              style={{
                backgroundImage: "linear-gradient(to right, #22c55e, #10b981, #22c55e)",
                textShadow: "0 0 40px rgba(34, 197, 94, 0.4)"
              }}
            >
              secrt code enabled
            </h1>
            <p className="text-[#a7f3d0] tracking-widest uppercase font-bold text-xs md:text-sm shadow-black drop-shadow-xl animate-pulse">
              Unlimited lives on games
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}