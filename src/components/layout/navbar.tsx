"use client"

import { useState } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface NavbarProps {
  title: string
  sidebarCollapsed: boolean
}

export function Navbar({ title, sidebarCollapsed }: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <motion.div
      initial={false}
      animate={{ marginLeft: sidebarCollapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-20 left-0 right-0 h-16 glass-dark border-b border-primary/20 z-30"
    >
      <div className="flex items-center justify-between h-full px-6">
        <div>
          <h1 className="text-xl font-semibold text-primary neon-text">
            {title}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon
              className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors",
                searchFocused ? "text-primary" : "text-gray-400"
              )}
            />
            <Input
              placeholder="Search... (Press / to focus)"
              className="pl-10 w-64"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  )
}