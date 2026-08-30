"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import { CharacterId, Expression } from "@/lib/types"
import { characterIds, characters } from "@/lib/themes"
import { Menu } from "lucide-react"

export default function CharacterSelectScreen() {
  const { setCharacter } = useTheme()
  const [index, setIndex] = useState(1) // Start with middle character
  const [visible, setVisible] = useState(true)
  const [expression, setExpression] = useState<Expression>("default")
  const [hovered, setHovered] = useState(false)

  const currentId = characterIds[index]
  const config = characters[currentId]

  // Hover animation sequence
  useEffect(() => {
    if (!hovered) {
      setExpression("default")
      return
    }
    const sequence: Expression[] = ["smile", "wink", "default"]
    let seqIndex = 0
    setExpression("smile")
    const interval = setInterval(() => {
      seqIndex = (seqIndex + 1) % sequence.length
      setExpression(sequence[seqIndex])
    }, 1000)
    return () => clearInterval(interval)
  }, [hovered])

  const handlePrev = () => setIndex((i) => (i === 0 ? characterIds.length - 1 : i - 1))
  const handleNext = () => setIndex((i) => (i === characterIds.length - 1 ? 0 : i + 1))

  const handleSelect = () => {
    setCharacter(currentId)
    setTimeout(() => {
      setVisible(false)
    }, 800)
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
        setTimeout(() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }, 200)
      }}
    >
      {visible && (
        <motion.div
          key="character-select"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0914]"
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Top Navigation from Wireframe */}
          <div className="absolute top-0 w-full p-6 flex justify-between items-center text-white/80">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Menu size={32} />
            </button>
            <h1 className="text-xl md:text-2xl tracking-widest uppercase text-center font-light">
              Choose Your Character
            </h1>
            <button className="text-sm md:text-base tracking-widest text-right hover:text-white transition-colors">
              side<br />quests
            </button>
          </div>

          {/* Carousel */}
          <div className="flex items-center justify-center gap-8 md:gap-24 w-full px-4 mt-12">
            {/* Left Arrow */}
            <button 
              onClick={handlePrev}
              className="w-12 h-12 md:w-16 md:h-16 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[30px] border-r-white/50 hover:border-r-white transition-colors"
              aria-label="Previous Character"
            />

            {/* Character Head */}
            <div className="flex flex-col items-center">
              <motion.button
                className="relative w-48 h-48 md:w-64 md:h-64 outline-none cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleSelect}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={currentId}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={`/characters/${currentId}/${expression}.png`}
                  alt={config.name}
                  className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  style={{ animation: "float 4s ease-in-out infinite" }}
                />
              </motion.button>
              
              {/* Tagline / Name */}
              <motion.div 
                className="mt-8 text-center"
                key={`text-${currentId}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">{config.name}</h2>
                <p className="text-white/60 tracking-wider text-sm uppercase">{config.subtitle}</p>
                <p className="text-white/40 text-xs mt-4 animate-pulse">Click to select</p>
              </motion.div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={handleNext}
              className="w-12 h-12 md:w-16 md:h-16 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[30px] border-l-white/50 hover:border-l-white transition-colors"
              aria-label="Next Character"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}