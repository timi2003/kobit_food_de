"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"

interface User {
  _id: string
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
    if (token) {
      apiClient.setToken(token)
      // Verify token and get user data
      fetchUserProfile()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserProfile = async () => {
    try {
      // Use the apiClient.getProfile() method instead of direct request
      const response = await apiClient.getProfile()
      setUser(response.data.user)
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password })

      if (response.success && response.data) {
        apiClient.setToken(response.data.tokens.accessToken)
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken)
        setUser(response.data.user)
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

      if (response.success && response.data) {
        apiClient.setToken(response.data.tokens.accessToken)
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken)
        setUser(response.data.user)
      } else {
        throw new Error(response.message || "Registration failed")
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    apiClient.clearToken()
    setUser(null)
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
