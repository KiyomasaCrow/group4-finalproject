import { ref } from 'vue'
import type { User } from '@/types/models'

const currentUser = ref<User | null>(null)

export function useUser() {
  const setUser = (user: User) => {
    currentUser.value = user
    localStorage.setItem('user', JSON.stringify(user))
  }

  const clearUser = () => {
    currentUser.value = null
    localStorage.removeItem('user')
  }

  const getUser = () => {
    return currentUser.value
  }

  const initUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        currentUser.value = JSON.parse(savedUser)
      } catch (error) {
        console.error("Errore nel parsing dell'utente salvato:", error)
        localStorage.removeItem('user')
      }
    }
  }

  return {
    currentUser,
    setUser,
    clearUser,
    getUser,
    initUser,
  }
}
