<template>
  <div
    class="flex flex-col justify-around my-6 bg-white hover:bg-gray-100 shadow-sm border border-slate-200 rounded-lg w-96 p-6"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
// Questo componente è generico e non ha bisogno di script se usi solo <slot />
</script>

<style scoped>
/* Puoi aggiungere stili personalizzati qui se ti servono, ma lo stile base è gestito da Tailwind */
</style>
