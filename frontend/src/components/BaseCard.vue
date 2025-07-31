<template>
  <div
    class="flex flex-col justify-around my-6 shadow-sm border rounded-lg w-96 p-6 transition-colors duration-300"
    :style="{
      backgroundColor: 'var(--card-bg)',
      color: 'var(--text-color)',
      borderColor: 'var(--border-color)'
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
// No script needed here
</script>

<style>
</style>
