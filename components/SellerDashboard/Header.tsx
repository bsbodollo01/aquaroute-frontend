'use client'

import { Droplets } from "lucide-react"
import NotificationDropdown from "@/components/Notification/Notification"
import ProfileMenuDropdown from "@/components/Profile/ProfileDropdown"
import { UserInfo } from "@/utils/userTypes"

interface HeaderProps {
  logo: string
  user: UserInfo | null
  onLogout?: () => void
}

const Header = ({ logo, user, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md border-b border-border/10">
      <div className="max-w-full mx-auto p-5 flex items-center justify-between">
        <div className="flex flex-row gap-5">
          <Droplets className="h-auto w-auto p-3 bg-primary text-white rounded-md" />
          <div className="flex flex-col">
            <h1 className="text-3xl text-secondary-foreground font-bold">Dashboard</h1>
            <p className="text-sm text-gray-400 opacity-90">
              Manage your orders - {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NotificationDropdown />
          <ProfileMenuDropdown userInfo={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  )
}

export default Header