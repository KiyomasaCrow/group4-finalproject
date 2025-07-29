<template>
  <h2 class="text-3xl font-bold underline">Prodotti</h2>
  <div v-if="products.length > 0">
    <p>Numero prodotti: {{ products.length }}</p>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - €{{ product.price }}
      </li>
    </ul>
  </div>

  <div v-else>
    <p>Nessun prodotto caricato</p>
  </div>
</template>

<script setup lang="ts">
import { getAllProducts } from '@/services/api'
import { onMounted, onUnmounted, ref } from 'vue'
import type { Product } from '@/types/models'

const products = ref<Product[]>([])

// funzione per recuperare i prodotti
const getProducts = async () => {
  try {
    const res = await getAllProducts()
    products.value = res
  } catch (error) {
    console.error('❌ Errore nel recupero dei prodotti:', error)
  }
}

// funzione per far visualizzare i prodotti quando il DOM renderizza il componente
onMounted(() => {
  getProducts()
})

// funzione per resettare i prodotti quando DOM NON renderizza più il componente
onUnmounted(() => {
  products.value = []
})
</script>
