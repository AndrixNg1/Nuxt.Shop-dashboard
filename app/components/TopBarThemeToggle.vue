<script setup lang="ts">
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <button
    class="flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 hover:bg-gray-100 dark:hover:bg-[#2a244c] focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md"
    aria-label="Changer le thème"
    @click="toggleTheme"
  >
    <ClientOnly>
      <!-- Mode Sombre : Soleil -->
      <svg
        v-if="colorMode.value === 'dark'"
        class="w-6 h-6 text-yellow-400 drop-shadow-sm animate-pop"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <!-- Mode Clair : Lune -->
      <svg
        v-else
        class="w-6 h-6 text-[#7658ef] drop-shadow-sm animate-pop"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      <!-- Fallback pendant le chargement -->
      <template #fallback>
        <svg
          class="w-6 h-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20z" />
        </svg>
      </template>
    </ClientOnly>
  </button>
</template>

<style scoped>
@keyframes pop {
  0% {
    transform: scale(0.5) rotate(-30deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
}
.animate-pop {
  animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
