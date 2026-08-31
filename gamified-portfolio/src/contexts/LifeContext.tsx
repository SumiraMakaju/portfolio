"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"

interface LifeContextType {
  hp: number
  maxHp: number
  takeDamage: () => void
  heal: () => void
  reset: () => void
}

const LifeContext = createContext<LifeContextType>({
  hp: 3,
  maxHp: 3,
  takeDamage: () => {},
  heal: () => {},
  reset: () => {},
})

export function useLife() {
  return useContext(LifeContext)
}

export function LifeProvider({ children }: { children: ReactNode }) {
  const [hp, setHp] = useState(3)
  const maxHp = 3

  const takeDamage = useCallback(() => {
    setHp((prev) => Math.max(0, prev - 1))
  }, [])

  const heal = useCallback(() => {
    setHp((prev) => Math.min(maxHp, prev + 1))
  }, [maxHp])

  const reset = useCallback(() => {
    setHp(maxHp)
  }, [maxHp])

  return (
    <LifeContext.Provider value={{ hp, maxHp, takeDamage, heal, reset }}>
      {children}
    </LifeContext.Provider>
  )
}
