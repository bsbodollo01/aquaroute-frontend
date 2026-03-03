import { Notification } from "@/utils/notificationTypes"

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Order Received",
    description: "Order #1234 has been placed.",
    type: "info",
    priority: "high",
    timestamp: "2m ago",
    actions: [{ label: "View", onClick: () => alert("View clicked") }],
  },
  {
    id: "2",
    title: "Payment Completed",
    description: "Payment for order #1233 was successful.",
    type: "success",
    priority: "medium",
    timestamp: "10m ago",
  },
]
