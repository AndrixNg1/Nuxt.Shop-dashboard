<script setup lang="ts">
defineProps<{ icon: string; title: string; description: string }>()
</script>

<template><div class="flex min-h-[400px] flex-col items-center justify-center p-8 text-center"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl text-gray-400 dark:bg-gray-800">{{ icon }}</div><h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">{{ title }}</h3><p class="max-w-md text-sm text-gray-400">{{ description }}</p></div></template>
