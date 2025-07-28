<template>
  <div @click="goDetail" style="cursor: pointer;">
    <h3>{{ user.fullName }}</h3>
    <p>Email: {{ user.email }}</p>
    <p>Telefono: {{ user.phone }}</p>
    <p>Indirizzo: {{ user.address }}</p>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/models';
import { useRouter } from 'vue-router';

const { user } = defineProps<{ user: User }>();
const router = useRouter();

const goDetail = () => router.push(`/utenti/${user.id}`);
</script>
