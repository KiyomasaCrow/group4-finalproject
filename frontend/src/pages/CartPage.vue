<script setup lang="ts">
import { useCart } from '@/components/cart/useCart'

const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  totalPrice // computed
} = useCart()

function onInputQuantity(productId: number, event: Event) {
  const target = event.target as HTMLInputElement | null
  if (!target) return
  const quantity = Number(target.value)
  if (quantity >= 1) {
    setQuantity(productId, quantity)
  }
}

const formatPrice = (price: number) => price.toFixed(2)
</script>

<template>
  <div>
    <h1>Carrello</h1>

    <div v-if="cart.length === 0">Il carrello è vuoto.</div>

    <div v-else>
      <div v-for="item in cart" :key="item.product.product_id" class="cart-item">
        <p>{{ item.product.name }} - €{{ formatPrice(item.product.price) }}</p>
        <div>
          <button @click="decreaseQuantity(item.product.product_id)">-</button>
          <input
            type="number"
            :value="item.quantity"
            @input="onInputQuantity(item.product.product_id, $event)"
            min="1"
          />
          <button @click="increaseQuantity(item.product.product_id)">+</button>
        </div>
      </div>

      <!-- totalPrice è computed, quindi accedi a .value -->
      <p>Totale: €{{ formatPrice(totalPrice) }}</p>
    </div>
  </div>
</template>
