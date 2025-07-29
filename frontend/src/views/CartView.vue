<template>
  <div class="cart">
    <h1>Carrello</h1>

    <div v-if="items.length === 0">
      <p>Il carrello è vuoto.</p>
    </div>

    <div v-else>
      <ul>
        <li v-for="item in items" :key="item.product.id">
          <p>
            <strong>{{ item.product.name }}</strong> - €
            {{ formatPrice(item.product.price) }}
          </p>
          <div>
            Quantità:
            {{ item.quantity }}
            <button @click="decrementQuantity(item.product.id)">-</button>            
            <button @click="incrementQuantity(item.product.id)">+</button>
            <button @click="removeFromCart(item.product.id)">Rimuovi</button>
          </div>
        </li>
      </ul>

      <p><strong>Totale:</strong> €{{ totalPrice.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/components/cart/useCart'

const {
  items,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  totalPrice
} = useCart()

const formatPrice = (price: unknown) => {
  return typeof price === 'number' ? price.toFixed(2) : 'N/A'
}
</script>

<style scoped>
.cart {
  padding: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

button {
  margin: 0 4px;
}
</style>
