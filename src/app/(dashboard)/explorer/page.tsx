"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import {
  FolderIcon,
  DocumentIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  PencilIcon
} from "@heroicons/react/24/outline"

// Mock file tree data
const fileTree = [
  {
    name: "src",
    type: "folder",
    expanded: true,
    children: [
      {
        name: "components",
        type: "folder",
        expanded: false,
        children: [
          { name: "Button.tsx", type: "file", language: "typescript" },
          { name: "Modal.tsx", type: "file", language: "typescript" },
        ]
      },
      {
        name: "utils",
        type: "folder",
        expanded: false,
        children: [
          { name: "helpers.ts", type: "file", language: "typescript" },
          { name: "api.ts", type: "file", language: "typescript" },
        ]
      },
      { name: "App.tsx", type: "file", language: "typescript" },
      { name: "index.tsx", type: "file", language: "typescript" },
    ]
  },
  { name: "package.json", type: "file", language: "json" },
  { name: "README.md", type: "file", language: "markdown" },
]

const mockCode = `import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

/**
 * A reusable button component with multiple variants
 * @param children - The content to display inside the button
 * @param variant - The visual style variant
 * @param onClick - Click handler function
 */
export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`

export default function ExplorerPage() {
  const [selectedFile, setSelectedFile] = useState("Button.tsx")
  const [showDocModal, setShowDocModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [githubUrl, setGithubUrl] = useState("")

  const FileTreeItem = ({ item, level = 0 }: { item: any, level?: number }) => {
    const [expanded, setExpanded] = useState(item.expanded || false)

    return (
      <div>
        <div
          className={`flex items-center py-1 px-2 hover:bg-primary/10 cursor-pointer rounded ${
            selectedFile === item.name ? "bg-primary/20 text-primary" : "text-gray-300"
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (item.type === "folder") {
              setExpanded(!expanded)
            } else {
              setSelectedFile(item.name)
            }
          }}
        >
          {item.type === "folder" && (
            expanded ? (
              <ChevronDownIcon className="w-4 h-4 mr-1" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 mr-1" />
            )
          )}
          {item.type === "folder" ? (
            <FolderIcon className="w-4 h-4 mr-2 text-yellow-400" />
          ) : (
            <DocumentIcon className="w-4 h-4 mr-2 text-blue-400" />
          )}
          <span className="text-sm">{item.name}</span>
        </div>
        {item.type === "folder" && expanded && item.children && (
          <div>
            {item.children.map((child: any, index: number) => (
              <FileTreeItem key={index} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-9rem)] flex gap-6">
      {/* File Tree */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-80"
      >
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Files</CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowImportModal(true)}
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Import
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto">
            <div className="p-4">
              {fileTree.map((item, index) => (
                <FileTreeItem key={index} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Code Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1"
      >
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{selectedFile}</CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDocModal(true)}
              >
                <PencilIcon className="w-4 h-4 mr-1" />
                Edit Doc
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-full">
            <div className="h-full overflow-auto">
              <pre className="code-block p-4 text-sm">
                <code>{mockCode}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Documentation Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-80"
      >
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary mb-2">Function: Button</h4>
                <p className="text-sm text-gray-400">
                  A reusable button component with multiple variants and hover effects.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary mb-2">Parameters</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li><code>children</code> - React node content</li>
                  <li><code>variant</code> - Style variant (primary/secondary)</li>
                  <li><code>onClick</code> - Click handler function</li>
                </ul>
              </div>

              <Button variant="neon" className="w-full">
                Generate Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Import Repository Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Repository"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              GitHub URL
            </label>
            <Input
              placeholder="https://github.com/username/repository"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowImportModal(false)}
            >
              Cancel
            </Button>
            <Button variant="neon" className="flex-1">
              Import
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Documentation Modal */}
      <Modal
        isOpen={showDocModal}
        onClose={() => setShowDocModal(false)}
        title="Edit Documentation"
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <textarea
            className="w-full h-40 p-3 bg-dark-800 border border-primary/30 rounded-md text-primary resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter documentation..."
            defaultValue="A reusable button component with multiple variants and hover effects."
          />
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowDocModal(false)}
            >
              Cancel
            </Button>
            <Button variant="neon" className="flex-1">
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}