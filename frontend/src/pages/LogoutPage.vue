<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(true)

const logout = async () => {
  setTimeout(() => {
    isLoggedIn.value = false
    router.push('/')
  }, 2000)
}

onMounted(() => {
  logout()
})
</script>

<style scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  -webkit-mask: conic-gradient(from 15deg, #0000, #000);
  animation: l26 1s infinite steps(12);
}
.loader,
.loader:before,
.loader:after {
  background:
    radial-gradient(closest-side at 50% 12.5%, #60a5fa 96%, #0000) 50% 0 / 20% 80% repeat-y,
    radial-gradient(closest-side at 12.5% 50%, #60a5fa 96%, #0000) 0 50% / 80% 20% repeat-x;
}
.loader:before,
.loader:after {
  content: '';
  grid-area: 1/1;
  transform: rotate(30deg);
}
.loader:after {
  transform: rotate(60deg);
}

@keyframes l26 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
