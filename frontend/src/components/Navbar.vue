<template>
  <div>
    <nav class="nav-bar">
      <!-- Sinistra -->
      <div class="nav-left">
        <button class="nav-button"><router-link to="/">Home</router-link></button>
        <button class="nav-button"><router-link to="/products">Prodotti</router-link></button>
        <button class="nav-button"><router-link to="/users">Utenti</router-link></button>
      </div>

      <!-- Centro (Scritta 3D) -->
      <div class="nav-center">
        <ThreeDText />
      </div>

      <!-- Destra -->
      <div class="nav-right">
        <button @click="$router.push('/cart')" class="nav-button">
          🛒 Carrello ({{ cartCount }})
        </button>
      </div>
    </nav>

    <router-view :search="searchQuery" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '@/components/cart/useCart'
import ThreeDText from '@/components/3dtext.vue'

const searchQuery = ref<string>('')
const { cartCount } = useCart()
</script>

<style scoped>
.nav-bar {
  position: relative;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ccc;
  height: 120px;
}

/* Sezioni laterali */
.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Scritta 3D centrata */
.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 300px;
  pointer-events: none; /* non blocca click */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bottoni */
.nav-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #423d3d;
  font-weight: 600;
  font-size: 2rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.nav-button:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
</style>
