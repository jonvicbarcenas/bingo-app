"use client"

import React from "react"
import { motion } from "framer-motion"

interface ShineBorderProps {
  children: React.ReactNode
  className?: string
  color?: string
  borderRadius?: number
  borderWidth?: number
  duration?: number
}

export default function ShineBorder({
  children,
  className = "",
  color = "rgba(168, 85, 247, 0.5)",
  borderRadius = 12,
  borderWidth = 2,
  duration = 3,
}: ShineBorderProps) {
  return (
    <div className={`relative ${className}`} style={{ borderRadius: `${borderRadius}px` }}>
      {/* Animated shine border */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-50 blur-xl"
        style={{
          borderRadius: `${borderRadius}px`,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
