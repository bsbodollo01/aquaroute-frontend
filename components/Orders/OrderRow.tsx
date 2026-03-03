import { Order } from "@/utils/orderTypes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface OrderRowProps {
  order: Order
  onUpdateStatus: (orderId: string, status: Order['status']) => void
}

export function OrderRow({ order, onUpdateStatus }: OrderRowProps) {
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  }

  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="py-3 px-2 font-semibold">{order.gallons}</td>
      <td className="py-3 px-2 text-muted-foreground">{order.address}</td>
      <td className="py-3 px-2">{order.phone}</td>
      <td className="py-3 px-2 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
      <td className="py-3 px-2">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClasses[order.status]}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </td>
      <td className="py-3 px-2 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded hover:bg-muted">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-36">
            <DropdownMenuItem onClick={() => onUpdateStatus(order.id, "pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(order.id, "confirmed")}>Confirmed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(order.id, "delivered")}>Delivered</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}