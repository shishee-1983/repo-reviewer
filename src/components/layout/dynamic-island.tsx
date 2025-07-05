"use client"

import { motion } from "framer-motion"
import { BellIcon } from "@heroicons/react/24/outline"
import { Avatar } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"

export function DynamicIsland() {
  const { data: session } = useSession()

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="glass-dark rounded-full px-6 py-3 border border-primary/30 shadow-glow animate-float">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <BellIcon className="w-5 h-5 text-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse" />
          </div>
          
          <div className="w-px h-6 bg-primary/30" />
          
          <div className="flex items-center space-x-2">
            <Avatar
              src={session?.user?.image}
              fallback={session?.user?.name?.[0] || session?.user?.email?.[0]}
              status="online"
              className="w-8 h-8"
            />
            <span className="text-sm text-primary font-medium">
              {session?.user?.name || "User"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}