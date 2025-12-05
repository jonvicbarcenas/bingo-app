"use client"

import { useState } from "react"
import GameLobby from "@/components/game-lobby"
import GameBoard from "@/components/game-board"
import Aurora from "@/components/Aurora"

export default function BingoGame() {
  const [gameCode, setGameCode] = useState<string>("")
  const [isPlaying, setIsPlaying] = useState(false)

  const handleJoinGame = (code: string) => {
    setGameCode(code)
    setIsPlaying(true)
  }

  const handleExitGame = () => {
    setGameCode("")
    setIsPlaying(false)
  }

  return (
    <main className="min-h-screen text-foreground relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {!isPlaying ? (
        <GameLobby onJoinGame={handleJoinGame} />
      ) : (
        <GameBoard gameCode={gameCode} onExit={handleExitGame} />
      )}
    </main>
  )
}
