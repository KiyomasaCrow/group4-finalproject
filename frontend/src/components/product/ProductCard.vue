<template>
  <div
    class="flex flex-col justify-around my-6 bg-white hover:bg-gray-100 shadow-sm border border-slate-200 rounded-lg w-96 p-6"
  >
    <div class="flex items-center mb-4">
      <h5 class="text-slate-800 text-xl font-semibold">{{ product.name }}</h5>
    </div>

    <p class="text-slate-800 font-semibold">Descrizione:</p>
    <p class="block text-slate-600 leading-normal font-light mb-4">
      {{ product.description }}
    </p>

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
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/models'

defineProps<{
  product: Product
  onClick: () => void
}>()
</script>
