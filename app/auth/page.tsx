'use client'

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import { type UserRole } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { registerUser, loginUser } from '@/services/auth'
import { Lock, Mail, Eye, EyeOff } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('BUYER')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await registerUser({ email, password, role })
      router.push(role === 'SELLER' ? '/owner' : '/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const data = await loginUser(email, password)

      localStorage.setItem("auth_user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)

      router.push(
        data.user.role === "SELLER" ? "/owner" : "/dashboard"
      )

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-primary-foreground rounded-t-lg">
          <CardTitle className="text-foreground text-2xl">AquaRoute</CardTitle>
          <p className="text-foreground text-sm opacity-90">{mode === 'signup' ? "Login to your account" : "Sign up to your account"}</p>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'signin' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger className={mode === 'signin' ? "bg-blue-500" : ""} value="signin">Sign In</TabsTrigger>
              <TabsTrigger className={mode === 'signup' ? "bg-blue-500" : ""} value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <InputGroup
                  mode={mode}
                  email={email} setEmail={setEmail}
                  password={password} setPassword={setPassword}
                  role={role} setRole={setRole}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <InputGroup
                  mode={mode}
                  email={email} setEmail={setEmail}
                  password={password} setPassword={setPassword}
                  role={role} setRole={setRole}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo mode: Use any email and password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface InputGroupProps {
  mode: 'signin' | 'signup'
  email: string
  setEmail: (val: string) => void
  password: string
  setPassword: (val: string) => void
  role: UserRole
  setRole: (val: UserRole) => void
}


function InputGroup({
  mode,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  errors,
}: InputGroupProps & { errors?: { email?: string; password?: string } }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Email address
        </label>

        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            type="email"
            placeholder="mail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`pl-10 h-11 ${
              errors?.email ? "border-destructive" : ""
            }`}
            required
          />
        </div>

        {errors?.email && (
          <p className="text-destructive text-xs">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-slate-700">
            Password
          </label>

          {mode === "signin" && (
            <a
              href="#"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </a>
          )}
        </div>

        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`pl-10 h-11 pr-10 ${
              errors?.password ? "border-destructive" : ""
            }`}
            required
          />

          {/* Eye icon for show/hide */}
          {showPassword ? (
            <EyeOff
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {errors?.password && (
          <p className="text-destructive text-xs">{errors.password}</p>
        )}
      </div>

      {/* Account Type (Signup Only) */}
      {mode === "signup" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Account Type
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full h-11 px-3 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="BUYER">Customer</option>
            <option value="SELLER">Owner</option>
          </select>
        </div>
      )}
    </>
  )
}