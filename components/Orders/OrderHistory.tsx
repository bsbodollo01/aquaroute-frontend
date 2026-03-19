import React from 'react'
import { Card } from '../ui/card'
import { Order } from '@/utils/orderTypes'
import { Clock, PackageOpen } from 'lucide-react';

interface OrderProps {
  orders: Order[],
}

const OrderHistory = ({ orders }: OrderProps) => {
  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        /* Empty State Card */
        <Card className="p-12 flex h-full flex-col items-center justify-center bg-white border-dashed border-2 rounded-2xl">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <PackageOpen className="text-slate-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No orders yet</h3>
          <p className="text-slate-500 text-center max-w-[250px] mt-1">
            Your order history will appear here once you make your first delivery.
          </p>
        </Card>
      ) : (
        /* Order List */
        orders.map((order) => (
          <Card key={order.id} className="p-6 bg-white border rounded-2xl shadow-sm">
            {/* Header: ID and Status */}
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  #{order.id || `ORD-${order.id.slice(0, 4)}`}
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                <Clock size={14} className="text-amber-600" />
                <span className="text-sm font-medium capitalize">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-base">Quantity:</span>
                <span className="font-semibold text-slate-900">{order.gallons} gallons</span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span className="text-base">Address:</span>
                <span className="font-semibold text-slate-900 text-right ml-4">
                  {order.address}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-600 text-base">Total:</span>
                <span className="text-xl font-bold text-blue-900">
                  ${order.totalPrice?.toFixed(2) || "150.00"}
                </span>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}

export default OrderHistory