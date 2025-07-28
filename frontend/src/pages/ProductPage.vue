<template>
  <div>
    <Navbar />
    <div v-if="products.length === 0">Nessun prodotto disponibile.</div>
    <div v-else>
      <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Product } from '@/types/models';
import Navbar from '@/components/Navbar.vue';
import ProductCard from '@/components/ProductCard.vue';
import { fetchProducts } from '@/services/api';
import { useRoute } from 'vue-router';

const products = ref<Product[]>([]);
const route = useRoute();

const load = async () => {
  products.value = await fetchProducts();
};
onMounted(load);

const filteredProducts = computed(() => {
  const q = (route.query.q as string)?.toLowerCase() || '';
  return products.value.filter(p => p.name.toLowerCase().includes(q));
});
</script>
