import { Button } from "@/components/ui/button";
import { Droplets, Phone } from "lucide-react";
import Link from "next/link";

export default function HeroPage() {
    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-full">
                  <Droplets className="size-4" />
                  <span className="text-sm">Premium Quality Water</span>
                </div>
                <h1 className="text-5xl lg:text-6xl text-left tracking-tight font-semibold text-secondary-foreground">
                  Clean water, delivered without the hassle.
                </h1>
                <p className="text-xl text-left text-gray-600 max-w-lg">
                  Find trusted water refilling stations near you, place your order in seconds, and get fresh, safe water delivered right to your doorstep—fast, easy, and reliable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth">
                    <Button size="lg" className="bg-[var(--btn-primary)] text-white text-lg px-8 py-6">
                      Get Started
                    </Button>
                  </Link>

                  <Link href="/auth">
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                      <Phone className="mr-2 size-5" />
                      Sign in
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-8 pt-4">
                  <div>
                    <div className="text-3xl">937+</div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl">24/7</div>
                    <div className="text-gray-600">Support</div>
                  </div>
                  <div>
                    <div className="text-3xl">100%</div>
                    <div className="text-gray-600">Pure & Safe</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-tr from-blue-400/20 to-cyan-400/20 rounded-3xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1700497918461-c6bf827cad58?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Water delivery"
                  className="relative rounded-3xl shadow-2xl w-full object-cover h-125"
                />
              </div>
            </div>
        )
    }