"use client"

import { useLife } from "@/contexts/LifeContext"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import { useEffect, useState } from "react"

export default function GameOverScreen() {
  const { hp, reset } = useLife()
  const { theme } = useTheme()
  const [countdown, setCountdown] = useState(9)

  useEffect(() => {
    if (hp === 0) {
      setCountdown(9)
      const interval = setInterval(() => {
        setCountdown((c) => Math.max(0, c - 1))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [hp])

  return (
    <AnimatePresence>
      {hp === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", delay: 0.5 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-widest text-red-600 mb-8" style={{ textShadow: "0 0 40px rgba(220, 38, 38, 0.5)" }}>
              Game Over
            </h1>
            
            <p className="text-xl md:text-2xl tracking-[0.3em] uppercase text-white/50 mb-12">
              Continue? <span className="font-mono text-white">{countdown}</span>
            </p>

            <button
              onClick={reset}
              className="px-8 py-4 text-lg font-bold tracking-widest uppercase transition-all duration-300 rounded-lg hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: theme?.primary || "#ffffff", 
                color: theme?.background || "#000000",
                boxShadow: `0 0 20px ${theme?.glow || "rgba(255,255,255,0.5)"}`
              }}
            >
              Insert Coin to Revive
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
