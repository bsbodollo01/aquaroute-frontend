// utils/sampleOrders.ts
import { Order } from "./orderTypes";

export const sampleOrders: Order[] = [
  {
    id: "order_001",
    gallons: 5,
    address: "123 Main St, Cagayan de Oro",
    phone: "09171234567",
    createdAt: new Date().toISOString(),
    status: "pending",
    totalPrice: 20
  },
  {
    id: "order_002",
    gallons: 10,
    address: "456 Rizal Ave, Cagayan de Oro",
    phone: "09179876543",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: "confirmed",
    totalPrice: 20
  },
  {
    id: "order_003",
    gallons: 8,
    address: "789 Luna St, Cagayan de Oro",
    phone: "09221234567",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    status: "delivered",
    totalPrice: 20
  },
  {
    id: "order_004",
    gallons: 12,
    address: "321 Mabini St, Cagayan de Oro",
    phone: "09334567890",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: "pending",
    totalPrice: 20

  },
];