<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/">Home</router-link> |
      <router-link to="/prodotti">Prodotti</router-link> |
      <router-link to="/utenti">Utenti</router-link>
    </div>

    <div class="nav-actions">
      <input v-model="searchQuery" placeholder="Cerca..." @keyup.enter="onSearch" />
      <button @click="onSearch">Cerca</button>
      <div class="cart-icon" @click="goToCart">🛒</div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

const onSearch = () => {
  router.push({ path: '/prodotti', query: { q: searchQuery.value } });
};

const goToCart = () => {
  router.push('/carrello'); // puoi crearla più avanti
};
</script>

