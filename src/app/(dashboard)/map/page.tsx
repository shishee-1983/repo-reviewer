"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  ArrowsPointingOutIcon
} from "@heroicons/react/24/outline"

export default function MapPage() {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  // Mock module data
  const modules = [
    { id: "auth", name: "Authentication", x: 100, y: 100, connections: ["user", "api"] },
    { id: "user", name: "User Management", x: 300, y: 150, connections: ["database"] },
    { id: "api", name: "API Layer", x: 200, y: 300, connections: ["database", "services"] },
    { id: "database", name: "Database", x: 400, y: 250, connections: [] },
    { id: "services", name: "Services", x: 100, y: 400, connections: ["utils"] },
    { id: "utils", name: "Utilities", x: 300, y: 450, connections: [] },
  ]

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  return (
    <div className="h-[calc(100vh-9rem)] flex gap-6">
      {/* Map Viewer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1"
      >
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Project Module Map</CardTitle>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={handleZoomOut}>
                  <MinusIcon className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-400 min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button size="sm" variant="outline" onClick={handleZoomIn}>
                  <PlusIcon className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleReset}>
                  <ArrowsPointingOutIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-full overflow-hidden">
            <div className="relative w-full h-full bg-dark-900/50">
              <svg
                className="w-full h-full"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                  transformOrigin: "center center"
                }}
              >
                {/* Connections */}
                {modules.map(module =>
                  module.connections.map(connectionId => {
                    const target = modules.find(m => m.id === connectionId)
                    if (!target) return null
                    
                    return (
                      <line
                        key={`${module.id}-${connectionId}`}
                        x1={module.x + 60}
                        y1={module.y + 30}
                        x2={target.x + 60}
                        y2={target.y + 30}
                        stroke="rgba(0, 255, 255, 0.3)"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )
                  })
                )}

                {/* Modules */}
                {modules.map(module => (
                  <g key={module.id}>
                    <rect
                      x={module.x}
                      y={module.y}
                      width="120"
                      height="60"
                      rx="8"
                      fill="rgba(1, 1, 15, 0.8)"
                      stroke="rgba(0, 255, 255, 0.5)"
                      strokeWidth="2"
                      className="hover:fill-primary/10 cursor-pointer transition-all"
                    />
                    <text
                      x={module.x + 60}
                      y={module.y + 35}
                      textAnchor="middle"
                      fill="#00ffff"
                      fontSize="12"
                      fontWeight="medium"
                    >
                      {module.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mini Map & Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-80 space-y-6"
      >
        {/* Mini Map */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Mini Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-dark-900/50 rounded-lg p-4 relative">
              <svg className="w-full h-full">
                {modules.map(module => (
                  <rect
                    key={module.id}
                    x={module.x * 0.3}
                    y={module.y * 0.3}
                    width="24"
                    height="12"
                    rx="2"
                    fill="rgba(0, 255, 255, 0.6)"
                  />
                ))}
                {/* Viewport indicator */}
                <rect
                  x="20"
                  y="20"
                  width="60"
                  height="40"
                  fill="none"
                  stroke="rgba(255, 0, 255, 0.8)"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Module Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Module Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary mb-2">Authentication</h4>
                <p className="text-sm text-gray-400 mb-2">
                  Handles user authentication and session management
                </p>
                <div className="text-xs text-gray-500">
                  <p>Files: 8</p>
                  <p>Dependencies: 2</p>
                  <p>Last modified: 2 hours ago</p>
                </div>
              </div>
              
              <div className="border-t border-primary/20 pt-4">
                <h5 className="font-medium text-secondary mb-2">Connected Modules</h5>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">→ User Management</div>
                  <div className="text-sm text-gray-400">→ API Layer</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-primary/50 border border-primary rounded" />
                <span className="text-sm text-gray-400">Module</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-0.5 bg-primary/50" />
                <span className="text-sm text-gray-400">Dependency</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 border-2 border-secondary border-dashed rounded" />
                <span className="text-sm text-gray-400">Current View</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}