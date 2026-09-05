"use client"

import { useRef, useState, ReactNode } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  onMouseEnter?: () => void
  href?: string
  style?: React.CSSProperties
}

export default function MagneticButton({ children, className = "", onClick, onMouseEnter, href, style }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Quick check for mobile without useEffect overhead for rendering
  if (typeof window !== 'undefined' && (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)) {
    if (!isMobile) setIsMobile(true)
  }

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const handleClick = () => {
    if (onClick) onClick()
  }

  const Wrapper = href ? motion.a : motion.button
  const props = href ? { href, target: "_blank", rel: "noreferrer" } : {}

  return (
    <Wrapper
      // @ts-expect-error dynamic element ref
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={() => {
        if (onMouseEnter) onMouseEnter()
      }}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Wrapper>
  )
}
