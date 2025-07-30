<template>
  <button class="button-search bg-cyan-700 hover:bg-cyan-900 text-white" @click="onClick">
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
  font-size: 1.0rem;
  font-weight: 600;
  min-width: 150px;
  max-width: 150px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
</style>
