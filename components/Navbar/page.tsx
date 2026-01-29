import Link from "next/link";
import { Droplets, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Navbar() {
    return (
        <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
              <nav className="w-full px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Droplets className="size-6 text-white" />
                    </div>
                    <span className="text-2xl">AquaRoute</span>
                  </div>
                  <div className="hidden md:flex items-center gap-8">
                    <a href="#how-it-works" aria-disabled className="text-gray-700 hover:text-blue-600 transition-colors">
                      How It Works
                    </a>
                    <a href="#about" aria-disabled className="text-gray-700 hover:text-blue-600 transition-colors">
                      About
                    </a>
                    <a href="#contact" aria-disabled className="text-gray-700 hover:text-blue-600 transition-colors">
                      Contact
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href="/auth">
                      <Button variant="ghost" className="hidden md:inline-flex">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Order Now
                      </Button>
                    </Link>
                    
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="size-6" />
                    </Button>
                  </div>
                </div>
              </nav>
            </header>
    )
}