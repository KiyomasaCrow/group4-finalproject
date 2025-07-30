<script setup lang="ts">
import { useCart } from '@/components/cart/useCart'

const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalPrice // ora è un computed
} = useCart()

const formatPrice = (price: number) => price.toFixed(2)
</script>

<template>
  <div class="cart">
    <h1>Carrello</h1>

    <div v-if="cart.length === 0">
      <p>Il carrello è vuoto.</p>
    </div>

    <div v-else>
      <ul>
        <li v-for="item in cart" :key="item.product.product_id">
          <p>
            <strong>{{ item.product.name }}</strong> - €
            {{ formatPrice(item.product.price) }}
          </p>
          <div>
            Quantità: {{ item.quantity }}
            <button @click="decreaseQuantity(item.product.product_id)">-</button>
            <button @click="increaseQuantity(item.product.product_id)">+</button>
            <button @click="removeFromCart(item.product.product_id)">Rimuovi</button>
          </div>
        </li>
      </ul>

      <!-- totalPrice è computed, quindi accedi a .value -->
      <p>Totale: €{{ formatPrice(totalPrice) }}</p>
    </div>
  </div>
</template>
