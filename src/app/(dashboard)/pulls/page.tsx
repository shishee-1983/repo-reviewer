"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import {
  EyeIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from "@heroicons/react/24/outline"

const pullRequests = [
  {
    id: 1,
    number: 42,
    title: "Add new authentication system",
    author: "john-doe",
    status: "open",
    createdAt: "2 hours ago",
    comments: 3,
    additions: 156,
    deletions: 23
  },
  {
    id: 2,
    number: 41,
    title: "Fix responsive design issues",
    author: "jane-smith",
    status: "merged",
    createdAt: "1 day ago",
    comments: 8,
    additions: 45,
    deletions: 12
  },
  {
    id: 3,
    number: 40,
    title: "Update documentation",
    author: "bob-wilson",
    status: "closed",
    createdAt: "3 days ago",
    comments: 2,
    additions: 89,
    deletions: 5
  }
]

const mockDiff = `@@ -1,7 +1,7 @@
 import React from 'react';
-import { Button } from './Button';
+import { Button } from '@/components/ui/button';
 
 export function LoginForm() {
   return (
     <form>
-      <Button type="submit">Login</Button>
+      <Button type="submit" variant="primary">Login</Button>
     </form>
   );
 }`

export default function PullRequestsPage() {
  const [selectedPR, setSelectedPR] = useState<any>(null)
  const [showBulkModal, setShowBulkModal] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <ClockIcon className="w-4 h-4 text-yellow-400" />
      case "merged":
        return <CheckCircleIcon className="w-4 h-4 text-green-400" />
      case "closed":
        return <XCircleIcon className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-yellow-400 bg-yellow-400/10"
      case "merged":
        return "text-green-400 bg-green-400/10"
      case "closed":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-gray-400 bg-gray-400/10"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-primary neon-text">Pull Requests</h1>
          <p className="text-gray-400">Review and manage pull requests with AI assistance</p>
        </div>
        <Button variant="neon" onClick={() => setShowBulkModal(true)}>
          Bulk Actions
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PR List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Pull Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-primary/20">
                {pullRequests.map((pr) => (
                  <div
                    key={pr.id}
                    className={`p-4 hover:bg-primary/5 cursor-pointer transition-colors ${
                      selectedPR?.id === pr.id ? "bg-primary/10" : ""
                    }`}
                    onClick={() => setSelectedPR(pr)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(pr.status)}
                        <span className="font-medium text-primary">#{pr.number}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(pr.status)}`}>
                          {pr.status}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <h3 className="font-medium text-white mb-2">{pr.title}</h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>by {pr.author}</span>
                      <span>{pr.createdAt}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ChatBubbleLeftRightIcon className="w-3 h-3" />
                        <span>{pr.comments}</span>
                      </div>
                      <span className="text-green-400">+{pr.additions}</span>
                      <span className="text-red-400">-{pr.deletions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* PR Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {selectedPR ? (
            <>
              {/* Diff Viewer */}
              <Card>
                <CardHeader>
                  <CardTitle>Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="code-block p-4 text-sm overflow-x-auto">
                    <code>{mockDiff}</code>
                  </pre>
                </CardContent>
              </Card>

              {/* AI Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-secondary mb-2">Summary</h4>
                      <p className="text-sm text-gray-400">
                        This PR updates the import path for the Button component to use the new UI component structure. The change improves code organization and follows the established pattern.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-secondary mb-2">Suggestions</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Consider updating other components to use the same import pattern</li>
                        <li>• Add tests to verify the component still works correctly</li>
                        <li>• Update documentation to reflect the new import structure</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-secondary mb-2">Risk Assessment</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                        <span className="text-sm text-green-400">Low Risk</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-20">
                <div className="text-gray-400">
                  <EyeIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a pull request to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Bulk Actions Modal */}
      <Modal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        title="Bulk Actions"
      >
        <div className="space-y-4">
          <p className="text-gray-400">
            Post AI-generated comments and suggestions to GitHub for selected pull requests.
          </p>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-primary/30" />
              <span className="text-sm">PR #42: Add new authentication system</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-primary/30" />
              <span className="text-sm">PR #41: Fix responsive design issues</span>
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowBulkModal(false)}
            >
              Cancel
            </Button>
            <Button variant="neon" className="flex-1">
              Post to GitHub
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}