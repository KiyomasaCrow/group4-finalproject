<template>
  <div class="p-5 min-h-screen bg-[color:var(--color-background)] transition-colors">
    <div class="flex gap-2 justify-center">
      <h2 class="text-3xl font-semibold ml-3" style="color: var(--text-color);">Esplora prodotti</h2>

      <!-- Campo ricerca -->
      <div class="flex gap-2 items-center">
        <input
          class="input-search bg-[color:var(--color-background-soft)] text-[color:var(--color-text)] border border-[color:var(--color-border)]"
          v-model="searchQuery"
          placeholder="Cerca un prodotto..."
          @keyup.enter="searchProduct()"
        />

        <div v-if="route.query.name">
          <ButtonSearch label="Annulla ricerca" @click="resetSearch" />
        </div>

        <div v-else>
          <ButtonSearch label="Cerca" @click="searchProduct" />
        </div>
      </div>
    </div>

    <!-- Se c'è una ricerca, mostra solo quel prodotto -->
    <div v-if="route.query.name" class="text-[color:var(--color-text)]">
      <SingleProduct v-if="singleProduct" :product="singleProduct" />

      <div v-else class="text-center text-[color:var(--color-border)]">
        <p class="py-5">Nessun prodotto trovato</p>
      </div>
    </div>

    <!-- Se non c'è il query name, mostra tutti i prodotti -->
    <div v-else>
      <div
        v-if="products.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-5"
      >
        <ProductCard
          v-for="product in products"
          :key="product.product_id"
          :product="product"
          :onClick="() => searchProduct(product.name)"
        />
      </div>
      <div v-else class="text-center text-[color:var(--color-border)]">
        <p>Nessun prodotto trovato</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllProducts, getProductByName } from '@/services/api'
import ProductCard from '@/components/product/ProductCard.vue'
import SingleProduct from '@/components/product/SingleProduct.vue'
import ButtonSearch from '@/components/product/ButtonSearch.vue'
import type { Product } from '@/types/models'

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
const searchProduct = async (name?: string) => {
  if (typeof name === 'string' && name.trim() !== '')
    router.push({ path: '/products', query: { name: name } })
  else if (searchQuery.value && searchQuery.value.trim() !== '')
    router.push({ path: '/products', query: { name: searchQuery.value } })
  else router.push({ path: '/products' })
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
        singleProduct.value = Array.isArray(product) ? product[0] : product
        console.log('Single product:', singleProduct.value)
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

// funzione per resettare la ricerca quando si esce dalla pagina di ricerca
onUnmounted(() => {
  products.value = []
  singleProduct.value = null
})
</script>

<style scoped>
.input-search {
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.input-search:focus {
  border-color: var(--color-border-hover);
}
</style>
