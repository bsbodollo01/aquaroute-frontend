'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, Droplet, Clock, CheckCircle2, Package } from 'lucide-react'

interface Order {
  id: string
  gallons: number
  address: string
  phone: string
  status: 'pending' | 'confirmed' | 'delivered'
  createdAt: string
}

export default function OwnerDashboard() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({ pending: 0, confirmed: 0, delivered: 0 })

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')!) : []
    setOrders(storedOrders)

    // Calculate stats
    const newStats = {
      pending: storedOrders.filter((o: Order) => o.status === 'pending').length,
      confirmed: storedOrders.filter((o: Order) => o.status === 'confirmed').length,
      delivered: storedOrders.filter((o: Order) => o.status === 'delivered').length,
    }
    setStats(newStats)
  }, [])

  if (!user || user.role !== 'owner') {
    router.push('/auth')
    return null
  }

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    )
    setOrders(updated)
    localStorage.setItem('orders', JSON.stringify(updated))

    // Update stats
    const newStats = {
      pending: updated.filter((o) => o.status === 'pending').length,
      confirmed: updated.filter((o) => o.status === 'confirmed').length,
      delivered: updated.filter((o) => o.status === 'delivered').length,
    }
    setStats(newStats)
  }

  const handleLogout = () => {
    signOut()
    router.push('/auth')
  }

  const totalGallons = orders.reduce((sum, o) => sum + o.gallons, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md border-b border-border/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AquaDeliver Owner</h1>
            <p className="text-sm opacity-90">Manage your orders - {user.email}</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 text-primary-foreground hover:bg-primary/80" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Orders</p>
                  <p className="text-3xl font-bold mt-2">{orders.length}</p>
                </div>
                <Package className="w-10 h-10 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending</p>
                  <p className="text-3xl font-bold mt-2">{stats.pending}</p>
                </div>
                <Clock className="w-10 h-10 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Confirmed</p>
                  <p className="text-3xl font-bold mt-2">{stats.confirmed}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Gallons</p>
                  <p className="text-3xl font-bold mt-2">{totalGallons}</p>
                </div>
                <Droplet className="w-10 h-10 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management */}
        <Card className="shadow-md">
          <CardHeader className="border-b border-border/10 pb-4">
            <CardTitle>Orders Management</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed ({stats.confirmed})</TabsTrigger>
                <TabsTrigger value="delivered">Delivered ({stats.delivered})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <OrderTable
                  orders={orders}
                  onUpdateStatus={handleUpdateStatus}
                />
              </TabsContent>

              <TabsContent value="pending">
                <OrderTable
                  orders={orders.filter((o) => o.status === 'pending')}
                  onUpdateStatus={handleUpdateStatus}
                />
              </TabsContent>

              <TabsContent value="confirmed">
                <OrderTable
                  orders={orders.filter((o) => o.status === 'confirmed')}
                  onUpdateStatus={handleUpdateStatus}
                />
              </TabsContent>

              <TabsContent value="delivered">
                <OrderTable
                  orders={orders.filter((o) => o.status === 'delivered')}
                  onUpdateStatus={handleUpdateStatus}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function OrderTable({
  orders,
  onUpdateStatus,
}: {
  orders: Order[]
  onUpdateStatus: (orderId: string, status: Order['status']) => void
}) {
  if (orders.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">No orders in this category</p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-2">Gallons</th>
            <th className="text-left py-3 px-2">Address</th>
            <th className="text-left py-3 px-2">Phone</th>
            <th className="text-left py-3 px-2">Date</th>
            <th className="text-left py-3 px-2">Status</th>
            <th className="text-left py-3 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-2 font-semibold">{order.gallons}</td>
              <td className="py-3 px-2 text-muted-foreground">{order.address}</td>
              <td className="py-3 px-2">{order.phone}</td>
              <td className="py-3 px-2 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="py-3 px-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-2">
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                  className="text-xs px-2 py-1 border rounded-md bg-background"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
