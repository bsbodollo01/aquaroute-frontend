'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// --- Types ---
export type UserRole = 'BUYER' | 'SELLER'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
}

// --- Constants ---
const STORAGE_USER_KEY = 'aquaroute_user'
const STORAGE_TOKEN_KEY = 'aquaroute_token'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // 1. Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_USER_KEY)
    const savedToken = localStorage.getItem(STORAGE_TOKEN_KEY)

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // 2. Redirection Helper
  const redirectByRole = (role: UserRole) => {
    return role === 'SELLER' ? '/owner' : '/dashboard'
  }

  // 3. Success Handler (Now handles storage + state + redirect)
  const handleAuthSuccess = (data: any) => {
    const authUser: AuthUser = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
    }

    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(authUser))
    if (data.token) {
      localStorage.setItem(STORAGE_TOKEN_KEY, data.token)
    }

    setUser(authUser)

    // Redirect immediately
    router.push(redirectByRole(authUser.role))
  }

  // 4. API Wrapper
  const apiFetch = async (endpoint: string, options: RequestInit) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    return await response.json()
  }

  // 5. Auth Actions
  const signIn = async (email: string, password: string) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })

    if (!data.success) throw new Error(data.message || "Login failed")
    handleAuthSuccess(data)
  }

  const signUp = async (email: string, password: string, role: UserRole) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    })

    if (!data.success) throw new Error(data.message || "Registration failed")
    handleAuthSuccess(data)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_USER_KEY)
    localStorage.removeItem(STORAGE_TOKEN_KEY)
    setUser(null)
    router.push('/auth')
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        signIn, 
        signUp, 
        logout 
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}