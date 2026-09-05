"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { ProjectConfig } from "@/lib/types"
import { useTheme } from "@/components/layout/ThemeProvider"

import QuestCard from "./QuestCard"

interface TarotDeckProps {
  projects: ProjectConfig[]
}

function TarotCard({ 
  project, 
  index, 
  total, 
  hoveredIndex, 
  setHoveredIndex,
  flippedIndex,
  setFlippedIndex,
  cardWidth,
  cardHeight,
  cardSpread
}: { 
  project: ProjectConfig, 
  index: number, 
  total: number,
  hoveredIndex: number | null,
  setHoveredIndex: (i: number | null) => void,
  flippedIndex: number | null,
  setFlippedIndex: (i: number | null) => void,
  cardWidth: number,
  cardHeight: number,
  cardSpread: number
}) {
  const { theme } = useTheme()
  
  const cardRef = useRef<HTMLDivElement>(null)
  const isFlipped = flippedIndex === index
  
  // Holographic Foil Tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // Arc Mathematics
  const center = (total - 1) / 2
  const offset = index - center
  const isHovered = hoveredIndex === index
  
  // Calculate dynamic positioning
  let targetX = offset * cardSpread
  let targetY = Math.abs(offset) * (cardSpread / 2)
  let targetRotateZ = offset * (cardSpread >= 60 ? 8 : 5)
  let targetZIndex = index
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  const flippedWidth = isMobile ? 300 : 360
  const flippedHeight = isMobile ? 450 : 540

  if (isFlipped) {
    targetX = 0
    targetY = isMobile ? -50 : -150
    targetRotateZ = 0
    targetZIndex = 100
  } else if (isHovered) {
    targetY = -40
    targetRotateZ = 0
    targetZIndex = 50
  } else if (hoveredIndex !== null) {
    const diff = index - hoveredIndex
    if (diff !== 0) {
      targetX += diff > 0 ? 20 : -20
    }
  }

  // Determine Arcana Pattern based on index
  const patternColors = [
    { border: theme?.primary, fill: theme?.secondary },
    { border: theme?.secondary, fill: theme?.accent },
    { border: theme?.accent, fill: theme?.primary }
  ]
  const pattern = patternColors[index % patternColors.length]

  const handleDragEnd = (event: any, info: any) => {
    // Snap and flip if pulled up far enough
    if (info.offset.y < -50 && !isFlipped) {
      setFlippedIndex(index)
      
      // Trigger explosion on reveal
      import('@/lib/particles').then(({ triggerExplosion }) => {
        // Calculate screen center for explosion
        const cx = window.innerWidth / 2
        const cy = window.innerHeight / 2
        if (theme) triggerExplosion(cx, cy, [theme.particleColor1, theme.particleColor2, "#ffffff"]);
      });
      
    } else {
      // Revert if not pulled far enough
      if (!isFlipped) setHoveredIndex(null)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      drag={!isFlipped ? "y" : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="absolute top-0 left-1/2 cursor-grab active:cursor-grabbing perspective-1000"
      style={{ 
        originX: 0.5, 
        originY: 1, 
        zIndex: targetZIndex 
      }}
      variants={{
        hidden: { y: 1000, opacity: 0, rotateZ: 0 },
        visible: { 
          width: isFlipped ? flippedWidth : cardWidth,
          height: isFlipped ? flippedHeight : cardHeight,
          marginLeft: isFlipped ? -(flippedWidth / 2) : -(cardWidth / 2),
          y: targetY, 
          opacity: 1, 
          rotateZ: targetRotateZ,
          x: targetX,
          scale: isFlipped ? 1.05 : (isHovered ? 1.1 : 1)
        }
      }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      onHoverStart={() => {
        if (!isFlipped) {
          setHoveredIndex(index)
        }
      }}
      onHoverEnd={() => {
        if (!isFlipped) setHoveredIndex(null)
      }}
      onClick={(e) => {
        if (!isFlipped) {
           setFlippedIndex(index)
           import('@/lib/particles').then(({ triggerExplosion }) => {
             const cx = window.innerWidth / 2
             const cy = window.innerHeight / 2
             if (theme) triggerExplosion(cx, cy, [theme.particleColor1, theme.particleColor2, "#ffffff"]);
           });
        } else {
           setFlippedIndex(null)
        }
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }} // Faster, snappier flip
      >
        {/* FRONT FACE (Quest Card) */}
        <div className="absolute inset-0 backface-hidden pointer-events-auto" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
          <QuestCard project={project} />
        </div>

        {/* BACK FACE (Arcane Design) */}
        <div 
          className="relative w-full h-full rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl border-2 backface-hidden flex items-center justify-center" 
          style={{ 
            backfaceVisibility: "hidden", 
            backgroundColor: `${pattern.border}10`, 
            borderColor: `${pattern.border}40` 
          }}
        >
          
          {/* Ambient Glow */}
          <motion.div 
            className="absolute inset-0 opacity-40"
            animate={{ opacity: isHovered ? 0.6 : 0.4 }}
            style={{ 
              background: `radial-gradient(circle at center, ${pattern.border} 0%, transparent 70%)` 
            }}
          />
          
          {/* Dynamic Arcana Pattern */}
          <div className="absolute inset-6 border-2 border-white/10 rounded-lg flex items-center justify-center">
            <div className="absolute inset-6 border-2 border-white/10 rounded-full flex items-center justify-center">
              <motion.div 
                className="w-20 h-20 rotate-45 border-4"
                style={{ borderColor: pattern.border }}
                animate={{ rotate: isHovered ? 225 : 45 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute w-20 h-20 border-4 rounded-full"
                style={{ borderColor: pattern.fill }}
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function TarotDeck({ projects }: TarotDeckProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 360, height: 540, spread: 60 })

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      
      if (screenWidth < 400) {
        setDimensions({ width: 120, height: 180, spread: 15 }) 
      } else if (screenWidth < 640) {
        setDimensions({ width: 140, height: 210, spread: 20 })
      } else if (screenWidth < 1024) {
        setDimensions({ width: 220, height: 330, spread: 35 })
      } else {
        setDimensions({ width: 320, height: 480, spread: 50 })
      }
    }
    handleResize()
    setMounted(true)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [projects.length])

  if (!mounted) return <div className="relative w-full min-h-[300px] sm:min-h-[500px] lg:min-h-[700px]" />

  return (
    <div className="relative w-full min-h-[300px] sm:min-h-[500px] lg:min-h-[700px] flex flex-col items-center pt-8 pb-4 sm:py-16 lg:py-24 overflow-visible">



      <motion.div 
        className="relative w-full max-w-5xl h-[200px] sm:h-[350px] lg:h-[500px] flex justify-center perspective-1200 z-50" 
        style={{ perspective: "1200px" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {projects.map((project, i) => (
          <TarotCard 
            key={project.name} 
            project={project} 
            index={i} 
            total={projects.length}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            flippedIndex={flippedIndex}
            setFlippedIndex={setFlippedIndex}
            cardWidth={dimensions.width}
            cardHeight={dimensions.height}
            cardSpread={dimensions.spread}
          />
        ))}
      </motion.div>
      
      {/* Dimiss Hint */}
      <AnimatePresence>
         {flippedIndex !== null && (
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
               className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 text-white/50 tracking-widest text-xs uppercase"
            >
               Click card to return to deck
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  )
}
