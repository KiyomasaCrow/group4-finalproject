<template>
  <div class="p-5">
    <h2 class="text-3xl font-semibold mb-4">Dettagli utente: {{ user?.name }}</h2>

    <div v-if="user">
      <div class="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <p><strong>Nome:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Telefono:</strong> {{ user.phone }}</p>
        <p><strong>Indirizzo:</strong> {{ user.address }}</p>
        <p><strong>Account creato il:</strong> {{ formatDate(user.created_at) }}</p>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Caricamento utente...</div>
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
