"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import { X } from "lucide-react"

interface GamePanelProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

export default function GamePanel({ isOpen, onClose, children, title }: GamePanelProps) {
  const { theme } = useTheme()

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl border shadow-2xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] backdrop-blur-xl"
            style={{ 
              backgroundColor: 'rgba(250, 248, 235, 0.95)',
              borderColor: `${theme?.primary}40`, 
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: theme?.primary, borderColor: theme?.primary }}>
              <h2 className="text-lg font-bold tracking-widest uppercase text-white">
                {title}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
                title="Quit Game"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex items-center justify-center">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
