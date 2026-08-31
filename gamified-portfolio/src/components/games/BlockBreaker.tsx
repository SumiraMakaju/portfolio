"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/layout/ThemeProvider"
import { motion, AnimatePresence } from "framer-motion"
import { useLife } from "@/contexts/LifeContext"

export default function BlockBreaker({ onWin }: { onWin: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const { takeDamage } = useLife()
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [won, setWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20)

  // Timer logic
  useEffect(() => {
    if (!isPlaying || won || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, won, gameOver])

  useEffect(() => {
    if (timeLeft === 0 && !gameOver && !won && isPlaying) {
      setGameOver(true)
      takeDamage()
    }
  }, [timeLeft, gameOver, won, isPlaying, takeDamage])

  useEffect(() => {
    if (!isPlaying || won || gameOver) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Game variables
    const paddle = { height: 10, width: 75, x: canvas.width / 2 - 37.5 }
    let ball = { x: canvas.width / 2, y: canvas.height - 30, dx: 3, dy: -3, radius: 5 }
    
    // Controls
    let rightPressed = false
    let leftPressed = false

    // Bricks
    const brickRowCount = 3
    const brickColumnCount = 5
    const brickWidth = 50
    const brickHeight = 20
    const brickPadding = 10
    const brickOffsetTop = 30
    const brickOffsetLeft = 35
    
    const bricks: { x: number, y: number, status: number }[][] = []
    let hasBricks = false
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = []
      for (let r = 0; r < brickRowCount; r++) {
        // Randomize bricks, about 60% chance to appear
        const status = Math.random() > 0.4 ? 1 : 0
        if (status === 1) hasBricks = true
        bricks[c][r] = { x: 0, y: 0, status }
      }
    }
    // Guarantee at least one brick exists if RNG fails
    if (!hasBricks) bricks[0][0].status = 1

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true
    }
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false
    }

    document.addEventListener("keydown", keyDownHandler)
    document.addEventListener("keyup", keyUpHandler)

    const drawBall = () => {
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      ctx.fillStyle = theme?.text || "#fff"
      ctx.fill()
      ctx.closePath()
    }

    const drawPaddle = () => {
      ctx.beginPath()
      ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height)
      ctx.fillStyle = theme?.primary || "#0095DD"
      ctx.fill()
      ctx.closePath()
    }

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
            bricks[c][r].x = brickX
            bricks[c][r].y = brickY
            ctx.beginPath()
            ctx.rect(brickX, brickY, brickWidth, brickHeight)
            ctx.fillStyle = theme?.secondary || "#0095DD"
            ctx.fill()
            ctx.closePath()
          }
        }
      }
    }

    const collisionDetection = () => {
      let isWin = true
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r]
          if (b.status === 1) {
            isWin = false
            if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
              ball.dy = -ball.dy
              b.status = 0
            }
          }
        }
      }
      if (isWin) {
        setWon(true)
        onWin()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBricks()
      drawBall()
      drawPaddle()
      collisionDetection()

      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx
      }
      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy
      } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball.dy = -ball.dy
        } else {
          // Drop past paddle - just reset ball and waste time, no global Game Over
          ball.x = canvas.width / 2
          ball.y = canvas.height - 30
          ball.dx = 3
          ball.dy = -3
          paddle.x = canvas.width / 2 - paddle.width / 2
        }
      }

      if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 5
      } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 5
      }

      ball.x += ball.dx
      ball.y += ball.dy
      
      if (!won && !gameOver) {
        animationFrameId = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener("keydown", keyDownHandler)
      document.removeEventListener("keyup", keyUpHandler)
    }
  }, [isPlaying, won, gameOver, theme, onWin])

  const restartGame = () => {
    setTimeLeft(20)
    setGameOver(false)
    setWon(false)
    setIsPlaying(true)
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="mb-4 flex flex-col items-center w-full">
        <p className="text-xs uppercase tracking-widest text-black/60 font-bold mb-2">Break the firewall to reveal contact info.</p>
        
        {isPlaying && !won && !gameOver && (
          <div className="text-xl font-mono font-bold tracking-widest" style={{ color: timeLeft <= 10 ? '#ef4444' : theme?.primary }}>
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
        )}

        {!isPlaying && !won && !gameOver && (
          <button 
            onClick={() => setIsPlaying(true)}
            className="mt-4 px-6 py-2 bg-black/10 hover:bg-black/20 text-black/80 transition-colors rounded-lg text-sm font-bold uppercase tracking-widest"
          >
            Start Hack
          </button>
        )}
      </div>
      
      <div className="relative border rounded-xl overflow-hidden" style={{ borderColor: theme?.primary }}>
        
        {/* Local Game Over Overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              <h2 className="text-3xl font-bold uppercase tracking-widest text-red-500 mb-2">Time Up</h2>
              <p className="text-[10px] text-white/60 uppercase tracking-widest mb-6">Hack Failed</p>
              <button
                onClick={restartGame}
                className="px-6 py-2 rounded-lg font-bold tracking-widest uppercase transition-transform hover:scale-105 text-sm"
                style={{ backgroundColor: theme?.primary, color: theme?.background }}
              >
                Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Victory Overlay */}
        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              <h2 className="text-3xl font-bold uppercase tracking-widest mb-2" style={{ color: theme?.primary }}>Success</h2>
              <p className="text-[10px] text-white/60 uppercase tracking-widest mb-6">Firewall Breached</p>
            </motion.div>
          )}
        </AnimatePresence>

        <canvas 
          ref={canvasRef}
          width={360}
          height={240}
          className={`block bg-black/50 ${(!isPlaying && !won && !gameOver) ? 'opacity-50 blur-sm pointer-events-none' : ''}`}
        />
      </div>
    </div>
  )
}
