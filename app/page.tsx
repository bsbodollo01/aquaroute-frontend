'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Navbar from '@/components/Navbar/Navbar'
import HowItWorksPage from '@/components/HowItWorks/HowItWorks'
import AboutUsPage from '@/components/AboutUs/AboutUs'
import ContactPage from '@/components/Contact/Contact'
import HeroPage from '@/components/Hero/Hero'
import FeaturesPage from '@/components/Features/Feature'

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      router.push(user.role === 'owner' ? '/owner' : '/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-full min-h-screen flex flex-col items-center justify-center px-6 text-center bg-primary-foreground">
        <div className="max-w-7xl pt-10 bg-primary-foreground">
          {/* Hero Section */}
          <HeroPage />
            
          {/* About Us */}
          <AboutUsPage />

          {/* Features Grid */}
          <FeaturesPage />

          {/* How It Works */}
          <HowItWorksPage />

          {/* Contact Section */}
          <ContactPage />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 text-center">
        <p className="text-muted-foreground">&copy; 2024 AquaRoute. All rights reserved.</p>
      </footer>
    </div>
  )
}
