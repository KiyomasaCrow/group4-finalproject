<template>
  <div>
    <Navbar />
    <input
      class="input-search"
      v-model="searchQuery"
      placeholder="Cerca..."
      @keyup.enter="searchProduct"
    />

    <div v-if="products.length === 0">Nessun prodotto disponibile.</div>
    <div v-else>
      <ProductCard v-for="item in filteredProducts" :key="item.id" :product="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Product } from '@/types/models'
import Navbar from '@/components/Navbar.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllProducts } from '@/services/api'

const searchQuery = ref<string>('')
const router = useRouter()

const products = ref<Product[]>([])
const route = useRoute()

const load = async () => {
  products.value = await getAllProducts()
}

const filteredProducts = computed(() => {
  const queryName = ((route.query.name as string) || '').toLowerCase()
  if (!queryName) return products.value
  return products.value.filter((p) => p.name.toLowerCase().includes(queryName))
})

const searchProduct = async () => {
  router.push({ path: '/products', query: { name: searchQuery.value } })
}

onMounted(async () => {
  await load()

  // se c'è già un nome nella query, lo mette nel searchQuery
  if (route.query.name) searchQuery.value = route.query.name as string
})

onUnmounted(() => {
  products.value = []
})
</script>

<style scoped>
.input-search {
  margin-left: auto;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
