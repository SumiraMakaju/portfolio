"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import { useLife } from "@/contexts/LifeContext"

import { Expression } from "@/lib/types"
import { characterIds, characters } from "@/lib/themes"
import { ChevronLeft, ChevronRight } from "lucide-react"
import GamePanel from "@/components/ui/GamePanel"
import SlidingPuzzle from "@/components/games/SlidingPuzzle"
import TypewriterText from "@/components/ui/TypewriterText"

export default function AvatarClicker() {
  const { character, setCharacter, theme } = useTheme()
  const { xp, level, addXp } = useLife()
  
  const [expression, setExpression] = useState<Expression>("default")
  const [hovered, setHovered] = useState(false)
  
  const [clicks, setClicks] = useState<{id: number, x: number, y: number}[]>([])
  const [isLevelingUp, setIsLevelingUp] = useState(false)
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false)

  const currentIndex = characterIds.indexOf(character || "smart-cool")
  const config = characters[character || "smart-cool"]

  // Trigger level up animation when global level changes
  useEffect(() => {
    if (level > 1) {
      setIsLevelingUp(true)
      document.body.classList.add("level-up-active")
      
      const timer = setTimeout(() => {
        setIsLevelingUp(false)
        document.body.classList.remove("level-up-active")
      }, 2000)
      return () => {
        clearTimeout(timer)
        document.body.classList.remove("level-up-active")
      }
    }
  }, [level])

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
    
    // Trigger particle explosion at global mouse coordinates
    import('@/lib/particles').then(({ triggerExplosion }) => {
      if (theme) triggerExplosion(e.clientX, e.clientY, [theme.particleColor1, theme.particleColor2, theme.particleColor3, "#ffffff"]);
    });
    
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== newClick.id))
    }, 1000)

    addXp(10)
  }

  if (!theme) return null

  return (
    <div className="flex flex-col items-center justify-center p-4 relative w-full">
      {/* Game Icon Trigger moved to top right to avoid blocking arrows */}
      <div className="absolute top-0 right-0 sm:top-4 sm:right-4 z-40">
        <button 
          onClick={() => setIsPuzzleOpen(true)}
          className="hover:scale-110 transition-transform"
          title="Play Sliding Puzzle"
        >
          <motion.img 
            src={`/icons/puzzle.png`} 
            alt="Mini Game" 
            className="w-10 h-10 object-contain opacity-90 hover:opacity-100 transition-opacity" 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            onError={(e: any) => { e.currentTarget.style.display = 'none' }}
          />
        </button>
      </div>

      <TypewriterText 
        text="CHOOSE YOUR CHARACTER"
        className="text-[10px] tracking-[0.25em] uppercase font-bold mb-8 text-center" 
        style={{ color: theme.textMuted }} 
      />
      
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