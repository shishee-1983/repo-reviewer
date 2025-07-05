"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"

export default function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-gray-400">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <LoginForm />
            
            <div className="mt-6 text-center space-y-2">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </button>
              
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Modal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        title="Reset Password"
      >
        <div className="space-y-4">
          <p className="text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-dark-800 border border-primary/30 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button className="w-full" variant="neon">
            Send Reset Link
          </Button>
        </div>
      </Modal>
    </div>
  )
}