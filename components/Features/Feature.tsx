import { Card } from "@/components/ui/card"
import { Droplet, BarChart3, MapPin } from "lucide-react"

export default function FeaturesPage() {
    return (
        <section id="features" className="py-20 "> 
            <div className="grid md:grid-cols-3 gap-6 my-16">
                <Card className="p-8 hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">
                    <Droplet className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
                    <p className="text-muted-foreground">
                    Book water container deliveries in just a few clicks. Choose your quantity and delivery address.
                    </p>
                </Card>
    
                <Card className="p-8 hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">
                    <BarChart3 className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Owner Dashboard</h3>
                    <p className="text-muted-foreground">
                    Manage all orders, track deliveries, and view detailed analytics about your business.
                    </p>
                </Card>
    
                <Card className="p-8 hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">
                    <MapPin className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Find Shops</h3>
                    <p className="text-muted-foreground">
                    Discover nearby water refilling stations with ratings, hours, and directions.
                    </p>
                </Card>
            </div>
        </section> 
    )
}