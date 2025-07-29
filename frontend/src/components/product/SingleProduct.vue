<template>
  <div v-if="product" class="border-2 bg-gray-400 p-4 rounded-lg shadow hover:bg-gray-500">
    <h2 class="text-3xl font-semibold">Prodotto singolo</h2>
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
