'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { apiFetch } from '@/lib/api'

export type UserRole = 'BUYER' | 'SELLER'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signUp: (email: string, password: string, role: UserRole) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage (for demo purposes)
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    const data = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.success) {
      // Backend handles cookie; frontend just sets state
      setUser({ id: email, email, role: "BUYER" }); // role can be optional
    } else {
      throw new Error("Login failed");
    }
  };

  const signUp = async (email: string, password: string, role: UserRole) => {
    const data = await apiFetch("/register", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });

    if (data.success) {
      setUser({ id: email, email, role });
    } else {
      throw new Error("Registration failed");
    }
  };

  const signOut = () => {
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
