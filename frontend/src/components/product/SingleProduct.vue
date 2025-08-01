<template>
  <div
    v-if="product"
    class="single-product-card"
  >
    <p class="product-title">Nome: {{ product.name }}</p>
    <p class="product-desc">Descrizione: {{ product.description }}</p>
    <p class="product-price">Prezzo: {{ product.price }} €</p>
  </div>

  <div v-else>
    <p class="product-title">Nessun prodotto trovato.</p>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/models'

defineProps<{
  product: Product
}>()
</script>

<style>
.single-product-card {
  background-color: var(--card-bg);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1.5rem;
  margin: 1rem;
  transition: background-color 0.3s, color 0.3s;
}
.product-title {
  color: var(--text-color);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.product-desc {
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}
.product-price {
  color: var(--text-color);
  font-weight: 500;
}
</style>
