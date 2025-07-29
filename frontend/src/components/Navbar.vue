<template>
  <div>
    <nav class="nav-bar">
      <button class="nav-button"><router-link to="/">Home</router-link></button>
      <button class="nav-button"><router-link to="/products">Prodotti</router-link></button>
      <button class="nav-button"><router-link to="/users">Utenti</router-link></button>
    </nav>

    <router-view :search="searchQuery" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref<string>('')
</script>

<style scoped>
.nav-bar {
  background-color: #f0f0f0;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}

.nav-button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
