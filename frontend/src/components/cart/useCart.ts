import { reactive, computed, watch } from 'vue'
import type { Product } from '@/types/models'

interface CartItem {
  product: Product
  quantity: number
}

const STORAGE_KEY = 'my-cart'

const savedItems = localStorage.getItem(STORAGE_KEY)
const initialItems = savedItems ? JSON.parse(savedItems) : []

const state = reactive({
  items: initialItems as CartItem[]
})

watch(() => state.items, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

function findItem(productId: number) {
  return state.items.find(item => item.product.id === productId)
}

export function useCart() {
  function addToCart(product: Product) {
    const item = findItem(product.id)
    if (item) {
      item.quantity++
    } else {
      state.items.push({
        product,
        quantity: 1
      })
    }
  }

  function incrementQuantity(productId: number) {
    const item = findItem(productId)
    if (item) item.quantity++
  }

  function decrementQuantity(productId: number) {
    const item = findItem(productId)
    if (item && item.quantity > 1) item.quantity--
  }

  function setQuantity(productId: number, quantity: number) {
    if (quantity < 1) quantity = 1
    const item = findItem(productId)
    if (item) item.quantity = quantity
  }

  function removeFromCart(productId: number) {
    const index = state.items.findIndex(item => item.product.id === productId)
    if (index !== -1) state.items.splice(index, 1)
  }

  const cartCount = computed(() =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  )

  const items = computed(() => state.items)

  return {
    items,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
    removeFromCart,
    cartCount,
    totalPrice
  }
}
