import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <section id="contact">
         <AnimatedSection className="py-16">
            <div className="w-full px-5 mx-auto">
                <div className="text-center mb-12">
                <motion.h2
                    className="text-3xl font-bold tracking-tight mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Contact Us
                </motion.h2>
                <motion.p
                    className="text-muted-foreground max-w-175 mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Schedule a consultation or reach out with any questions about our services
                </motion.p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                    <Card className="shadow-md h-full">
                        <CardHeader>
                        <CardTitle>Book an Appointment</CardTitle>
                        <CardDescription>Fill out the form below and we&#39;ll get back to you within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <form className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="Enter your first name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Enter your last name" />
                            </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" placeholder="Enter your phone number" />
                            </div>
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Tell us about your needs or questions" rows={4} />
                            </div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button type="submit" className="w-full">
                                Submit Request
                                </Button>
                            </motion.div>
                        </form>
                        </CardContent>
                    </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                    <Card className="shadow-md h-full">
                        <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Reach out directly or visit our office</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                <div className="text-left">
                                    <p className="font-medium">Office Location</p>
                                    <p className="text-muted-foreground">Cagayan de Oro, Philippines</p>
                                    <p className="text-muted-foreground">Misamis Oriental, 9000</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary mt-0.5" />
                                <div className="text-left">
                                    <p className="font-medium">Phone</p>
                                    <p className="text-muted-foreground">(+63) 963-951-6190</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary mt-0.5" />
                                <div className="text-left">
                                <p className="font-medium">Email</p>
                                <p className="text-muted-foreground">bsbodollo01@gmail.com</p>
                                </div>
                            </div>
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-0.5" />
                            <div className="text-left">
                                <p className="font-medium">Office Hours</p>
                                <p className="text-muted-foreground">Monday - Friday: 8am - 5pm</p>
                                <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    </motion.div>
                </div>
            </div>
            </AnimatedSection>
    </section>
  )
}