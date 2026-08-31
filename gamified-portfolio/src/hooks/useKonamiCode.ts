import { useEffect, useState } from "react"

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
]

export function useKonamiCode() {
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    let input: string[] = []

    const handleKeyDown = (e: KeyboardEvent) => {
      // Normalize 'b' and 'a' keys to lower case, keep Arrow keys as is
      const key = e.key.toLowerCase() === "b" ? "b" : e.key.toLowerCase() === "a" ? "a" : e.key
      
      input.push(key)
      
      if (input.length > KONAMI_CODE.length) {
        input.shift()
      }

      if (input.join(",") === KONAMI_CODE.join(",")) {
        setSuccess(true)
        input = [] // reset after success
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return success
}