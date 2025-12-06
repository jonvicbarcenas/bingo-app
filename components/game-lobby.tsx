"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Swal from "sweetalert2"
import { motion } from "framer-motion"
import ShineBorder from "@/components/magic-ui/shine-border"

interface GameLobbyProps {
  onJoinGame: (code: string) => void
}

export default function GameLobby({ onJoinGame }: GameLobbyProps) {
  const [gameCode, setGameCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleJoin = async () => {
    if (!gameCode.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Code",
        text: "Please enter a game code",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "rgba(30, 20, 60, 0.95)",
        color: "#e9d5ff",
        iconColor: "#f59e0b",
      })
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/bingo/dashboard?bcode=${gameCode}`)
      const data = await response.json()

      console.log("[v0] Join response:", data)

      if (!response.ok || !data || data.error || !data.valid) {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Invalid Code",
          text: "Invalid game code or game not found",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
          background: "rgba(30, 20, 60, 0.95)",
          color: "#e9d5ff",
        })
        return
      }

      onJoinGame(gameCode)
    } catch (err) {
      console.log("[v0] Join error:", err)
      setLoading(false)
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Failed to connect to game server",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "rgba(30, 20, 60, 0.95)",
        color: "#e9d5ff",
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJoin()
    }
  }

  const handleCreateNewGame = async () => {
    setLoading(true)
    setError("")

    try {
      Swal.fire({
        title: "Creating new game...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
        background: "rgba(30, 20, 60, 0.95)",
        color: "#e9d5ff",
      })

      const response = await fetch("/api/bingo/newgame")
      const data = await response.json()

      console.log("[v0] Create game response:", data)

      if (!response.ok || !data.bcode) {
        setLoading(false)
        Swal.close()
        Swal.fire({
          icon: "error",
          title: "Creation Failed",
          text: data.error || "Failed to create new game",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
          background: "rgba(30, 20, 60, 0.95)",
          color: "#e9d5ff",
        })
        return
      }

      // Set the game code and show success
      setGameCode(data.bcode)
      Swal.close()
      
      Swal.fire({
        icon: "success",
        title: "Game Created!",
        html: `Your game code is: <strong class="text-primary text-xl">${data.bcode}</strong>`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "rgba(30, 20, 60, 0.95)",
        color: "#e9d5ff",
        iconColor: "#10b981",
      })

      // Automatically join the game after a short delay
      setTimeout(() => {
        onJoinGame(data.bcode)
      }, 2000)
    } catch (err) {
      console.log("[v0] Create game error:", err)
      setLoading(false)
      Swal.close()
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Failed to connect to game server",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "rgba(30, 20, 60, 0.95)",
        color: "#e9d5ff",
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 relative">
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50">
              <span className="text-3xl font-bold text-white">B</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-balance mb-2"
          >
            BINGO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            Join a game and play to win
          </motion.p>
        </motion.div>

        {/* Game Code Input Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ShineBorder
            color="rgba(168, 85, 247, 0.8)"
            borderRadius={16}
            borderWidth={2}
            duration={4}
          >
            <Card className="border-0 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
              <div className="space-y-4">
            <div>
              <label htmlFor="gameCode" className="block text-sm font-medium mb-3">
                Game Code
              </label>
              <Input
                id="gameCode"
                type="text"
                placeholder="Enter your game code"
                value={gameCode}
                onChange={(e) => {
                  setGameCode(e.target.value.toUpperCase())
                }}
                onKeyPress={handleKeyPress}
                className="text-lg py-6 font-mono tracking-widest text-center"
                disabled={loading}
              />
            </div>

            <Button
              onClick={handleJoin}
              disabled={loading}
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
            >
              {loading ? "Connecting..." : "Join Game"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              onClick={handleCreateNewGame}
              disabled={loading}
              variant="outline"
              className="w-full py-6 text-lg font-semibold bg-transparent hover:bg-primary/10 transition-all"
            >
              {loading ? "Creating..." : "Create New Game"}
            </Button>
              </div>
            </Card>
          </ShineBorder>
        </motion.div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { icon: "🎯", label: "Multiple Cards" },
            { icon: "⚡", label: "Real-time" },
            { icon: "✨", label: "Instant Wins" },
          ].map((feature) => (
            <div key={feature.label} className="text-center">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <p className="text-xs text-muted-foreground">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
