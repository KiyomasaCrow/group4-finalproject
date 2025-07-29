<template>
  <button class="button-search bg-cyan-600 hover:bg-cyan-700 text-white" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  onClick: () => void
}>()
</script>

<style scoped>
.button-search {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  min-width: 150px;
  max-width: 150px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
</style>
