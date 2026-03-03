'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import NotificationItem from "@/components/Notification/NotificationItem"
import { Notification } from "@/utils/notificationTypes"
import { mockNotifications } from "@/utils/sampleNotifications"

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-2">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 p-3 text-center">No notifications</p>
        ) : (
          notifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              isLatest={index === 0}
              onRemove={removeNotification}
              onView={(notif) => alert(`Viewing: ${notif.title}`)}
            />
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationDropdown