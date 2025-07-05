"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import {
  KeyIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon
} from "@heroicons/react/24/outline"

export default function SettingsPage() {
  const [autoRetrain, setAutoRetrain] = useState(true)
  const [similarityThreshold, setSimilarityThreshold] = useState(0.8)
  const [showApiModal, setShowApiModal] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-primary neon-text mb-2">Settings</h1>
        <p className="text-gray-400">Configure your AI codebase explorer</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cog6ToothIcon className="w-5 h-5 mr-2" />
                AI Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-primary">
                    Auto-retrain Weekly
                  </label>
                  <button
                    onClick={() => setAutoRetrain(!autoRetrain)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoRetrain ? "bg-primary" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoRetrain ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  Automatically retrain the AI model with new code changes
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-3">
                  Similarity Threshold: {similarityThreshold}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={similarityThreshold}
                  onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Less Similar</span>
                  <span>More Similar</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowApiModal(true)}
              >
                <KeyIcon className="w-4 h-4 mr-2" />
                API Credentials
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellIcon className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-primary capitalize">
                    {key === "weekly" ? "Weekly Reports" : `${key} Notifications`}
                  </label>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? "bg-primary" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage & Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Usage Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">API Calls This Month</span>
                    <span className="text-lg font-semibold text-primary">2,847</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "68%" }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">68% of monthly limit</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Storage Used</span>
                    <span className="text-lg font-semibold text-secondary">1.2 GB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: "24%" }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">24% of 5GB limit</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Embeddings Generated</span>
                    <span className="text-lg font-semibold text-accent">15,432</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "89%" }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">89% efficiency rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  defaultValue="user@example.com"
                  disabled
                  className="bg-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  defaultValue="John Doe"
                />
              </div>

              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* API Credentials Modal */}
      <Modal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        title="API Credentials"
        className="max-w-lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              OpenAI API Key
            </label>
            <Input
              type="password"
              placeholder="sk-..."
              className="font-mono"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              GitHub Token
            </label>
            <Input
              type="password"
              placeholder="ghp_..."
              className="font-mono"
            />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-xs text-yellow-400">
              <strong>Note:</strong> API keys are encrypted and stored securely. They are only used for AI processing and GitHub integration.
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowApiModal(false)}
            >
              Cancel
            </Button>
            <Button variant="neon" className="flex-1">
              Save Credentials
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}