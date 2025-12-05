import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import AnimatedGrid from "@/components/magic-ui/animated-grid"
import Particles from "@/components/magic-ui/particles"
import Spotlight from "@/components/magic-ui/spotlight"
import ShootingStars from "@/components/magic-ui/shooting-stars"
import AuroraBackground from "@/components/magic-ui/aurora-background"
import LightRays from "@/components/ui/light-rays"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BINGO Game - Play Online",
  description: "Play BINGO online with multiple cards and real-time win checking",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased min-h-screen`}>
        {/* Magic UI Components - Layered from back to front */}
        <AuroraBackground />
        <LightRays 
          className="fixed inset-0" 
          style={{ zIndex: 5 }}
          count={20}
          color="rgba(200, 140, 255, 1)"
          blur={20}
          speed={8}
          length="120vh"
        />
        <AnimatedGrid />
        <Particles />
        <Spotlight />
        <ShootingStars />
        
        {/* Cosmic Nebula Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/30 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-violet-500/25 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] bg-fuchsia-500/20 rounded-full mix-blend-screen filter blur-[110px] opacity-40 animate-blob animation-delay-4000" />
          <div className="absolute bottom-0 right-1/3 w-[450px] h-[450px] bg-indigo-500/25 rounded-full mix-blend-screen filter blur-[90px] opacity-45 animate-blob" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-400/15 rounded-full mix-blend-screen filter blur-[80px] opacity-35 animate-float animation-delay-2000" />
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
