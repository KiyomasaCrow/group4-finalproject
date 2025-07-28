<template>
  <div @click="goDetail">
    <h3>{{ user.fullName }}</h3>
    <p>Email: {{ user.email }}</p>
    <p>Telefono: {{ user.phone }}</p>
    <p>Indirizzo: {{ user.address }}</p>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/models';
import { useRouter } from 'vue-router';
const props = defineProps<{ user: User }>();
const router = useRouter();
const goDetail = () => router.push(`/utenti/${props.user.id}`);
</script>
