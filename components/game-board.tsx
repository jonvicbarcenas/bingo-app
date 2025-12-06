"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import BingoCard from "@/components/bingo-card"
import WinModal from "@/components/win-modal"
import Swal from "sweetalert2"

interface GameBoardProps {
  gameCode: string
  onExit: () => void
}

interface CardData {
  token: string
  numbers: number[][]
}

export default function GameBoard({ gameCode, onExit }: GameBoardProps) {
  const [cards, setCards] = useState<CardData[]>([])
  const [markedCells, setMarkedCells] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [winningCards, setWinningCards] = useState<Array<{token: string, index: number}>>([])
  const [error, setError] = useState("")

  // Fetch bingo card when component mounts
  useEffect(() => {
    fetchCard()
  }, [gameCode])

  const fetchCard = async () => {
    try {
      const response = await fetch(`/api/bingo/getcard?bcode=${gameCode}`)
      const data = await response.json()

      console.log("[v0] Card fetched:", data)

      if (data === 0 || !data.playcard_token) {
        setError("Invalid game code or no cards available")
        setLoading(false)
        return
      }

      setCards((prevCards) => [
        ...prevCards,
        {
          token: data.playcard_token,
          numbers: data.card,
        },
      ])
      setLoading(false)
      
      // Show success message when card is added (except for first card on load)
      if (cards.length > 0) {
        Swal.fire({
          icon: "success",
          title: "Card Added!",
          text: `You now have ${cards.length + 1} card${cards.length + 1 > 1 ? "s" : ""}`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          background: "rgba(30, 20, 60, 0.95)",
          color: "#e9d5ff",
          iconColor: "#10b981",
        })
      }
    } catch (err) {
      console.log("[v0] Fetch card error:", err)
      setError("Failed to fetch card from server")
      setLoading(false)
    }
  }

  const handleAddCard = async () => {
    await fetchCard()
  }

  const handleMarkCell = (cellKey: string) => {
    const newMarked = new Set(markedCells)
    if (newMarked.has(cellKey)) {
      newMarked.delete(cellKey)
    } else {
      newMarked.add(cellKey)
    }
    setMarkedCells(newMarked)
  }

  const handleCheckWin = async () => {
    try {
      // Show loading state
      Swal.fire({
        title: "Checking all cards...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
        background: "rgba(30, 20, 60, 0.95)",
        color: "#e9d5ff",
      })

      // Check all cards simultaneously
      const checkPromises = cards.map(async (card, index) => {
        const response = await fetch(`/api/bingo/checkwin?playcard_token=${card.token}`)
        const result = await response.json()
        console.log(`[v0] Win check for card ${index + 1}:`, result)
        return {
          token: card.token,
          index: index,
          isWinner: result.result === "1"
        }
      })

      const results = await Promise.all(checkPromises)
      const winners = results.filter(r => r.isWinner).map(r => ({ token: r.token, index: r.index }))

      Swal.close()

      if (winners.length > 0) {
        setWinningCards(winners)
      } else {
        // Show SweetAlert that auto-dismisses after 2 seconds
        Swal.fire({
          icon: "info",
          title: "Not yet!",
          text: "No winning cards yet! Keep playing.",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: "rgba(30, 20, 60, 0.95)",
          color: "#e9d5ff",
          iconColor: "#a78bfa",
        })
      }
    } catch (err) {
      console.log("[v0] Win check error:", err)
      Swal.close()
      // Show error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to check win status",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "rgba(30, 20, 60, 0.95)",
        color: "#e9d5ff",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-accent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading game...</p>
        </div>
      </div>
    )
  }

  if (error && cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 relative">
        <Card className="max-w-md w-full p-8 border-border text-center bg-card/90 backdrop-blur-xl shadow-2xl">
          <p className="text-destructive mb-6 text-lg">{error}</p>
          <Button onClick={onExit} className="w-full">
            Back to Lobby
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-1 text-balance">
              Game Code: <span className="text-primary">{gameCode}</span>
            </h1>
            <p className="text-muted-foreground">
              You are playing with {cards.length} card{cards.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="outline" onClick={onExit} className="gap-2 bg-transparent">
            Exit Game
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button onClick={handleAddCard} className="gap-2">
            + Add Card
          </Button>
          {cards.length > 0 && (
            <Button
              onClick={handleCheckWin}
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Check for Win
            </Button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        {cards.length === 0 ? (
          <Card className="p-12 text-center border-border bg-card/90 backdrop-blur-xl shadow-xl">
            <p className="text-muted-foreground mb-4">No cards loaded</p>
            <Button onClick={handleAddCard}>Load a Card</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <BingoCard
                key={card.token}
                numbers={card.numbers}
                markedCells={markedCells}
                onMarkCell={handleMarkCell}
                cardIndex={idx}
                cardToken={card.token}
              />
            ))}
          </div>
        )}
      </div>

      {/* Win Modal */}
      {winningCards.length > 0 && (
        <WinModal 
          winningCards={winningCards} 
          onClose={() => setWinningCards([])} 
          onPlayAgain={onExit} 
        />
      )}
    </div>
  )
}
