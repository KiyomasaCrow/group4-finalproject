<template>
  <div
    @click="$emit('select', user.id)"
    class="border p-5 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 m-5"
  >
    <h3 class="text-2xl font-bold">{{ user.name }}</h3>
    <div v-if="user.orders && user.orders.length > 0">
      <h4 class="text-xl font-bold">Acquisti:</h4>
      <ul>
        <li v-for="order in user.orders" :key="order.id">
          {{ order.productName }} - €{{ order.price }} - {{ formatDate(order.orderDate) }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="text-lg">Nessun acquisto effettuato.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/models'
import { formatDate } from '@/utils/formatDate'

defineProps<{ user: User }>()
</script>
