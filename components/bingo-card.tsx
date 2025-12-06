"use client"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import ShineBorder from "@/components/magic-ui/shine-border"

interface BingoCardProps {
  numbers: number[][]
  markedCells: Set<string>
  onMarkCell: (cellKey: string) => void
  cardIndex: number
  cardToken: string
}

const BINGO_LETTERS = ["B", "I", "N", "G", "O"]

export default function BingoCard({ numbers, markedCells, onMarkCell, cardIndex, cardToken }: BingoCardProps) {
  const getCellKey = (row: number, col: number) => `${cardIndex}-${row}-${col}`

  const handleCellClick = (row: number, col: number) => {
    // Center cell is free
    if (row === 2 && col === 2) return
    onMarkCell(getCellKey(row, col))
  }

  const isCellMarked = (row: number, col: number) => {
    return markedCells.has(getCellKey(row, col))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: cardIndex * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <ShineBorder
        color="rgba(168, 85, 247, 0.6)"
        borderRadius={12}
        borderWidth={2}
        duration={5}
      >
        <Card className="border-0 bg-card/90 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-4">
          <h3 className="text-white font-bold text-lg text-center">Card {cardIndex + 1}</h3>
        </div>

      {/* BINGO Grid */}
      <div className="p-4">
        {/* Letter Headers */}
        <div className="grid grid-cols-5 gap-2 mb-2">
          {BINGO_LETTERS.map((letter) => (
            <div
              key={letter}
              className="text-center font-bold text-lg text-primary h-10 flex items-center justify-center"
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Number Grid */}
        <div className="grid grid-cols-5 gap-2">
          {numbers.map((row, rowIdx) =>
            row.map((number, colIdx) => {
              const isMarked = isCellMarked(rowIdx, colIdx)
              const isFree = rowIdx === 2 && colIdx === 2

              return (
                <motion.button
                  key={`${rowIdx}-${colIdx}`}
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                  disabled={isFree}
                  whileHover={!isFree ? { scale: 1.1, rotate: 5 } : {}}
                  whileTap={!isFree ? { scale: 0.95 } : {}}
                  className={`
                    aspect-square rounded-lg font-bold text-lg
                    transition-all duration-200
                    flex items-center justify-center
                    ${
                      isFree
                        ? "bg-gradient-to-br from-primary to-accent text-white cursor-default"
                        : isMarked
                          ? "bg-primary text-white shadow-lg shadow-primary/50"
                          : "bg-muted hover:bg-muted/80 text-foreground cursor-pointer border border-border"
                    }
                  `}
                >
                  {isFree ? "★" : number}
                </motion.button>
              )
            }),
          )}
        </div>
      </div>

          {/* Card Footer */}
          <div className="px-4 pb-4 text-center">
            <div className="text-xs text-muted-foreground mb-2">Click numbers to mark them</div>
            <div className="text-xs font-mono text-primary/80 break-all">Token: {cardToken}</div>
          </div>
        </Card>
      </ShineBorder>
    </motion.div>
  )
}
