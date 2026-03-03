import { NotificationType, Priority } from "@/utils/notificationTypes"


export const getNotificationColor = (isLatest = false) => {
  return isLatest ? "bg-white" : "bg-white"
}

export const getIconColor = (priority: Priority) => {
  switch (priority) {
    case "high": return "text-red-500"
    case "medium": return "text-yellow-500"
    default: return "text-gray-500"
  }
}

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "success": return "✔️"
    case "warning": return "⚠️"
    case "error": return "❌"
    default: return "ℹ️"
  }
}

export const getActionColor = (priority: Priority) => {
  switch (priority) {
    case "high": return "border-red-500 text-red-500"
    case "medium": return "border-yellow-500 text-yellow-500"
    default: return "border-gray-500 text-gray-500"
  }
}