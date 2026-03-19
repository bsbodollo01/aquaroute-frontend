'use client'

import { 
  User, 
  Users,
  Settings
} from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { UserInfo } from "@/utils/userTypes"

interface ProfileMenuDropdownProps {
  userInfo: UserInfo | null,
  onLogout?: () => void
}

const ProfileMenuDropdown = ({ userInfo, onLogout }: ProfileMenuDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar-placeholder.png" alt="Maria Joyce" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center py-4">
          <Avatar className="h-12 w-12 mb-2">
            <AvatarImage src="/avatar-placeholder.png" />
            <AvatarFallback className="font-bold">{userInfo?.email.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900">{userInfo?.email.split('@')[0]}</p>
            <p className="text-xs text-slate-500">{userInfo?.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          <DropdownMenuItem className="rounded-lg py-3 cursor-pointer bg-slate-50">
            <User className="mr-3 h-4 w-4" />
            <span className="font-medium">Account</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="rounded-lg py-3 cursor-pointer">
            <Settings className="mr-3 h-4 w-4" />
            <span className="font-medium">Settings</span>
          </DropdownMenuItem>
        </div>

        {/* Logout Section */}
        <div className="mt-4 pt-2 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-center font-bold text-slate-900 text-red-500"
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenuDropdown