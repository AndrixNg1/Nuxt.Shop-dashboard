<script setup lang="ts">
defineProps<{ title: string; description: string; icon?: string }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <div
      class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl text-gray-400 dark:bg-gray-800"
    >
      {{ icon ?? "⌕" }}
    </div>
    <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-400">{{ description }}</p>
  </div>
</template>
