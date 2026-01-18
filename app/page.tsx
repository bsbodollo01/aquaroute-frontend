'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Droplet, BarChart3, MapPin } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      router.push(user.role === 'owner' ? '/owner' : '/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <div className="mb-6 flex justify-center">
            <div className="text-6xl text-primary">
              <Droplet className="w-24 h-24 fill-current" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            AquaDeliver
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-pretty">
            Your Trusted Water Container Delivery Service
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            Book water container deliveries with ease or manage your refilling shop business. Find nearby refilling stations and track orders in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth">
              <Button size="lg" className="text-lg h-12 px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="lg" variant="outline" className="text-lg h-12 px-8 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 my-16">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Droplet className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
              <p className="text-muted-foreground">
                Book water container deliveries in just a few clicks. Choose your quantity and delivery address.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <BarChart3 className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Owner Dashboard</h3>
              <p className="text-muted-foreground">
                Manage all orders, track deliveries, and view detailed analytics about your business.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <MapPin className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Shops</h3>
              <p className="text-muted-foreground">
                Discover nearby water refilling stations with ratings, hours, and directions.
              </p>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="mt-16 p-12 bg-card">
            <h2 className="text-4xl font-bold mb-12 text-balance">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  1
                </div>
                <h4 className="font-semibold mb-2">Sign Up</h4>
                <p className="text-muted-foreground text-sm">Create an account as a customer or shop owner</p>
              </div>
              <div>
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  2
                </div>
                <h4 className="font-semibold mb-2">Book or Manage</h4>
                <p className="text-muted-foreground text-sm">Book deliveries or manage your shop orders</p>
              </div>
              <div>
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  3
                </div>
                <h4 className="font-semibold mb-2">Track & Complete</h4>
                <p className="text-muted-foreground text-sm">Track orders and complete deliveries efficiently</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 text-center">
        <p className="text-muted-foreground">&copy; 2024 AquaDeliver. All rights reserved.</p>
      </footer>
    </div>
  )
}
