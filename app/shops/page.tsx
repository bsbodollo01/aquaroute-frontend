'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { MapPin, Phone, Clock, Star, ArrowLeft } from 'lucide-react'

interface Shop {
  id: string
  name: string
  address: string
  phone: string
  hours: string
  latitude: number
  longitude: number
  rating: number
  reviews: number
}

export default function ShopsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [shops, setShops] = useState<Shop[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredShops, setFilteredShops] = useState<Shop[]>([])
  const [mapUrl, setMapUrl] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    // Mock shop data
    const mockShops: Shop[] = [
      {
        id: '1',
        name: 'Pure Water Station',
        address: '123 Main St, Downtown',
        phone: '+1 (555) 123-4567',
        hours: '8 AM - 8 PM',
        latitude: 40.7128,
        longitude: -74.006,
        rating: 4.8,
        reviews: 156,
      },
      {
        id: '2',
        name: 'AquaPure Refilling',
        address: '456 Oak Ave, Midtown',
        phone: '+1 (555) 234-5678',
        hours: '7 AM - 9 PM',
        latitude: 40.758,
        longitude: -73.9855,
        rating: 4.6,
        reviews: 89,
      },
      {
        id: '3',
        name: 'Crystal Water Depot',
        address: '789 Elm Rd, Uptown',
        phone: '+1 (555) 345-6789',
        hours: '9 AM - 6 PM',
        latitude: 40.8448,
        longitude: -73.9365,
        rating: 4.5,
        reviews: 124,
      },
      {
        id: '4',
        name: 'Fresh Spring Station',
        address: '321 Pine St, West End',
        phone: '+1 (555) 456-7890',
        hours: '8 AM - 7 PM',
        latitude: 40.7505,
        longitude: -73.9972,
        rating: 4.7,
        reviews: 203,
      },
      {
        id: '5',
        name: 'H2O Premium Refill',
        address: '654 Cedar Ln, East Side',
        phone: '+1 (555) 567-8901',
        hours: '10 AM - 8 PM',
        latitude: 40.7282,
        longitude: -73.7949,
        rating: 4.4,
        reviews: 67,
      },
    ]

    setShops(mockShops)
    setFilteredShops(mockShops)

    // Get user location (mock for demo)
    setUserLocation({ lat: 40.7128, lng: -74.006 })
  }, [user])

  useEffect(() => {
    // Filter shops based on search query
    const filtered = shops.filter(
      (shop) =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredShops(filtered)
  }, [searchQuery, shops])

  const handleViewOnMap = (shop: Shop) => {
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(shop.address)}`
    window.open(mapsUrl, '_blank')
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3959 // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const sortedShops = userLocation
    ? filteredShops.sort(
        (a, b) =>
          calculateDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude) -
          calculateDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude)
      )
    : filteredShops

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md border-b border-border/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Water Refilling Shops</h1>
            <p className="text-sm opacity-90">Find the nearest refilling station</p>
          </div>
          <Link href="/dashboard">
            <Button variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <Input
            placeholder="Search by shop name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-lg py-6"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Showing {sortedShops.length} shops
            {userLocation && ' sorted by distance'}
          </p>
        </div>

        {/* Shops Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedShops.map((shop) => {
            const distance = userLocation
              ? calculateDistance(userLocation.lat, userLocation.lng, shop.latitude, shop.longitude)
              : null

            return (
              <Card key={shop.id} className="shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader className="border-b border-border/10 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{shop.name}</CardTitle>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(shop.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground/30'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({shop.reviews})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Address</p>
                        <p className="text-sm">{shop.address}</p>
                        {distance && (
                          <p className="text-xs text-primary font-semibold mt-1">
                            {distance.toFixed(1)} miles away
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Phone</p>
                        <a href={`tel:${shop.phone}`} className="text-sm text-primary hover:underline">
                          {shop.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Hours</p>
                        <p className="text-sm">{shop.hours}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewOnMap(shop)}
                    className="w-full"
                  >
                    View on Map
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {sortedShops.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="pt-12 pb-12">
              <p className="text-center text-muted-foreground">
                No shops found matching your search. Try a different query.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
