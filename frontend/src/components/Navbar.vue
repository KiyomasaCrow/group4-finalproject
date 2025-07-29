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
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.nav-button:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
</style>
