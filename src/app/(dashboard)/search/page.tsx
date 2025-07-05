"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  PaperAirplaneIcon,
  BookmarkIcon,
  DocumentArrowDownIcon,
  ClockIcon
} from "@heroicons/react/24/outline"

const chatHistory = [
  {
    id: 1,
    question: "How does authentication work in this codebase?",
    answer: "The authentication system uses NextAuth.js with JWT tokens. Users can sign in with email/password, and sessions are managed through secure HTTP-only cookies.",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    question: "What's the database schema structure?",
    answer: "The database uses Prisma ORM with PostgreSQL. Main models include User, Repository, File, Query, and PullRequest with proper relationships and constraints.",
    timestamp: "1 day ago"
  }
]

const quickQuestions = [
  "How do I add a new component?",
  "What's the API structure?",
  "How does the file parsing work?",
  "What are the main dependencies?"
]

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState(chatHistory)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      question: query,
      answer: "",
      timestamp: "Just now"
    }
    
    setMessages(prev => [userMessage, ...prev])
    setQuery("")

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id 
          ? { ...msg, answer: "This is a simulated AI response. In the real implementation, this would connect to your AI backend service to provide intelligent answers about your codebase." }
          : msg
      ))
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="h-[calc(100vh-9rem)] flex gap-6">
      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col"
      >
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ask about your codebase</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
                  <p>Ask me anything about your codebase!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="space-y-4">
                    {/* User Question */}
                    <div className="flex justify-end">
                      <div className="max-w-[80%] bg-primary/20 rounded-lg p-4 border border-primary/30">
                        <p className="text-primary">{message.question}</p>
                        <p className="text-xs text-gray-400 mt-2">{message.timestamp}</p>
                      </div>
                    </div>
                    
                    {/* AI Answer */}
                    {message.answer && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] glass-dark rounded-lg p-4 border border-secondary/30">
                          <p className="text-gray-200">{message.answer}</p>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs text-gray-400">{message.timestamp}</p>
                            <Button size="sm" variant="ghost">
                              <BookmarkIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] glass-dark rounded-lg p-4 border border-secondary/30">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <span className="text-gray-400 ml-2">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-primary/20">
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question about your codebase..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !query.trim()}>
                  <PaperAirplaneIcon className="w-4 h-4" />
                </Button>
              </form>
              
              {/* Quick Questions */}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(question)}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-80 space-y-6"
      >
        {/* History */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">History</CardTitle>
              <Button size="sm" variant="outline">
                <DocumentArrowDownIcon className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {chatHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-dark-800/50 hover:bg-dark-800 cursor-pointer transition-colors"
                >
                  <p className="text-sm text-gray-200 truncate mb-1">
                    {item.question}
                  </p>
                  <div className="flex items-center text-xs text-gray-400">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {item.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bookmarks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-400 py-8">
              <BookmarkIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No bookmarks yet</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}