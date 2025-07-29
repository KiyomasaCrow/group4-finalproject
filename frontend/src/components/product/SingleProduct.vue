<template>
  <div
    v-if="product"
    class="border-2 border-gray-50 bg-white p-4 rounded-lg shadow hover:bg-gray-100 m-3"
  >
    <p class="text-lg">Nome: {{ product.name }}</p>
    <p class="text-lg">Descrizione: {{ product.description }}</p>
    <p class="text-lg">Prezzo: {{ product.price }} €</p>
  </div>

  <div v-else>
    <p>Nessun prodotto trovato.</p>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/models'

defineProps<{
  product: Product
}>()
</script>
