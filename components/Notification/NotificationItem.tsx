'use client'

import { Notification } from "@/utils/notificationTypes"
import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getNotificationColor, getIconColor, getNotificationIcon } from "@/helpers/helpers"

interface NotificationItemProps {
  notification: Notification
  onRemove: (id: string) => void
  onView: (notification: Notification) => void 
  isLatest?: boolean
}

const NotificationItem = ({ notification, onRemove, onView, isLatest }: NotificationItemProps) => (
  <div
    className={`flex items-start p-3 rounded cursor-pointer ${getNotificationColor(isLatest)} hover:bg-gray-100`}
    onClick={() => onView(notification)}
  >
    <div className={`flex-shrink-0 mt-0.5 text-lg ${getIconColor(notification.priority)}`}>
      {getNotificationIcon(notification.type)}
    </div>

    <div className="ml-3 flex-1">
      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
      <p className="text-sm text-gray-500 mt-1">{notification.description}</p>

      <div className="mt-2 flex items-center text-xs text-gray-500">
        <Clock className="h-3 w-3 mr-1" />
        <span>{notification.timestamp}</span>
      </div>
    </div>

    <Button
      variant="ghost"
      size="sm"
      className="ml-2 h-auto p-1 text-gray-400 hover:text-gray-600"
      onClick={(e) => {
        e.stopPropagation()
        onRemove(notification.id)
      }}
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
)

export default NotificationItem