<template>
  <div
    @click="$emit('select', user.id)"
    class="flex flex-col justify-around my-6 shadow-sm border rounded-lg w-96 p-6 cursor-pointer transition-colors duration-300"
    :style="{
      backgroundColor: isHovering ? 'var(--card-hover-bg)' : 'var(--card-bg)',
      color: 'var(--text-color)',
      borderColor: 'var(--border-color)'
    }"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <h3 class="text-xl font-semibold mb-4">{{ user.name }}</h3>

    <div v-if="user.orders && user.orders.length > 0" class="font-semibold mb-2">
      <h4 class="text-lg font-semibold mb-2">Acquisti:</h4>
      <ul class="list-disc list-inside font-light">
        <li
          v-for="order in user.orders"
          :key="order.id"
        >
          {{ order.productName }} - €{{ order.price }} - {{ formatDate(order.orderDate) }}
        </li>
      </ul>
    </div>

    <div v-else class="font-light">
      <p class="text-lg">Nessun acquisto effettuato.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types/models'
import { formatDate } from '@/utils/formatDate'

defineProps<{ user: User }>()

const isHovering = ref(false)
</script>

<style scoped>
:root {
  --card-bg: #ffffff;              /* light bg */
  --card-hover-bg: #f1f5f9;        /* slate-100 */
  --text-color: #1e293b;           /* slate-800 */
  --border-color: #cbd5e1;         /* slate-200 */
}

html.dark {
  --card-bg: #1e293b;              /* slate-800 */
  --card-hover-bg: #334155;        /* slate-700 */
  --text-color: #f1f5f9;           /* slate-100 */
  --border-color: #475569;         /* slate-600 */
}
</style>
