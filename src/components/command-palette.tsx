"use client"

import { useState, useEffect } from "react"
import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HomeIcon,
  CodeBracketIcon,
  MagnifyingGlassIcon,
  MapIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"

const commands = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { id: "explorer", label: "Code Explorer", href: "/explorer", icon: CodeBracketIcon },
  { id: "search", label: "Search", href: "/search", icon: MagnifyingGlassIcon },
  { id: "map", label: "Project Map", href: "/map", icon: MapIcon },
  { id: "pulls", label: "Pull Requests", href: "/pulls", icon: DocumentTextIcon },
  { id: "settings", label: "Settings", href: "/settings", icon: Cog6ToothIcon },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-lg"
          >
            <Command className="cmdk-dialog rounded-lg shadow-glow">
              <Command.Input
                placeholder="Type a command or search..."
                className="w-full px-4 py-3 bg-transparent border-none outline-none text-primary placeholder-gray-400"
              />
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="px-4 py-2 text-gray-400 text-center">
                  No results found.
                </Command.Empty>
                {commands.map((command) => (
                  <Command.Item
                    key={command.id}
                    onSelect={() => handleSelect(command.href)}
                    className="flex items-center px-4 py-2 rounded-md cursor-pointer hover:bg-primary/10 text-gray-300 hover:text-primary transition-colors"
                  >
                    <command.icon className="w-4 h-4 mr-3" />
                    {command.label}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}