import { LogOut, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProfileDropdown } from "./ProfileDropdown";

interface NavbarProps {
    handleLogout: () => void;
    buyerName?: string;
}

export default function Navbar({ handleLogout, buyerName }: NavbarProps) {
    return (
        <header className="bg-primary text-primary-foreground shadow-md border-b border-border/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AquaDeliver</h1>
            <p className="text-sm opacity-90">Welcome, {buyerName || "buyer"}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/shops">
              <Button variant="secondary" size="sm" className="gap-2">
                <MapPin className="w-4 h-4" />
                Find Shops
              </Button>
            </Link>
            <ProfileDropdown user={{ name: buyerName || "Buyer", role: "buyer" }} />
          </div>
        </div>
      </header>
    )
}