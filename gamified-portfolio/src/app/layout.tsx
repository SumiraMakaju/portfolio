import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import { LifeProvider } from "@/contexts/LifeContext"
import LifeDisplay from "@/components/ui/LifeDisplay"
import GameOverScreen from "@/components/layout/GameOverScreen"
import XPTracker from "@/components/layout/XPTracker"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Sumira Makaju | Portfolio Quest",
  description: "Sumira Makaju - Interactive Gamified Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-body)" }}>
        <ThemeProvider>
          <LifeProvider>
            <XPTracker />
            <LifeDisplay />
            <GameOverScreen />
            {children}
          </LifeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
