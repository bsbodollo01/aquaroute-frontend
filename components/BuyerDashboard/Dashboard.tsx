'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapPin, Phone, Clock } from 'lucide-react'
import Header from "@/components/SellerDashboard/Header"
import { createOrder, getOrders } from "@/services/order"
import { Order } from "@/utils/orderTypes"
import OrderHistory from "../Orders/OrderHistory"

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [gallons, setGallons] = useState<number>(5)
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth")
    }
  }, [user, router])

  if (!user) return null

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const newOrder = await createOrder(user.id, gallons)
      setOrders([newOrder, ...orders])
      setAddress('')
      setPhone('')
      setGallons(1)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders()
      setOrders(orders)
    }
    fetchOrders()
  }, [])

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
            <CardHeader className="border-b border-border/10">
              <CardTitle className="text-lg font-semibold">Book Water Container Delivery</CardTitle>
            </CardHeader>
            <CardContent className="">
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
                      className="w-full text-center bg-slate-100"
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
                      className="w-full text-center bg-slate-100"
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
                      className="w-full text-center bg-slate-100"
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
          <OrderHistory 
            orders={orders}
          />
        </div>
      </main>
    </div>
  )
}