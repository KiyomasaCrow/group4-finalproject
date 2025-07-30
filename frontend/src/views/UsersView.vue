<template>
  <div class="p-5">
    <h2 class="text-3xl font-semibold text-center mb-6">Lista utenti</h2>
<div v-if="users.length > 0" class="flex flex-wrap justify-center gap-6">
  <UserCard
    v-for="user in users"
    :key="user.id"
    :user="user"
    @select="goToDetail"
  />
</div>


    <div v-else>
      <p class="text-center text-gray-500">Nessun utente ha ancora acquistato un prodotto</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUsersPurchases } from '@/services/api'
import { onMounted, onUnmounted, ref } from 'vue'
import type { User } from '@/types/models'
import UserCard from '@/components/users/UserCard.vue'
import { useRouter } from 'vue-router'

// Dichiara che accetti la prop search (opzionale)
defineProps<{ search?: string }>()

const router = useRouter()
const users = ref<User[]>([])

const getUsers = async () => {
  try {
    const res = await getUsersPurchases()
    users.value = res
  } catch (error) {
    console.error('Errore nel recupero degli utenti:', error)
  }
}

const goToDetail = (userId: number) => {
  router.push(`/users/${userId}`)
}

onMounted(() => {
  getUsers()
})

onUnmounted(() => {
  users.value = []
})
</script>
