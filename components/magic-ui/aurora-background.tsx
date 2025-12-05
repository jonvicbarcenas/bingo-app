"use client"

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 50%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(192, 132, 252, 0.2) 0%, transparent 50%)
          `,
          animation: "aurora 15s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes aurora {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  )
}
