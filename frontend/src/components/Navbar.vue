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
        <button @click="toggleDarkMode" class="nav-button" title="Toggle Dark Mode">
          {{ isDark ? '☀️' : '🌙' }}
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
import { useTheme } from '@/composable/useTheme'

const searchQuery = ref<string>('')
const { cartCount } = useCart()

const { isDark, toggleTheme } = useTheme()

function toggleDarkMode() {
  toggleTheme()
}
</script>

<style scoped>
.nav-bar {
  position: relative;
  background-color: var(--card-bg);
  color: var(--text-color);
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
  height: 100px;
  width: 250px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bottoni */
.nav-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-weight: 600;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.nav-button:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
</style>
