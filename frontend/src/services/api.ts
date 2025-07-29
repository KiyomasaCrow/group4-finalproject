import type { Product, User, Order } from '@/types/models'
import axios from 'axios'

const ECOMMERCE_URL = 'http://localhost:3000/api/e-commerce'
const USERS_URL = 'http://localhost:3000/api/users'
const ORDERS_URL = 'http://localhost:3000/api/orders'

/**
 * @description Recupera tutti i prodotti
 * @returns Array di prodotti
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await axios.get(`${ECOMMERCE_URL}/products`)
    return res.data
  } catch (error) {
    console.error('Errore nel recupero dei prodotti:', error)
    throw error
  }
}

/**
 * @description Recupera un prodotto per ID
 * @param id ID del prodotto
 * @returns Prodotto
 */
export const getProductById = async (productId: number): Promise<Product> => {
  const id = Number(productId)

  try {
    const res = await axios.get(`${ECOMMERCE_URL}/products/${id}`)
    return res.data
  } catch (error) {
    console.error('Errore nel recupero del prodotto:', error)
    throw error
  }
}

/**
 * @description Crea un nuovo prodotto
 * @param product Prodotto da creare
 * @returns Prodotto creato
 */
export const createProduct = async (product: Product): Promise<Product> => {
  try {
    const res = await axios.post(`${ECOMMERCE_URL}/product`, product)
    return res.data
  } catch (error) {
    console.error('Errore nella creazione del prodotto:', error)
    throw error
  }
}

/**
 * @description Aggiorna un prodotto esistente
 * @param productId ID del prodotto da aggiornare
 * @param product Prodotto aggiornato
 * @returns Prodotto aggiornato
 */
export const updateProduct = async (productId: number, product: Product): Promise<Product> => {
  const id = Number(productId)
  try {
    const res = await axios.put(`${ECOMMERCE_URL}/product/${id}`, product)
    return res.data
  } catch (error) {
    console.error("Errore nell'aggiornamento del prodotto:", error)
    throw error
  }
}

/**
 * @description Cancella un prodotto
 * @param productId ID del prodotto da cancellare
 */
export const deleteProduct = async (productId: number): Promise<void> => {
  const id = Number(productId)
  try {
    await axios.delete(`${ECOMMERCE_URL}/product/${id}`)
  } catch (error) {
    console.error('Errore nella cancellazione del prodotto:', error)
    throw error
  }
}

/**
 * @description Recupera gli utenti con i loro acquisti
 * @returns Array di utenti
 */
export const getUsersPurchases = async (): Promise<User[]> => {
  try {
    const res = await axios.get(`${USERS_URL}/purchases`)
    return res.data
  } catch (error) {
    console.error('Errore nel recupero degli utenti:', error)
    throw error
  }
}

/**
 * @description Recupera gli ordini per ID utente
 * @param userId ID dell'utente
 * @returns Array di ordini
 */
export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  const id = Number(userId)

  try {
    const res = await axios.get(`${ORDERS_URL}/${id}`)
    return res.data
  } catch (error) {
    console.error('Errore nel recupero degli ordini:', error)
    throw error
  }
}
