<template>
  <div class="p-5">
    <h2 class="user-details-title">Dettagli utente: {{ user?.name }}</h2>
    <div v-if="user">
      <div class="user-details-card">
        <p><strong>Nome:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Telefono:</strong> {{ user.phone }}</p>
        <p><strong>Indirizzo:</strong> {{ user.address }}</p>
        <p><strong>Account creato il:</strong> {{ formatDate(user.created_at) }}</p>
      </div>
    </div>
    <div class="text-center mt-6 user-details-muted" v-else>
      Caricamento utente...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getUserById } from '@/services/api'
import type { User } from '@/types/models'
import { formatDate } from '@/utils/formatDate'

const user = ref<User | null>(null)
const route = useRoute()

const getUser = async () => {
  const id = parseInt(route.params.id as string)
  if (!isNaN(id)) {
    try {
      user.value = await getUserById(id)
    } catch (error) {
      console.error('Errore nel recupero del singolo utente:', error)
      user.value = null
    }
  }
}

onMounted(() => {
  getUser()
})

onUnmounted(() => {
  user.value = null
})
</script>

<style>
.user-details-title {
  color: var(--text-color);
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.user-details-card {
  background-color: var(--card-bg);
  color: var(--text-color);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1.5rem;
  margin: 1rem 0;
  border: 1px solid var(--border-color);
  transition: background-color 0.3s, color 0.3s;
}
.user-details-muted {
  color: var(--text-muted);
}
</style>
