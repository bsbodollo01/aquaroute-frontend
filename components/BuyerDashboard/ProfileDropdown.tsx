"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, LogOut, Store } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
  user: {
    name: string
    role: "buyer" | "seller"
    avatar?: string
  }
}

export function ProfileDropdown({ user }: Props) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground capitalize">
            {user.role}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Common */}
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        {/* Buyer-only */}
        {user.role === "buyer" && (
          <DropdownMenuItem onClick={() => router.push("/orders")}>
            <Package className="mr-2 h-4 w-4" />
            My Orders
          </DropdownMenuItem>
        )}

        {/* Seller-only */}
        {user.role === "seller" && (
          <DropdownMenuItem onClick={() => router.push("/seller/dashboard")}>
            <Store className="mr-2 h-4 w-4" />
            Seller Dashboard
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={() => {
            // logout logic
            router.push("/auth")
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
