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

        <div class="flex items-center gap-2">
          <button
            class="nav-button user-button flex items-center gap-2"
            @click="currentUser ? null : router.push('/login')"
          >
            <span class="material-icons">
              {{ currentUser ? 'person' : 'login' }}
            </span>
            {{ currentUser ? `Bentornato, ${currentUser.name}` : 'Login' }}
          </button>

          <button
            class="nav-button logout-button flex items-center gap-2"
            @click="currentUser ? handleLogout() : null"
            :disabled="!currentUser"
          >
            <span class="material-icons"> logout </span>
            Logout
          </button>
        </div>
      </div>
    </nav>

    <router-view :search="searchQuery" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCart } from '@/components/cart/useCart'
import ThreeDText from '@/components/3dtext.vue'
import { useTheme } from '@/composable/useTheme'
import { useUser } from '@/composable/useUser'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref<string>('')
const { cartCount } = useCart()
const { currentUser, initUser, clearUser } = useUser()
const { isDark, toggleTheme } = useTheme()

// Inizializza l'utente al mount del componente
onMounted(() => {
  initUser()
})

// funzione per cambiare il tema
const toggleDarkMode = () => {
  toggleTheme()
}

// funzione per fare il logout
const handleLogout = () => {
  clearUser()
  router.push('/logout')
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

.user-button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.user-button:hover {
  background-color: var(--border-color);
  text-decoration: none;
}

.logout-button {
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.logout-button:hover:not(:disabled) {
  background-color: var(--card-hover-bg);
  text-decoration: none;
}

.logout-button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
