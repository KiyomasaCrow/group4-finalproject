export type Product = {
  id: number
  name: string
  description: string
  price: number
  available: boolean
}

export type User = {
  id: number
  name: string
  email: string
  phone: string
  address: string
  created_at: string
  orders?: Order[]
}

export type Order = {
  id: number
  productId: number
  productName: string
  price: number
  orderDate: string // ISO string o formattata
  deliveryDate: string // ISO string o formattata
  userId: number
}
