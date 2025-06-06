"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"

interface User {
  _id: string
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  phoneNumber?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("accessToken")
    const savedUser = localStorage.getItem("user")

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        apiClient.setToken(token)
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        // Clear invalid data
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
      }
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password })

      if (response.success) {
        // Handle different response structures
        const tokens = response.data?.tokens || response.tokens
        const userData = response.data?.user || response.user

        if (tokens?.accessToken) {
          apiClient.setToken(tokens.accessToken)

          if (tokens.refreshToken) {
            localStorage.setItem("refreshToken", tokens.refreshToken)
          }
        }

        if (userData) {
          setUser(userData)
          localStorage.setItem("user", JSON.stringify(userData))
        }
      } else {
        throw new Error(response.message || "Login failed")
      }
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await apiClient.register(userData)

      if (response.success) {
        // Handle different response structures
        const tokens = response.data?.tokens || response.tokens
        const user = response.data?.user || response.user

        if (tokens?.accessToken) {
          apiClient.setToken(tokens.accessToken)

          if (tokens.refreshToken) {
            localStorage.setItem("refreshToken", tokens.refreshToken)
          }
        }

        if (user) {
          setUser(user)
          localStorage.setItem("user", JSON.stringify(user))
        }
      } else {
        throw new Error(response.message || "Registration failed")
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    // Clear API client token
    apiClient.clearToken()

    // Clear user state
    setUser(null)

    // Clear any additional localStorage items
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("cart") // Optional: clear cart on logout
    }

    // Redirect to login page
    window.location.href = "/login"
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
