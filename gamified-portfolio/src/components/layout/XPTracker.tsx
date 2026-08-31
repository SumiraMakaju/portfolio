"use client"

import { useEffect } from "react"
import { useLife } from "@/contexts/LifeContext"

export default function XPTracker() {
  const { addXp } = useLife()

  useEffect(() => {
    // 1. Button / Link Click tracking
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Traverse up to find if clicked inside a button or anchor
      const clickable = target.closest('button') || target.closest('a')
      if (clickable) {
        addXp(1) // +1 XP per button/link click
      }
    }
    window.addEventListener("click", handleClick)

    // 2. Scroll to end tracking
    let hasAwardedScrollXp = false
    const handleScroll = () => {
      if (hasAwardedScrollXp) return
      
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      
      // If scrolled within 100px of bottom
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        hasAwardedScrollXp = true
        addXp(50) // +50 XP for reaching the end
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [addXp])

  return null // This is a logic-only component
}
