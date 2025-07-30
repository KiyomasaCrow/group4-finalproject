<template>
  <BaseCard>
    <div class="flex items-center mb-4">
      <h5 class="text-slate-800 text-xl font-semibold">{{ product.name }}</h5>
    </div>

    <div>
      <p class="text-slate-800 font-semibold">Descrizione:</p>
      <p class="block text-slate-600 leading-normal font-light mb-4">
        {{ product.description }}
      </p>

      <p class="text-slate-800 font-semibold">Prezzo:</p>
      <p class="block text-slate-600 leading-normal font-light mb-4">
        {{ product.price }} €
      </p>
    </div>

    <div>
      <a
        class="text-slate-800 font-semibold text-sm hover:underline flex items-center cursor-pointer"
        @click="onClick"
      >
        Dettagli
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ml-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>

    <button
      class="mt-4 button-search bg-cyan-700 hover:bg-cyan-900 text-white font-semibold py-2 px-4 rounded"
      @click="onAddClick"
    >
      Aggiungi al carrello
    </button>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '../BaseCard.vue'
import type { Product } from '../../types/models'
import { useCart } from '../cart/useCart'

const { product, onClick } = defineProps<{
  product: Product
  onClick?: () => void
}>()

const { addToCart } = useCart()

function onAddClick() {
  addToCart(product)
}
</script>
