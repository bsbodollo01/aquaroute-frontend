'use client'

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapPin, Phone, LogOut } from 'lucide-react'
import Header from "@/components/SellerDashboard/Header"

interface Order {
  id: string
  gallons: number
  address: string
  phone: string
  status: 'pending' | 'confirmed' | 'delivered'
  createdAt: string
}

export default function DashboardPage() {
  const { signOut } = useAuth()
  const [gallons, setGallons] = useState<number>(5)
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)

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

      const existingOrders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')!) : []
      localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]))

      setOrders([newOrder, ...orders])
      setAddress('')
      setPhone('')
      setGallons(5)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
          logo='qwe'
          user='test'
          onLogout={signOut}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Booking Form */}
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="border-b border-border/10 pb-4">
              <CardTitle className="text-lg font-semibold">Book Water Container Delivery</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleBooking} className="space-y-5">

                {/* Gallons */}
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Gallons</label>
                  <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" onClick={() => setGallons(Math.max(1, gallons - 1))}>−</Button>
                    <Input
                      type="number"
                      min={1}
                      value={gallons}
                      onChange={(e) => setGallons(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                    />
                    <Button type="button" variant="outline" onClick={() => setGallons(gallons + 1)}>+</Button>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-muted-foreground" size={20} />
                    <Input
                      placeholder="Enter your full address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <div className="flex items-center gap-2">
                    <Phone className="text-muted-foreground" size={20} />
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Book Delivery'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="border-b border-border/10 pb-4">
              <CardTitle className="text-lg font-semibold">Your Orders</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {orders.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">No orders yet. Start by booking a delivery!</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-4 bg-card border rounded-lg">
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
                      <p className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <MapPin size={16} /> {order.address}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone size={16} /> {order.phone}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </Card>
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