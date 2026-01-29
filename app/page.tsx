'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Phone, Droplets } from 'lucide-react'
import { Droplet, BarChart3, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar/page'
import HowItWorksPage from '@/components/HowItWorks/page'
import AboutUsPage from '@/components/AboutUs/page'
import ContactPage from '@/components/Contact/page'

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
      <Navbar />
      <div className="max-w-full min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-7xl pt-10">
            <div className=" grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                  <Droplets className="size-4" />
                  <span className="text-sm">Premium Quality Water</span>
                </div>
                <h1 className="text-5xl lg:text-6xl text-left tracking-tight font-semibold text-secondary-foreground">
                  Clean water, delivered without the hassle.
                </h1>
                <p className="text-xl text-left text-gray-600 max-w-lg">
                  Find trusted water refilling stations near you, place your order in seconds, and get fresh, safe water delivered right to your doorstep—fast, easy, and reliable.
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
          <HowItWorksPage />

          {/* About Us */}
          <AboutUsPage />

          {/* Contact Section */}
          <ContactPage />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 text-center">
        <p className="text-muted-foreground">&copy; 2024 AquaDeliver. All rights reserved.</p>
      </footer>
    </div>
  )
}
