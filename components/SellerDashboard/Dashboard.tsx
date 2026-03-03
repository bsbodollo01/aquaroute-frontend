'use client'

import { useAuth } from '@/lib/auth-context'
import { Truck, User, DollarSign, Droplets } from 'lucide-react'
import SellerStatsCards from '@/components/Cards/SellerStatsCards'
import Greetings from '@/components/Greetings/Greetings'
import Header from "@/components/SellerDashboard/Header"
import RevenueChart from '@/components/SellerDashboard/RevenueChart'
import DeliveryMap  from '@/components/SellerDashboard/DeliveryMap'
import SummaryCard from '@/components/SellerDashboard/SummaryCard'
import { sampleOrders } from '@/utils/sampleOrders'
import { Order } from "@/utils/orderTypes"
import { useState } from "react"

export default function Dashboard() {
  const { signOut } = useAuth()
  const [orders, setOrders] = useState<Order[]>(sampleOrders)

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o)
    setOrders(updated)
  }


  return (
    <div className="min-h-screen bg-slate-100">
        <Header
            logo='qwe'
            user='test'
            onLogout={signOut}
        />
        <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
          <Greetings/>
          <div className="grid md:grid-cols-4 gap-4">
              <SellerStatsCards
                  title="Orders Today"
                  value={120}
                  stats="Total listed"
                  icon={Droplets}
                  iconColor='text-blue-500'
                  iconBgColor='bg-blue-100'
              />

              <SellerStatsCards
                  title="Total Revenue"
                  value={120}
                  stats="Total listed"
                  icon={DollarSign}
                  iconColor='text-green-500'
                  iconBgColor='bg-green-100'
              />

              <SellerStatsCards
                  title="Active Deliveries"
                  value={120}
                  stats="Total listed"
                  icon={Truck}
                  iconColor='text-orange-500'
                  iconBgColor='bg-orange-100'
              />

              <SellerStatsCards
                  title="Total Customers"
                  value={120}
                  stats="Total listed"
                  icon={User}
                  iconColor='text-purple-500'
                  iconBgColor='bg-purple-100'
              />
            
          </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <SummaryCard orders={orders} onUpdateStatus={handleUpdateStatus}/>
          <DeliveryMap />
        </div>

       <div>
           <RevenueChart />
       </div>
      </main>
    </div>
  )
}