import React from "react"
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

// Load Poppins font
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"] // optional, add weights you need
});

export const metadata: Metadata = {
  title: 'AquaDeliver - Water Container Delivery Service',
  description: 'Book water container deliveries or manage your refilling shop. Find nearby water refilling stations and track orders in real-time.',
  icons: {
    icon: [
      {
        url: '/delivery-truck.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/delivery-truck.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/water-icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
