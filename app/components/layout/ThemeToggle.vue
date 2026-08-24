<script setup lang="ts">
const colorMode = useColorMode()
const currentTheme = computed<'light' | 'dark'>(() => colorMode.value === 'dark' ? 'dark' : 'light')

const setTheme = (theme: 'light' | 'dark') => {
  colorMode.preference = theme

  // Applique immédiatement la classe, même avant le prochain cycle de rendu Nuxt.
  if (import.meta.client) {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }
}
</script>

<template>
  <div class="theme-switcher" role="group" aria-label="Choisir le thème">
    <button class="theme-switcher__option" :class="{ 'theme-switcher__option--active': currentTheme === 'light' }" aria-label="Activer le thème clair" :aria-pressed="currentTheme === 'light'" @click="setTheme('light')"><span>☀</span><b>Clair</b></button>
    <button class="theme-switcher__option" :class="{ 'theme-switcher__option--active': currentTheme === 'dark' }" aria-label="Activer le thème sombre" :aria-pressed="currentTheme === 'dark'" @click="setTheme('dark')"><span>☾</span><b>Sombre</b></button>
  </div>
</template>
