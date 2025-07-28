<template>
  <div>
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p>Prezzo: €{{ product.price.toFixed(2) }}</p>
    <p v-if="product.available">Disponibile</p>
    <p v-else>Esaurito</p>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/models';
defineProps<{ product: Product }>();
</script>
