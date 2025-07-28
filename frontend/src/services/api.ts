import type { Product, User, Order } from '@/types/models'
import axios from 'axios'

const ECOMMERCE_URL = 'http://localhost:3000/api/e-commerce'
const USERS_URL = 'http://localhost:3000/api/users'
const ORDERS_URL = 'http://localhost:3000/api/orders'

// Dati di esempio (mock)
const productsMock: Product[] = [
  { id: 1, name: 'Prodotto A', description: 'Descrizione A', price: 10, available: true },
  { id: 2, name: 'Prodotto B', description: 'Descrizione B', price: 20, available: false },
]

const usersMock: User[] = [
  {
    id: 1,
    fullName: 'Mario Rossi',
    email: 'mario.rossi@example.com',
    phone: '1234567890',
    address: 'Via Roma 1',
  },
  {
    id: 2,
    fullName: 'Luca Bianchi',
    email: 'luca.bianchi@example.com',
    phone: '0987654321',
    address: 'Via Milano 2',
  },
]

const ordersMock: Order[] = [
  {
    id: 1,
    productId: 1,
    productName: 'Prodotto A',
    price: 10,
    orderDate: '2025-07-01',
    deliveryDate: '2025-07-05',
    userId: 1,
  },
  {
    id: 2,
    productId: 2,
    productName: 'Prodotto B',
    price: 20,
    orderDate: '2025-07-10',
    deliveryDate: '2025-07-15',
    userId: 1,
  },
]

// Funzioni async per simulare chiamate API
export async function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => setTimeout(() => resolve(productsMock), 300))
}

export async function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => setTimeout(() => resolve(usersMock), 300))
}

export async function fetchUserById(id: number): Promise<User | null> {
  return new Promise((resolve) => {
    const user = usersMock.find((u) => u.id === id) || null
    setTimeout(() => resolve(user), 300)
  })
}

export async function fetchUserOrders(userId: number): Promise<Order[]> {
  return new Promise((resolve) => {
    const orders = ordersMock.filter((o) => o.userId === userId)
    setTimeout(() => resolve(orders), 300)
  })
}

/**
 * @description Recupera tutti i prodotti
 * @returns Array di prodotti
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await axios.get(`${ECOMMERCE_URL}/products`)
    return await res.data
  } catch (error) {
    console.error('Errore nel recupero dei prodotti:', error)
    // Fallback ai dati mock se il backend non è disponibile
    console.log('Usando dati mock come fallback...')
    return productsMock
  }
}
