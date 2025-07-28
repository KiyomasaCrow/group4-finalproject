<template>
  <div class="cart">
    <h1>Carrello</h1>

    <div v-if="cartItems.length === 0">
      <p>Il carrello è vuoto.</p>
    </div>

    <div v-else>
      <ul>
        <li v-for="(item, index) in cartItems" :key="index">
          <p><strong>{{ item.name }}</strong> - €{{ item.price.toFixed(2) }}</p>
        </li>
      </ul>
      <p><strong>Totale:</strong> €{{ totalPrice.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Per ora usiamo dati mock temporanei
const cartItems = ref([
  { id: 1, name: 'Prodotto A', price: 10 },
  { id: 2, name: 'Prodotto B', price: 20 },
]);

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price, 0)
);
</script>

<style scoped>
.cart {
  padding: 1rem;
}
</style>
