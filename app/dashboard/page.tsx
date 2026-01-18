'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { LogOut, MapPin } from 'lucide-react'

interface Order {
  id: string
  gallons: number
  address: string
  phone: string
  status: 'pending' | 'confirmed' | 'delivered'
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [gallons, setGallons] = useState<number>(5)
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)

  if (!user || user.role !== 'customer') {
    router.push('/auth')
    return null
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const newOrder: Order = {
        id: `order_${Date.now()}`,
        gallons,
        address,
        phone,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }

      // Store in localStorage for demo (will be replaced with Supabase)
      const existingOrders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')!) : []
      localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]))

      setOrders([newOrder, ...orders])
      setAddress('')
      setPhone('')
      setGallons(5)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    signOut()
    router.push('/auth')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md border-b border-border/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AquaDeliver</h1>
            <p className="text-sm opacity-90">Welcome, {user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/shops">
              <Button variant="secondary" size="sm" className="gap-2">
                <MapPin className="w-4 h-4" />
                Find Shops
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-2 text-primary-foreground hover:bg-primary/80" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Form */}
          <Card className="shadow-md">
            <CardHeader className="border-b border-border/10 pb-4">
              <CardTitle>Book Water Container Delivery</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Gallons</label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setGallons(Math.max(1, gallons - 1))}
                    >
                      −
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={gallons}
                      onChange={(e) => setGallons(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setGallons(gallons + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address</label>
                  <Input
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Book Delivery'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card className="shadow-md">
            <CardHeader className="border-b border-border/10 pb-4">
              <CardTitle>Your Orders</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No orders yet. Start by booking a delivery!</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{order.gallons} Gallon(s)</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{order.address}</p>
                      <p className="text-sm text-muted-foreground">{order.phone}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
