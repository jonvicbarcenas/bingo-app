"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  left: string
  top: string
  animationDuration: string
  animationDelay: string
}

export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const createStar = () => {
      const star: Star = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 50}%`,
        animationDuration: `${Math.random() * 1 + 0.5}s`,
        animationDelay: "0s",
      }

      setStars((prev) => [...prev, star])

      // Remove star after animation
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== star.id))
      }, 1500)
    }

    const interval = setInterval(createStar, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 4 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: star.left,
            top: star.top,
            animation: `shoot ${star.animationDuration} linear`,
            boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes shoot {
          0% {
            transform: translate(0, 0) rotate(-45deg);
            opacity: 1;
          }
          100% {
            transform: translate(200px, 200px) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
