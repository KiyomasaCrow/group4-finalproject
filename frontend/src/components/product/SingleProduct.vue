<template>
  <div
    v-if="product"
    class="border-2 border-[color:var(--color-border)] bg-[color:var(--color-background)] p-4 rounded-lg shadow hover:bg-[color:var(--color-background-soft)] transition-colors m-3"
  >
    <p class="text-lg text-[color:var(--color-text)]">Nome: {{ product.name }}</p>
    <p class="text-lg text-[color:var(--color-text)]">Descrizione: {{ product.description }}</p>
    <p class="text-lg text-[color:var(--color-text)]">Prezzo: {{ product.price }} €</p>
  </div>

  <div v-else>
    <p class="text-[color:var(--color-text)]">Nessun prodotto trovato.</p>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/models'

defineProps<{
  product: Product
}>()
</script>
