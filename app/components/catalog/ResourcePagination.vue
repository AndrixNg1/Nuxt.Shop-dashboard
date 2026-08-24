<script setup lang="ts">
defineProps<{ shown: number; total: number; label: string }>();
</script>

<template>
  <footer
    class="flex items-center justify-between border-t border-gray-100 p-5 dark:border-gray-800/60"
  >
    <p class="text-sm text-gray-400 dark:text-gray-500">
      <strong class="text-gray-700 dark:text-gray-300">{{ shown }}</strong> /
      <strong class="text-gray-700 dark:text-gray-300">{{ total }}</strong>
      {{ label }}
    </p>
    <div class="flex items-center gap-2">
      <button
        disabled
        class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 opacity-40 dark:border-gray-700"
      >
        ← Précédent</button
      ><span
        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white"
        >1</span
      ><button
        disabled
        class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 opacity-40 dark:border-gray-700"
      >
        Suivant →
      </button>
    </div>
  </footer>
</template>
