import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedSection } from "@/components/AnimatedSection/page"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <section id="#contact">
         <AnimatedSection className="py-16">
            {/* <AnimatedSection id="contact" className="py-16"> */}
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                <Card className="shadow-md">
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
                        <Label htmlFor="service">Service Interested In</Label>
                        <Select>
                            <SelectTrigger id="service">
                            <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="cognitive">Cognitive Rehabilitation</SelectItem>
                            <SelectItem value="motor">Fine Motor Skills</SelectItem>
                            <SelectItem value="pediatric">Pediatric Therapy</SelectItem>
                            <SelectItem value="adaptive">Adaptive Equipment</SelectItem>
                            <SelectItem value="home">Home Modifications</SelectItem>
                            <SelectItem value="daily">Daily Living Skills</SelectItem>
                            </SelectContent>
                        </Select>
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
                <Card>
                    <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out directly or visit our office</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <motion.div
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <p className="font-medium">Office Location</p>
                            <p className="text-muted-foreground">123 Therapy Lane</p>
                            <p className="text-muted-foreground">Wellness City, WC 12345</p>
                        </div>
                        </motion.div>
                        <motion.div
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">(555) 123-4567</p>
                        </div>
                    </motion.div>
                        <motion.div
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">info@playhearts.com</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >                <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                        <p className="font-medium">Office Hours</p>
                        <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                        <p className="text-muted-foreground">Saturday: 10am - 2pm</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                        </div>
                    </motion.div>
                    </CardContent>
                </Card>
                </motion.div>
                </div>
            </div>
            </AnimatedSection>
    </section>
  )
}