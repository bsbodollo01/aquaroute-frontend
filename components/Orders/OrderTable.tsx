import { Order } from "@/utils/orderTypes"
import { OrderRow } from "./OrderRow"

interface OrderTableProps {
  orders: Order[]
  onUpdateStatus: (orderId: string, status: Order['status']) => void
}

export function OrderTable({ orders, onUpdateStatus }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No orders in this category
      </p>
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
          {orders.map(order => (
            <OrderRow key={order.id} order={order} onUpdateStatus={onUpdateStatus} />
          ))}
        </tbody>
      </table>
    </div>
  )
}