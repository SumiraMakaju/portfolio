"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLife } from "@/contexts/LifeContext"
import { useTheme } from "@/components/layout/ThemeProvider"

const GRID_SIZE = 3
const MAX_MOVES = 40

export default function SlidingPuzzle() {
  const { theme, character } = useTheme()
  const { takeDamage, heal } = useLife()
  
  const [tiles, setTiles] = useState<number[]>([])
  const [emptyIdx, setEmptyIdx] = useState<number>(GRID_SIZE * GRID_SIZE - 1)
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [imageSrc, setImageSrc] = useState("")

  useEffect(() => {
    if (character) {
      setImageSrc(`/characters/${character}/default.png`)
      resetGame()
    }
  }, [character])

  const resetGame = () => {
    // Generate solvable puzzle
    const initialTiles = Array.from({ length: GRID_SIZE * GRID_SIZE - 1 }, (_, i) => i)
    initialTiles.push(-1) // -1 is the empty space

    // Shuffle by making random valid moves from solved state to guarantee solvability
    let empty = GRID_SIZE * GRID_SIZE - 1
    for (let i = 0; i < 100; i++) {
      const validMoves = []
      const row = Math.floor(empty / GRID_SIZE)
      const col = empty % GRID_SIZE
      if (row > 0) validMoves.push(empty - GRID_SIZE)
      if (row < GRID_SIZE - 1) validMoves.push(empty + GRID_SIZE)
      if (col > 0) validMoves.push(empty - 1)
      if (col < GRID_SIZE - 1) validMoves.push(empty + 1)
      
      const move = validMoves[Math.floor(Math.random() * validMoves.length)]
      const temp = initialTiles[empty]
      initialTiles[empty] = initialTiles[move]
      initialTiles[move] = temp
      empty = move
    }

    setTiles(initialTiles)
    setEmptyIdx(empty)
    setMoves(0)
    setWon(false)
  }

  const handleTileClick = (index: number) => {
    if (won || moves >= MAX_MOVES) return

    const row = Math.floor(index / GRID_SIZE)
    const col = index % GRID_SIZE
    const emptyRow = Math.floor(emptyIdx / GRID_SIZE)
    const emptyCol = emptyIdx % GRID_SIZE

    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1

    if (isAdjacent) {
      const newTiles = [...tiles]
      newTiles[emptyIdx] = newTiles[index]
      newTiles[index] = -1
      
      setTiles(newTiles)
      setEmptyIdx(index)
      const newMoves = moves + 1
      setMoves(newMoves)

      // Check win condition
      let isSolved = true
      for (let i = 0; i < newTiles.length - 1; i++) {
        if (newTiles[i] !== i) {
          isSolved = false
          break
        }
      }

      if (isSolved) {
        setWon(true)
        heal()
      } else if (newMoves >= MAX_MOVES) {
        takeDamage()
      }
    }
  }

  const handleGiveUp = () => {
    takeDamage()
    resetGame()
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl relative mt-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: theme?.primary }}>Decode Avatar</h3>
        <span className="text-xs uppercase tracking-widest" style={{ color: moves >= MAX_MOVES - 5 ? '#ef4444' : theme?.textMuted }}>
          Moves: {moves}/{MAX_MOVES}
        </span>
      </div>

      <AnimatePresence>
        {won && (
          <motion.div
            key="won"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-widest" style={{ color: theme?.primary }}>Restored!</h2>
            <button
              onClick={resetGame}
              className="mt-4 px-4 py-2 rounded-lg font-bold tracking-widest uppercase text-xs transition-transform hover:scale-105"
              style={{ backgroundColor: theme?.primary, color: theme?.background }}
            >
              Play Again
            </button>
          </motion.div>
        )}
        
        {moves >= MAX_MOVES && !won && (
          <motion.div
            key="failed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-widest text-red-500">Failed!</h2>
            <p className="text-[10px] text-white/60 uppercase tracking-widest mb-4">Out of Moves</p>
            <button
              onClick={resetGame}
              className="mt-2 px-4 py-2 rounded-lg font-bold tracking-widest uppercase text-xs transition-transform hover:scale-105"
              style={{ backgroundColor: theme?.primary, color: theme?.background }}
            >
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative aspect-square w-full bg-black/40 rounded-xl overflow-hidden border border-black/10 shadow-inner">
        {tiles.map((tile, idx) => {
          if (tile === -1) return null // Empty tile

          const row = Math.floor(idx / GRID_SIZE)
          const col = idx % GRID_SIZE
          
          const bgRow = Math.floor(tile / GRID_SIZE)
          const bgCol = tile % GRID_SIZE

          return (
            <motion.div
              key={tile}
              layout
              onClick={() => handleTileClick(idx)}
              className="absolute cursor-pointer border border-black/50"
              style={{
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                top: `${(row * 100) / GRID_SIZE}%`,
                left: `${(col * 100) / GRID_SIZE}%`,
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                backgroundPosition: `${(bgCol * 100) / (GRID_SIZE - 1)}% ${(bgRow * 100) / (GRID_SIZE - 1)}%`,
                boxShadow: won ? `0 0 20px ${theme?.glow}` : 'none'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              whileHover={{ scale: 0.95 }}
            />
          )
        })}
      </div>

      <div className="mt-4 flex justify-center gap-6 relative z-30">
        {!won && (
          <>
            <button 
              onClick={resetGame}
              className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              Restart
            </button>
            <button 
              onClick={handleGiveUp}
              className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-red-500 transition-colors"
            >
              Give Up (Costs 1 HP)
            </button>
          </>
        )}
      </div>
    </div>
  )
}
