"use client"

import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgba(1, 1, 15, 0.95)",
          color: "#00ffff",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: "8px",
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
        },
        success: {
          iconTheme: {
            primary: "#00ff88",
            secondary: "#01010f",
          },
        },
        error: {
          iconTheme: {
            primary: "#ff0055",
            secondary: "#01010f",
          },
        },
      }}
    />
  )
}