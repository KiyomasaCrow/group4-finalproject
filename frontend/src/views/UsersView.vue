<template>
  <h2 class="text-3xl font-semibold">Utenti</h2>
  <div v-if="users.length > 0">
    <UserCard v-for="user in users" :key="user.id" :user="user" @select="goToDetail" />
  </div>
  <div v-else>
    <p>Nessun utente ha ancora acquistato un prodotto</p>
  </div>
</template>

<script setup lang="ts">
import { getUsersPurchases } from '@/services/api'
import { onMounted, onUnmounted, ref } from 'vue'
import type { User } from '@/types/models'
import UserCard from '@/components/UserCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref<User[]>([])

// funzione per recuperare gli acquisti fatti dagli utenti
const getUsers = async () => {
  try {
    const res = await getUsersPurchases()
    users.value = res
  } catch (error) {
    console.error('Errore nel recupero degli utenti:', error)
  }
}

// funzione per navigare alla pagina di dettaglio dell'utente
const goToDetail = (userId: number) => {
  router.push(`/utenti/${userId}`)
}

// funzione per far visualizzare gli utenti quando il DOM renderizza il componente
onMounted(() => {
  getUsers()
})

// funzione per resettare gli utenti quando DOM NON renderizza più il componente
onUnmounted(() => {
  users.value = []
})
</script>
