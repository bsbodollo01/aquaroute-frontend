export interface Order {
  id: string
  gallons: number
  address: string
  phone: string
  status: 'pending' | 'confirmed' | 'delivered'
  createdAt: string
}

