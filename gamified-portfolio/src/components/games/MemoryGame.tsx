"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLife } from "@/contexts/LifeContext"
import { useTheme } from "@/components/layout/ThemeProvider"

const IMAGE_ASSETS = [
  "/memorygame/csharp.png",
  "/memorygame/unity.png",
  "/memorygame/node.jpg",
  "/memorygame/confident.png",
  "/memorygame/shysweet.png",
  "/memorygame/smartcool.png",
  "/memorygame/ludo.png",
  "/memorygame/wink.png"
]

// Duplicate to create pairs
const CARDS = [...IMAGE_ASSETS, ...IMAGE_ASSETS]

interface Card {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryGame() {
  const { theme } = useTheme()
  const { takeDamage, heal } = useLife()
  
  const [cards, setCards] = useState<Card[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [won, setWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  // Initialize game
  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    const shuffled = [...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((value, i) => ({ id: i, value, isFlipped: false, isMatched: false }))
    setCards(shuffled)
    setFlippedIndices([])
    setWon(false)
    setGameOver(false)
    setIsPlaying(false)
    setTimeLeft(30)
  }

  // Timer logic
  useEffect(() => {
    if (!isPlaying || won || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, won, gameOver])

  useEffect(() => {
    if (timeLeft === 0 && !gameOver && !won && isPlaying) {
      setGameOver(true)
      takeDamage()
    }
  }, [timeLeft, gameOver, won, isPlaying, takeDamage])

  const handleCardClick = (index: number) => {
    if (gameOver || won) return
    if (!isPlaying) setIsPlaying(true)
    if (flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return

    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)

    const newFlipped = [...flippedIndices, index]
    setFlippedIndices(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (newCards[first].value === newCards[second].value) {
        // Match!
        setTimeout(() => {
          setCards(prev => {
            const matched = [...prev]
            matched[first].isMatched = true
            matched[second].isMatched = true
            return matched
          })
          setFlippedIndices([])

          // Check win condition
          if (newCards.every((c, i) => c.isMatched || i === first || i === second)) {
            setWon(true)
            heal() // Restore health on win!
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => {
            const unflipped = [...prev]
            unflipped[first].isFlipped = false
            unflipped[second].isFlipped = false
            return unflipped
          })
          setFlippedIndices([])
        }, 1000)
      }
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold uppercase tracking-widest text-black/80">Memory Match</h3>
          <p className="text-xs uppercase tracking-widest text-black/50">Match all pairs before time runs out.</p>
        </div>
        
        <div className="text-xl font-mono font-bold tracking-widest" style={{ color: timeLeft <= 10 ? '#ef4444' : theme?.primary }}>
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
      </div>

      <AnimatePresence>
        {won && (
          <motion.div
            key="win"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-widest" style={{ color: theme?.primary }}>Victory!</h2>
            <p className="text-white/80 mb-6 font-bold uppercase tracking-widest text-sm">Health Restored</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 rounded-lg font-bold tracking-widest uppercase transition-transform hover:scale-105"
              style={{ backgroundColor: theme?.primary, color: theme?.background }}
            >
              Play Again
            </button>
          </motion.div>
        )}

        {gameOver && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold uppercase tracking-widest text-red-500 mb-2">Time Up</h2>
            <p className="text-[10px] text-white/60 uppercase tracking-widest mb-6">Memory Failed</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 rounded-lg font-bold tracking-widest uppercase transition-transform hover:scale-105 text-sm"
              style={{ backgroundColor: theme?.primary, color: theme?.background }}
            >
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            className={`aspect-square relative cursor-pointer perspective-1000 ${card.isMatched ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => handleCardClick(idx)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-full h-full absolute transition-all duration-500 rounded-xl"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
            >
              {/* Front (Face Down) */}
              <div 
                className="absolute inset-0 rounded-xl border flex items-center justify-center bg-slate-900/80"
                style={{ borderColor: `${theme?.primary}40`, backfaceVisibility: "hidden" }}
              >
                <div className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: theme?.primary }} />
              </div>
              
              {/* Back (Face Up) */}
              <div 
                className="absolute inset-0 rounded-xl border flex items-center justify-center bg-white"
                style={{ 
                  borderColor: theme?.primary,
                  boxShadow: card.isMatched ? `0 0 15px ${theme?.glow}` : 'none',
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                <img src={card.value} alt="Memory Card" className="w-full h-full object-contain p-2" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
