"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface WinModalProps {
  onClose: () => void
  onPlayAgain: () => void
}

export default function WinModal({ onClose, onPlayAgain }: WinModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className={`transform transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <Card className="border-border bg-card max-w-md w-full p-8 relative overflow-hidden">
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 pointer-events-none"></div>

          <div className="relative z-10 text-center">
            {/* Celebration animation */}
            <div className="mb-6 text-6xl animate-bounce">🎉</div>

            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BINGO!
            </h2>

            <p className="text-muted-foreground mb-8 text-lg">You won! Congratulations on your winning card.</p>

            {/* Confetti-like dots */}
            <div className="flex justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                ></div>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                onClick={onPlayAgain}
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                Play Another Game
              </Button>
              <Button onClick={onClose} variant="outline" className="w-full py-6 bg-transparent">
                Close
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
