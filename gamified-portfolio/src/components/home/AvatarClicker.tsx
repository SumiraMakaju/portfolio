"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import { Expression } from "@/lib/types"
import { characterIds, characters } from "@/lib/themes"
import { ChevronLeft, ChevronRight } from "lucide-react"
import GamePanel from "@/components/ui/GamePanel"
import SlidingPuzzle from "@/components/games/SlidingPuzzle"

export default function AvatarClicker() {
  const { character, setCharacter, theme } = useTheme()
  const [expression, setExpression] = useState<Expression>("default")
  const [hovered, setHovered] = useState(false)
  
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const [clicks, setClicks] = useState<{id: number, x: number, y: number}[]>([])
  const [isLevelingUp, setIsLevelingUp] = useState(false)
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false)

  const currentIndex = characterIds.indexOf(character || "smart-cool")
  const config = characters[character || "smart-cool"]

  useEffect(() => {
    if (!hovered && !isLevelingUp) {
      setExpression("default")
      return
    }
    const sequence: Expression[] = ["smile", "wink", "default"]
    let seqIndex = 0
    setExpression(isLevelingUp ? "wink" : "smile")
    const interval = setInterval(() => {
      seqIndex = (seqIndex + 1) % sequence.length
      setExpression(sequence[seqIndex])
    }, 1000)
    return () => clearInterval(interval)
  }, [hovered, isLevelingUp])

  const handlePrev = () => setCharacter(characterIds[currentIndex === 0 ? characterIds.length - 1 : currentIndex - 1])
  const handleNext = () => setCharacter(characterIds[currentIndex === characterIds.length - 1 ? 0 : currentIndex + 1])

  const handleAvatarClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newClick = { id: Date.now(), x, y }
    setClicks(prev => [...prev, newClick])
    
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== newClick.id))
    }, 1000)

    if (xp + 10 >= 100) {
      setXp(0)
      setLevel(l => l + 1)
      setIsLevelingUp(true)
      setTimeout(() => setIsLevelingUp(false), 2000)
    } else {
      setXp(prev => prev + 10)
    }
  }

  if (!theme) return null

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span className="text-[10px] tracking-[0.25em] uppercase font-bold mb-8" style={{ color: theme.textMuted }}>
        [ Active Avatar ]
      </span>
      
      <div className="flex items-center gap-6 w-full justify-center mb-6 relative">
        <button onClick={handlePrev} className="p-2 transition-transform hover:-translate-x-1 z-30" style={{ color: theme.primary }}>
          <ChevronLeft size={40} strokeWidth={2} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={character}
            className="relative w-64 h-64 lg:w-80 lg:h-80 cursor-crosshair select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleAvatarClick}
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={`/characters/${character}/${expression}.png`}
              alt={config.name}
              className="w-full h-full object-contain drop-shadow-2xl relative z-10"
              style={{ animation: isLevelingUp ? "none" : "float 4s ease-in-out infinite", filter: `drop-shadow(0 0 25px ${theme.glow})` }}
              draggable={false}
            />

            <AnimatePresence>
              {clicks.map(click => (
                <motion.div
                  key={click.id}
                  initial={{ opacity: 1, y: click.y, x: click.x, scale: 0.5 }}
                  animate={{ opacity: 0, y: click.y - 80, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute text-xl font-black z-50 pointer-events-none"
                  style={{ color: theme.primary, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                >
                  +10 XP
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isLevelingUp && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: "50%" }}
                  animate={{ opacity: 1, scale: 1.2, y: "0%" }}
                  exit={{ opacity: 0, scale: 1.5, y: "-20%" }}
                  className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                >
                  <span className="text-4xl font-black uppercase tracking-widest text-white whitespace-nowrap" style={{ textShadow: `0 0 30px ${theme.primary}, 0 0 10px ${theme.primary}` }}>
                    LEVEL UP!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </AnimatePresence>

        <button onClick={handleNext} className="p-2 transition-transform hover:translate-x-1 z-30" style={{ color: theme.primary }}>
          <ChevronRight size={40} strokeWidth={2} />
        </button>

        {/* Game Icon Trigger */}
        <div className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-40">
          <button 
            onClick={() => setIsPuzzleOpen(true)}
            className="p-2 hover:scale-110 transition-transform bg-black/40 backdrop-blur-sm rounded-full border border-white/10"
            title="Play Sliding Puzzle"
          >
            <img 
              src={`/characters/${character}/gameicon.png`} 
              alt="Mini Game" 
              className="w-8 h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" 
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center w-48 mb-6">
        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10 relative">
          <motion.div 
            className="h-full rounded-full" 
            style={{ backgroundColor: theme.primary }}
            initial={{ width: 0 }}
            animate={{ width: `${xp}%` }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </div>
        <div className="flex justify-between w-full mt-2">
          <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">
            Level {level}
          </span>
          <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
            {xp} / 100
          </span>
        </div>
      </div>

      <div className="text-center h-16">
        <h2 className="text-2xl font-bold tracking-wider uppercase" style={{ color: theme.primary }}>{config.name}</h2>
        <p className="text-sm tracking-widest mt-2 uppercase" style={{ color: theme.textMuted }}>{config.subtitle}</p>
      </div>

      <GamePanel isOpen={isPuzzleOpen} onClose={() => setIsPuzzleOpen(false)} title="Decode Avatar">
        <SlidingPuzzle />
      </GamePanel>
    </div>
  )
}