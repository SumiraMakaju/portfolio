"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"

interface LifeContextType {
  hp: number
  maxHp: number
  takeDamage: () => void
  heal: () => void
  reset: () => void
  xp: number
  level: number
  addXp: (amount: number) => void
  tradeXpForLife: (cost: number) => boolean
}

const LifeContext = createContext<LifeContextType>({
  hp: 3,
  maxHp: 3,
  takeDamage: () => {},
  heal: () => {},
  reset: () => {},
  xp: 0,
  level: 1,
  addXp: () => {},
  tradeXpForLife: () => false,
})

export function useLife() {
  return useContext(LifeContext)
}

export function LifeProvider({ children }: { children: ReactNode }) {
  const [hp, setHp] = useState(3)
  const maxHp = 3
  
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)

  const takeDamage = useCallback(() => {
    setHp((prev) => Math.max(0, prev - 1))
  }, [])

  const heal = useCallback(() => {
    setHp((prev) => Math.min(maxHp, prev + 1))
  }, [maxHp])

  const reset = useCallback(() => {
    setHp(maxHp)
  }, [maxHp])

  const addXp = useCallback((amount: number) => {
    setXp((prevXp) => {
      let newXp = prevXp + amount
      let levelsGained = 0
      while (newXp >= 100) {
        newXp -= 100
        levelsGained++
      }
      if (levelsGained > 0) {
        setLevel((l) => l + levelsGained)
      }
      return newXp
    })
  }, [])

  const tradeXpForLife = useCallback((cost: number) => {
    let success = false
    setXp((currentXp) => {
      let totalXp = (level - 1) * 100 + currentXp
      if (totalXp >= cost) {
        success = true
        totalXp -= cost
        
        const newLevel = Math.floor(totalXp / 100) + 1
        const newCurrentXp = totalXp % 100
        
        setLevel(newLevel)
        heal()
        return newCurrentXp
      }
      return currentXp
    })
    return success
  }, [level, heal])

  return (
    <LifeContext.Provider value={{ hp, maxHp, takeDamage, heal, reset, xp, level, addXp, tradeXpForLife }}>
      {children}
    </LifeContext.Provider>
  )
}
