import { Card } from "@/components/ui/card"

export default function HowItWorksPage() {
    return (
        <section id="how-it-works" className="py-20 bg-gray-50">
            <Card className="p-12 bg-card">
                <h2 className="text-4xl font-bold mb-12 text-balance">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    1
                    </div>
                    <h4 className="font-semibold mb-2">Sign Up</h4>
                    <p className="text-muted-foreground text-sm">Create an account as a customer or shop owner</p>
                </div>
                <div>
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    2
                    </div>
                    <h4 className="font-semibold mb-2">Book or Manage</h4>
                    <p className="text-muted-foreground text-sm">Book deliveries or manage your shop orders</p>
                </div>
                <div>
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    3
                    </div>
                    <h4 className="font-semibold mb-2">Track & Complete</h4>
                    <p className="text-muted-foreground text-sm">Track orders and complete deliveries efficiently</p>
                </div>
                </div>
            </Card>
        </section>
    )
}