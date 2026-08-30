"use client"

import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  style?: React.CSSProperties
}

export default function TypewriterText({
  text,
  className = "",
  delay = 0,
  speed = 0.04,
  style,
}: TypewriterTextProps) {
  const letters = Array.from(text)

  return (
    <motion.span
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: delay + i * speed,
                duration: 0.06,
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}