import type { LoginResponse, SignupResponse } from '@/types/models'
import axios from 'axios'

const ACCOUNT_URL = 'http://localhost:3000/api/account'

/**
 * @description Creazione dell'utente
 * @param name Nome dell'utente
 * @param email Email dell'utente
 * @param password Password dell'utente
 * @returns Risposta della registrazione con utente
 */
export const signIn = async (
  name: string,
  email: string,
  password: string,
): Promise<SignupResponse> => {
  try {
    const response = await axios.post(`${ACCOUNT_URL}/sign-in`, { name, email, password })
    return response.data
  } catch (error) {
    console.error("Errore nella creazione dell'utente:", error)
    throw error
  }
}

/**
 * @description Login dell'utente
 * @param email Email dell'utente
 * @param password Password dell'utente
 * @returns Risposta del login con utente
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${ACCOUNT_URL}/login`, { email, password })
    return response.data
  } catch (error) {
    console.error("Errore nel login dell'utente:", error)
    throw error
  }
}

/**
 * @description Logout dell'utente
 * @returns Utente disconnesso
 */
export const logout = async (): Promise<void> => {
  try {
    await axios.post(`${ACCOUNT_URL}/logout`)
  } catch (error) {
    console.error("Errore nel logout dell'utente:", error)
    throw error
  }
}

/**
 * @description Verifica se l'utente è autenticato
 * @returns Utente autenticato
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${ACCOUNT_URL}/me`)
    return response.data.loggedIn
  } catch (error) {
    console.error("Errore nella verifica dell'autenticazione:", error)
    throw error
  }
}
