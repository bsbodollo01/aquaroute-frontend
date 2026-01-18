'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export type UserRole = 'customer' | 'owner'

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

  const signUp = async (email: string, password: string, role: UserRole) => {
    // This will integrate with Supabase when you add the integration
    const newUser: AuthUser = {
      id: `user_${Date.now()}`,
      email,
      role,
    }
    localStorage.setItem('auth_user', JSON.stringify(newUser))
    setUser(newUser)
  }

  const signIn = async (email: string, password: string) => {
    // This will integrate with Supabase when you add the integration
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.email === email) {
        setUser(user)
        return
      }
    }
    throw new Error('Invalid credentials')
  }

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
