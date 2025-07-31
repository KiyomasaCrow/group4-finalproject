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
:root {
  --card-bg: #ffffff;       /* slate-50 / white */
  --text-color: #1e293b;    /* slate-800 */
  --border-color: #cbd5e1;  /* slate-200 */
}

html.dark {
  --card-bg: #1e293b;       /* slate-800 */
  --text-color: #f1f5f9;    /* slate-100 */
  --border-color: #334155;  /* slate-700 */
}
</style>
