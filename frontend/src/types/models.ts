export type Product = {
  product_id: number
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

// tipi di risposta per il login e la registrazione
export type LoginResponse = {
  message: string
  user: User
}

export type SignupResponse = {
  message: string
  user: User
}
