<template>
  <div>
    <Navbar />
    <h2>Ordini di {{ user?.fullName }}</h2>
    <div v-if="orders.length === 0">Nessun prodotto acquistato.</div>
    <ul v-else>
      <li v-for="o in orders" :key="o.id">
        {{ o.productName }} – €{{ o.price }} – Ordine: {{ o.orderDate }} – Delivery: {{ o.deliveryDate }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import type { User } from '@/types/models';
import type { Order } from '@/types/models';
import { fetchUserById, fetchUserOrders } from '@/services/api';

const route = useRoute();
const userId = Number(route.params.id);
const user = ref<User | null>(null);
const orders = ref<Order[]>([]);

onMounted(async () => {
  user.value = await fetchUserById(userId);
  orders.value = await fetchUserOrders(userId);
});
</script>
