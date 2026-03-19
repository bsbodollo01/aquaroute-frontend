'use client'

import React, { useState } from "react"
import { type UserRole, useAuth } from "@/lib/auth-context"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Mail, Eye, EyeOff } from "lucide-react"

export default function AuthPage() {
  const { signIn, signUp } = useAuth()
  
  // Form States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('BUYER')
  
  // UI States
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await signUp(email, password, role)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
  
    try {
      await signIn(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">AquaRoute</CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            {mode === 'signup' ? "Create a new account" : "Welcome back"}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(v) => {
            setMode(v as 'signin' | 'signup')
            setError('')       // Clear errors
            setEmail('')       // Clear email input
            setPassword('')    // Clear password input
            setRole('BUYER')   // Reset role
          }}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
              <InputGroup
                mode={mode}
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                role={role} setRole={setRole}
              />
              
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading 
                  ? (mode === 'signin' ? 'Signing in...' : 'Creating account...') 
                  : (mode === 'signin' ? 'Sign In' : 'Sign Up')
                }
              </Button>
            </form>
          </Tabs>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>By continuing, you agree to our Terms of Service.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// --- Sub-component for cleaner organization ---

interface InputGroupProps {
  mode: 'signin' | 'signup'
  email: string
  setEmail: (val: string) => void
  password: string
  setPassword: (val: string) => void
  role: UserRole
  setRole: (val: UserRole) => void
}

function InputGroup({ mode, email, setEmail, password, setPassword, role, setRole }: InputGroupProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Email address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-slate-700">Password</label>
          {mode === "signin" && (
            <button type="button" className="text-xs text-blue-600 hover:underline">
              Forgot password?
            </button>
          )}
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 h-11 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {mode === "signup" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Account Type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full h-11 px-3 border border-input rounded-md bg-background text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="BUYER">Customer</option>
            <option value="SELLER">Owner</option>
          </select>
        </div>
      )}
    </>
  )
}