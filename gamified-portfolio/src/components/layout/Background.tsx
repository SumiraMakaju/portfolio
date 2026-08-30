"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./ThemeProvider"

export default function Background() {
  const { character } = useTheme()

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-[#0f1016]" />

      <AnimatePresence mode="wait">
        {character && (
          <motion.img
            key={character}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            src={`/characters/${character}/background.png`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0f1016]/90" />
    </div>
  )
}