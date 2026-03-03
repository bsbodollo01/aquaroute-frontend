export type NotificationType = "info" | "success" | "warning" | "error"
export type Priority = "low" | "medium" | "high"

export interface NotificationAction {
  label: string
  onClick: () => void
}

export interface Notification {
  id: string
  title: string
  description: string
  type: NotificationType
  priority: Priority
  timestamp: string
  actions?: NotificationAction[]
}