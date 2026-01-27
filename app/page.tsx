'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Phone, Droplets, Menu } from 'lucide-react'
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
      <div className="max-w-full min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
              <nav className="w-full px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Droplets className="size-6 text-white" />
                    </div>
                    <span className="text-2xl">AquaRoute</span>
                  </div>
                  <div className="hidden md:flex items-center gap-8">
                    <a href="#products" aria-disabled className="text-gray-700 hover:text-blue-600 transition-colors">
                      Products
                    </a>
                    <a href="#how-it-works" aria-disabled className="text-gray-700 hover:text-blue-600 transition-colors">
                      How It Works
                    </a>
                    <a href="#about" aria-disabled className="text-gray-700 hover:text-blue-600 transition-colors">
                      About
                    </a>
                    <a href="#contact" aria-disabled className="text-gray-700 hover:text-blue-600 transition-colors">
                      Contact
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href="/auth">
                      <Button variant="ghost" className="hidden md:inline-flex">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Order Now
                      </Button>
                    </Link>
                    
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="size-6" />
                    </Button>
                  </div>
                </div>
              </nav>
            </header>
        <div className="max-w-7xl pt-10">
            <div className=" grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                  <Droplets className="size-4" />
                  <span className="text-sm">Premium Quality Water</span>
                </div>
                <h1 className="text-5xl lg:text-6xl text-left tracking-tight font-semibold text-secondary-foreground">
                  Pure Water Delivered to Your Door
                </h1>
                <p className="text-xl text-left text-gray-600 max-w-lg">
                  Fresh, purified water delivered straight to your home or office. 
                  Stay hydrated with our convenient subscription service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                      Get Started
                    </Button>
                  </Link>

                  <Link href="/auth">
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                      <Phone className="mr-2 size-5" />
                      Sign in
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-8 pt-4">
                  <div>
                    <div className="text-3xl">937+</div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl">24/7</div>
                    <div className="text-gray-600">Support</div>
                  </div>
                  <div>
                    <div className="text-3xl">100%</div>
                    <div className="text-gray-600">Pure & Safe</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-tr from-blue-400/20 to-cyan-400/20 rounded-3xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1700497918461-c6bf827cad58?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Water delivery"
                  className="relative rounded-3xl shadow-2xl w-full object-cover h-125"
                />
              </div>
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
