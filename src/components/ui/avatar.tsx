"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  className?: string
  status?: "online" | "offline" | "away"
}

export function Avatar({ src, alt, fallback, className, status }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)

  const statusColors = {
    online: "bg-green-500 shadow-neon-green",
    offline: "bg-gray-500",
    away: "bg-yellow-500"
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 shadow-neon">
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-dark-800 flex items-center justify-center text-primary font-semibold">
            {fallback || "?"}
          </div>
        )}
      </div>
      {status && (
        <div
          className={cn(
            "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-dark-950",
            statusColors[status]
          )}
        />
      )}
    </div>
  )
}