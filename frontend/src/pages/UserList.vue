<template>
  <div>
    <Navbar />
    <div v-if="users.length === 0">Nessun utente trovato.</div>
    <div v-else>
      <UserCard v-for="u in users" :key="u.id" :user="u" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '@/types/models'
import Navbar from '@/components/Navbar.vue'
import UserCard from '@/components/UserCard.vue'
import { getUsersPurchases } from '@/services/api'

const users = ref<User[]>([])
const load = async () => { users.value = await getUsersPurchases() }
onMounted(load)
</script>
