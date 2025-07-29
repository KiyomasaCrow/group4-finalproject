<script setup lang="ts">
import { getUsersPurchases } from '@/services/api'
import { onMounted, onUnmounted, ref } from 'vue'
import type { User } from '@/types/models'
import UserCard from '@/components/UserCard.vue'
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
  router.push(`/utenti/${userId}`)
}

onMounted(() => {
  getUsers()
})

onUnmounted(() => {
  users.value = []
})
</script>
