<template>
  <div
    @click="$emit('select', user.id)"
    class="flex flex-col justify-around my-6 bg-white hover:bg-gray-100 shadow-sm border border-slate-200 rounded-lg w-96 p-6 cursor-pointer"
  >
    <h3 class="text-slate-800 text-xl font-semibold mb-4">{{ user.name }}</h3>

    <div v-if="user.orders && user.orders.length > 0" class="text-slate-800 font-semibold mb-2">
      <h4 class="text-lg font-semibold mb-2">Acquisti:</h4>
      <ul class="list-disc list-inside text-slate-600 font-light">
        <li v-for="order in user.orders" :key="order.id">
          {{ order.productName }} - €{{ order.price }} - {{ formatDate(order.orderDate) }}
        </li>
      </ul>
    </div>

    <div v-else class="text-slate-600 font-light">
      <p class="text-lg">Nessun acquisto effettuato.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/models'
import { formatDate } from '@/utils/formatDate'

defineProps<{ user: User }>()
</script>
