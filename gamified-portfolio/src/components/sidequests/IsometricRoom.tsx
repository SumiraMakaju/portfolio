"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface IsometricRoomProps {
  onClose: () => void
}

const HOBBIES: Record<string, string> = {
  tv: "You turn on the vintage TV. A classic anime intro plays. You love analyzing storytelling and world-building in series and movies.",
  armchair: "You inspect the yarn basket. The rhythmic motion of crochet helps you unwind and brings your pixel-art ideas into the physical world.",
  desk: "You open the sketchbook. Graphite smudges and rough drafts fill the pages. Designing is not just work; it's how you express your imagination."
}

function DialogueBox({ text, onClose }: { text: string; onClose: () => void }) {
  const [displayed, setDisplayed] = useState("")
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        setTyping(false)
        clearInterval(interval)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [text])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-50 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation()
        if (typing) {
          setDisplayed(text)
          setTyping(false)
        } else {
          onClose()
        }
      }}
    >
      <div className="relative">
        <img
          src="/sidequests/dialoguebox.png"
          alt=""
          draggable={false}
          className="w-full h-auto"
          style={{ imageRendering: "pixelated" }}
        />
        <div className="absolute inset-0 flex items-start p-6 md:p-8 pb-10">
          <p
            className="text-black text-xs md:text-sm font-bold leading-relaxed"
            style={{ fontFamily: "monospace" }}
          >
            {displayed}
          </p>
        </div>
        {!typing && (
          <motion.img
            src="/sidequests/actionindicator.png"
            alt=""
            draggable={false}
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="absolute bottom-4 right-6 w-5 h-5"
            style={{ imageRendering: "pixelated" }}
          />
        )}
      </div>
    </motion.div>
  )
}

function HobbyObject({
  id,
  baseImage,
  hoverImage,
  style,
  onClick,
}: {
  id: string
  baseImage: string
  hoverImage?: string
  style: React.CSSProperties
  onClick: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="absolute cursor-pointer transition-transform duration-200"
      style={{
        ...style,
        transform: hovered ? "scale(1.08)" : "scale(1)",
        filter: hovered ? "drop-shadow(0 0 12px rgba(255,255,255,0.4))" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        onClick(id)
      }}
    >
      <img
        src={hovered && hoverImage ? hoverImage : baseImage}
        alt=""
        draggable={false}
        style={{ imageRendering: "pixelated", width: "100%", height: "100%" }}
      />
    </div>
  )
}

export default function IsometricRoom({ onClose }: IsometricRoomProps) {
  const [activeDialogue, setActiveDialogue] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [])

  const parallaxX = mousePos.x * -8
  const parallaxY = mousePos.y * -5

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#1a1a2e] flex items-center justify-center overflow-hidden"
    >
      <button
        onClick={onClose}
        className="absolute top-6 left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-[60] text-white cursor-pointer"
      >
        <X size={24} />
      </button>

      <div
        className="relative transition-transform duration-300 ease-out overflow-hidden"
        style={{
          width: "min(80vw, 700px)",
          aspectRatio: "1545 / 1776",
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        }}
      >
        <img
          src="/sidequests/wallleft.png"
          alt=""
          draggable={false}
          className="absolute"
          style={{
            imageRendering: "pixelated",
            width: "110%",
            top: "0%",
            left: "-5%",
          }}
        />
        <img
          src="/sidequests/wallright.png"
          alt=""
          draggable={false}
          className="absolute"
          style={{
            imageRendering: "pixelated",
            width: "110%",
            top: "0%",
            left: "-5%",
          }}
        />
        <img
          src="/sidequests/floor.png"
          alt=""
          draggable={false}
          className="absolute"
          style={{
            imageRendering: "pixelated",
            width: "100%",
            bottom: "0%",
            left: "0%",
          }}
        />

        <HobbyObject
          id="tv"
          baseImage="/sidequests/tvbase.png"
          hoverImage="/sidequests/tvhover1.png"
          style={{ width: "12%", top: "36%", left: "24%" }}
          onClick={setActiveDialogue}
        />
        <HobbyObject
          id="desk"
          baseImage="/sidequests/tablesketchbookclosed.png"
          hoverImage="/sidequests/tablesketchbookopen.png"
          style={{ width: "26%", top: "42%", right: "14%" }}
          onClick={setActiveDialogue}
        />
        <HobbyObject
          id="armchair"
          baseImage="/sidequests/armchair.png"
          style={{ width: "18%", top: "58%", left: "34%" }}
          onClick={setActiveDialogue}
        />
      </div>

      <AnimatePresence>
        {activeDialogue && (
          <DialogueBox
            key={activeDialogue}
            text={HOBBIES[activeDialogue]}
            onClose={() => setActiveDialogue(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
