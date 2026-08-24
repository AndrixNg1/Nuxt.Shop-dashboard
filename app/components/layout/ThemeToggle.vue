<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button class="theme-toggle" :aria-label="isDark ? 'Activer le thème clair' : 'Activer le thème sombre'" :aria-pressed="isDark" :title="isDark ? 'Passer au thème clair' : 'Passer au thème sombre'" @click="toggleTheme">
    <span class="theme-toggle__icon">{{ isDark ? '☀' : '☾' }}</span>
    <span class="theme-toggle__label">{{ isDark ? 'Clair' : 'Sombre' }}</span>
  </button>
</template>
