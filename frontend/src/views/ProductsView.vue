<template>
  <div>
    <h2 class="text-3xl font-semibold">Prodotti</h2>

    <!-- Campo ricerca -->
    <input
      class="input-search"
      v-model="searchQuery"
      placeholder="Cerca..."
      @keyup.enter="searchProduct"
    />

    <!-- Se c'è una ricerca, mostra solo quel prodotto -->
    <div v-if="route.query.name">
      <ProductCard v-if="singleProduct" :product="singleProduct" />
      <p v-else>Prodotto non trovato.</p>
      <button @click="resetSearch">Annulla ricerca</button>
    </div>

    <!-- Se non c'è ricerca, mostra tutti i prodotti -->
    <div v-else>
      <p v-if="products.length > 0">Numero prodotti: {{ products.length }}</p>
      <ul v-if="products.length > 0">
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - €{{ product.price }}
        </li>
      </ul>
      <p v-else>Nessun prodotto caricato</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllProducts, getProductByName } from '@/services/api'
import type { Product } from '@/types/models'
import ProductCard from '@/components/ProductCard.vue'

const products = ref<Product[]>([])
const searchQuery = ref<string>('')
const singleProduct = ref<Product | null>(null)

const route = useRoute()
const router = useRouter()

// funzione per recuperare i prodotti
const getProducts = async () => {
  try {
    const res = await getAllProducts()
    products.value = res
  } catch (error) {
    console.error('Errore nel recupero dei prodotti:', error)
  }
}

// funzione per cercare un prodotto
const searchProduct = async () => {
  if (searchQuery.value.trim() !== '') {
    router.push({ path: '/products', query: { name: searchQuery.value } })
  }
}

// funzione per resettare la ricerca e mostrare tutti i prodotti
const resetSearch = () => {
  router.push({ path: '/products' })
  searchQuery.value = ''
  singleProduct.value = null
}

// Osserva il parametro nella query (?name=...)
watch(
  () => route.query.name,
  async (name) => {
    if (typeof name === 'string' && name.trim() !== '') {
      searchQuery.value = name
      try {
        const product = await getProductByName(name)
        singleProduct.value = product
        products.value = [] // Nasconde la lista completa
      } catch (error) {
        console.error('Prodotto non trovato')
        singleProduct.value = null
        throw error
      }
    } else {
      // Se non c'è un nome nella query, carica tutti
      searchQuery.value = ''
      singleProduct.value = null
      await getProducts()
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  products.value = []
  singleProduct.value = null
})
</script>

<style scoped>
.input-search {
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  display: block;
}

button {
  margin-top: 1rem;
  padding: 0.4rem 1rem;
  background-color: #ddd;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
</style>
