<template>
  <Navbar />
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { useTheme } from './composable/useTheme'

useTheme() // inizializza darkmode da localStorage
</script>