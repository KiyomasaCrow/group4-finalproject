<template>
  <div>
    <nav>
      <button><router-link to="/">Home</router-link></button>
      <button><router-link to="/products">Prodotti</router-link></button>
      <button><router-link to="/users">Utenti</router-link></button>
      <input type="search" placeholder="Cerca" v-model="search" @keyup.enter="onSearch" />
      <button @click="onSearch">🔍</button>
      <button @click="goToCart" title="Vai al carrello">🛒</button>
    </nav>
    <router-view :search="search" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const search = ref('');
    const router = useRouter();

    const onSearch = () => {
      router.push({ path: '/products', query: { q: search.value } });
    };

    const goToCart = () => {
      router.push('/carrello');
    };

    return { search, onSearch, goToCart };
  },
});
</script>

<style scoped>
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
  font-size: 1.25rem;
}

input {
  margin-left: auto;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
