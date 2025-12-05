"use client"

import { useEffect, useState } from "react"

export default function Spotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        width: "600px",
        height: "600px",
        left: mousePosition.x - 300,
        top: mousePosition.y - 300,
        background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
        transition: "left 0.1s, top 0.1s",
        zIndex: 3,
      }}
    />
  )
}
