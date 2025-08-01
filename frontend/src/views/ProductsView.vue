<template>
  <div class="p-5 min-h-screen bg-[color:var(--color-background)] transition-colors">
    <div class="flex gap-2 justify-center">
      <h2 class="text-3xl font-semibold ml-3" style="color: var(--text-color);">Esplora prodotti</h2>

      <!-- Campo ricerca -->
      <div class="flex gap-2 items-center">
        <template v-if="!route.query.name">
          <input
            class="input-search bg-[color:var(--color-background-soft)] text-[color:var(--color-text)] border border-[color:var(--color-border)]"
            v-model="searchQuery"
            placeholder="Cerca un prodotto..."
            @keyup.enter="searchProduct()"
          />
          <ButtonSearch label="Cerca" @click="searchProduct" />
        </template>
        <template v-else>
          <ButtonSearch label="Annulla ricerca" @click="resetSearch" />
        </template>
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
      <div v-else class="text-center text-[color:var(--text-color)]">
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

// funzione per cercare un prodotto (solo su click, non su input)
const searchProduct = async (name?: string) => {
  if (typeof name === 'string' && name.trim() !== '') {
    router.push({ path: '/products', query: { name: name } })
  } else if (searchQuery.value && searchQuery.value.trim() !== '') {
    // Solo su click, aggiorna la query del router
    router.push({ path: '/products', query: { name: searchQuery.value } })
  }
  // Non fare nulla se la barra è vuota
}

// funzione per resettare la ricerca e mostrare tutti i prodotti
const resetSearch = () => {
  router.push({ path: '/products' })
  searchQuery.value = ''
  singleProduct.value = null
}


// Ricerca reattiva: aggiorna la lista prodotti solo se non si sta visualizzando il singolo prodotto
watch(searchQuery, async (query) => {
  if (!route.query.name) {
    if (query && query.trim() !== '') {
      try {
        // Cerca solo prodotti che contengono la query nel nome
        const productsFound = await getAllProducts()
        products.value = productsFound.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        singleProduct.value = null
      } catch (error) {
        products.value = []
        singleProduct.value = null
      }
    } else {
      await getProducts()
      singleProduct.value = null
    }
  }
}, { immediate: true })

// AGGIUNTA: watcher sulla query del router per mostrare il singolo prodotto
watch(() => route.query.name, async (name) => {
  if (typeof name === 'string' && name.trim() !== '') {
    try {
      const productsFound = await getProductByName(name)
      if (Array.isArray(productsFound)) {
        // Cerca il prodotto con nome esatto
        const found = productsFound.find(p => p.name === name)
        singleProduct.value = found || productsFound[0] || null
      } else if (productsFound) {
        singleProduct.value = productsFound
      } else {
        singleProduct.value = null
      }
    } catch (error) {
      singleProduct.value = null
    }
  } else {
    singleProduct.value = null
  }
}, { immediate: true })

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

 .input-search::placeholder {
   color: var(--text-color);
   opacity: 0.7;
}

.input-search:focus {
  border-color: var(--color-border-hover);
}
</style>
