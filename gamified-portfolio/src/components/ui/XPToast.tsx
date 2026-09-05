"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"

interface XPToastProps {
  toasts: { id: number; amount: number }[]
}

export default function XPToast({ toasts }: XPToastProps) {
  const { theme } = useTheme()
  if (!theme) return null

  return (
    <div className="fixed top-20 right-6 z-[70] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${theme.surface}ee, ${theme.surfaceAlt}ee)`,
              boxShadow: `0 0 20px ${theme.glow}`,
            }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.4 }}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
              style={{ backgroundColor: theme.primary, color: "#fff" }}
            >
              +
            </motion.div>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.primary }}>
              {toast.amount} XP
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
