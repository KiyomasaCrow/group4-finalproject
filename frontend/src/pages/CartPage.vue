<template>
  <div>
    <h1>Carrello</h1>
    <div v-if="items.length === 0">Il carrello è vuoto.</div>
    <div v-else>
      <div v-for="item in items" :key="item.product.id" class="cart-item">
        <p>{{ item.product.name }} - €{{ item.product.price }}</p>
        <div>
          <button @click="decrementQuantity(item.product.id)">-</button>
          <input type="number" :value="item.quantity" @input="onInputQuantity(item.product.id, $event)" min="1" />

          <button @click="incrementQuantity(item.product.id)">+</button>
        </div>
      </div>
      <h2>Totale: €{{ totalPrice.toFixed(2) }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/components/cart/useCart'

const {
  items,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  totalPrice
} = useCart()

function onInputQuantity(productId: number, event: Event) {
  const target = event.target as HTMLInputElement | null
  if (!target) return
  const quantity = Number(target.value)
  if (quantity >= 1) {
    setQuantity(productId, quantity)
  }
}
</script>
