<template>
  <div>
    <nav>
      <button><router-link to="/">Home</router-link></button>
      <button><router-link to="/products">Prodotti</router-link></button>
      <button><router-link to="/users">Utenti</router-link></button>
      <input type="search" placeholder="Cerca..." v-model="search" />
    </nav>
    <router-view :search="search" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const search = ref('');
    return { search };
  },
});
</script>

<style scoped>
/* Stile minimo per la navbar */
nav {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

input {
  margin-left: auto;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
