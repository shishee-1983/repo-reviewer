"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CodeBracketIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline"

const stats = [
  {
    title: "Repositories",
    value: "3",
    change: "+2 this week",
    icon: CodeBracketIcon,
    color: "text-primary"
  },
  {
    title: "Embeddings",
    value: "1,247",
    change: "+156 today",
    icon: ChartBarIcon,
    color: "text-secondary"
  },
  {
    title: "Queries",
    value: "89",
    change: "+12 today",
    icon: ChatBubbleLeftRightIcon,
    color: "text-accent"
  },
  {
    title: "Pull Requests",
    value: "7",
    change: "3 pending",
    icon: DocumentTextIcon,
    color: "text-yellow-400"
  }
]

const recentActivity = [
  {
    action: "Repository indexed",
    target: "my-awesome-project",
    time: "2 minutes ago",
    status: "completed"
  },
  {
    action: "Query processed",
    target: "How does authentication work?",
    time: "5 minutes ago",
    status: "completed"
  },
  {
    action: "PR analyzed",
    target: "#42: Add new feature",
    time: "1 hour ago",
    status: "completed"
  },
  {
    action: "Documentation generated",
    target: "utils/helpers.ts",
    time: "2 hours ago",
    status: "completed"
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-primary neon-text mb-2">
          Welcome back!
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your codebase today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={stat.title} className="hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className={`text-xs ${stat.color} flex items-center mt-1`}>
                    <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <PlusIcon className="w-4 h-4 mr-2" />
                Import Repository
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                Ask a Question
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Review Pull Requests
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-primary truncate">
                        {activity.target}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}