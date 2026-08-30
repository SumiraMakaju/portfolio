"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CharacterId, Expression } from "@/lib/types"
import { characters, themes } from "@/lib/themes"

interface CharacterCardProps {
  characterId: CharacterId
  onSelect: (id: CharacterId) => void
  isSelected: boolean
  isOther: boolean
}

export default function CharacterCard({
  characterId,
  onSelect,
  isSelected,
  isOther,
}: CharacterCardProps) {
  const [expression, setExpression] = useState<Expression>("default")
  const [hovered, setHovered] = useState(false)
  const config = characters[characterId]
  const theme = themes[characterId]

  useEffect(() => {
    if (!hovered) {
      setExpression("default")
      return
    }
    const sequence: Expression[] = ["smile", "wink", "default"]
    let index = 0
    setExpression("smile")
    const interval = setInterval(() => {
      index = (index + 1) % sequence.length
      setExpression(sequence[index])
    }, 1000)
    return () => clearInterval(interval)
  }, [hovered])

  return (
    <motion.button
      className="relative flex flex-col items-center gap-5 p-8 rounded-2xl cursor-pointer outline-none"
      style={{
        backgroundColor: isSelected
          ? `${theme.surface}dd`
          : hovered
            ? `${theme.surface}bb`
            : "rgba(255,255,255,0.04)",
        border: `2px solid ${
          isSelected
            ? theme.primary
            : hovered
              ? `${theme.primary}80`
              : "rgba(255,255,255,0.06)"
        }`,
        boxShadow:
          isSelected || hovered
            ? `0 0 40px ${theme.glow}, 0 8px 32px rgba(0,0,0,0.3)`
            : "0 2px 12px rgba(0,0,0,0.15)",
        transition: "background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(characterId)}
      whileHover={{ y: -14, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      animate={{
        opacity: isOther ? 0 : 1,
        scale: isSelected ? 1.06 : 1,
        y: isOther ? 30 : 0,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={expression}
            src={`/characters/${characterId}/${expression}.png`}
            alt={`${config.name} ${expression}`}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            style={{
              animation: "float 5s ease-in-out infinite",
              filter: `drop-shadow(0 8px 28px ${theme.glow})`,
            }}
          />
        </AnimatePresence>
      </div>
      <div className="text-center">
        <h3
          className="text-xl font-semibold tracking-wide"
          style={{ color: hovered || isSelected ? theme.primary : "#e2e8f0" }}
        >
          {config.name}
        </h3>
        <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
          {config.subtitle}
        </p>
      </div>
    </motion.button>
  )
}
