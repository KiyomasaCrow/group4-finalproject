<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/prodotti">Prodotti</router-link> |
    <router-link to="/utenti">Utenti</router-link>
    <input v-model="searchQuery" placeholder="Cerca..." @keyup.enter="onSearch" />
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref<string>('');
const router = useRouter();
const onSearch = () => {
  router.push({ path: '/prodotti', query: { q: searchQuery.value } });
};
</script>
