export interface Order {
  id: string
  gallons: number
  address: string
  phone: string
  status: 'pending' | 'confirmed' | 'delivered'
  totalPrice: number
  createdAt: string
}

