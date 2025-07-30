import { ref, computed } from 'vue'
import type { Product } from '@/types/models'

type CartItem = {
  product: Product
  quantity: number
}

// GLOBAL cart state, shared across all imports
const cart = ref<CartItem[]>([])

function addToCart(product: Product) {
  // Ensure price is a number
  if (typeof product.price === 'string') {
    product.price = parseFloat(product.price)
  }
  console.log('Adding product:', product)
  console.log('Current cart:', cart.value)
  const item = cart.value.find(item => item.product.product_id === product.product_id)
  if (item) {
    item.quantity++
  } else {
    cart.value.push({ product, quantity: 1 })
  }
  console.log('Cart after push:', cart.value.map(item => item.product.product_id));
}

function removeFromCart(productId: number) {
  const index = cart.value.findIndex(item => item.product.product_id === productId)
  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}

function increaseQuantity(productId: number) {
  const item = cart.value.find(item => item.product.product_id === productId)
  if (item) item.quantity++
}

function decreaseQuantity(productId: number) {
  const item = cart.value.find(item => item.product.product_id === productId)
  if (item && item.quantity > 1) {
    item.quantity--
  } else {
    removeFromCart(productId)
  }
}

function setQuantity(productId: number, quantity: number) {
  const item = cart.value.find(item => item.product.product_id === productId)
  if (item) {
    if (quantity < 1) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
    }
  }
}

function clearCart() {
  cart.value = []
}

// computed per totale e quantità
const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
)

const cartCount = computed(() =>
  cart.value.reduce((acc, item) => acc + item.quantity, 0)
)

export function useCart() {
  // Always return the same cart state
  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    clearCart,
    totalPrice,
    cartCount
  }
}
