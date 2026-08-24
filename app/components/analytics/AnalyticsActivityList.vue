<script setup lang="ts">
import type { AnalyticsActivity } from '~/types/analytics'
import AppCard from '~/components/ui/AppCard.vue'

defineProps<{ activities: AnalyticsActivity[] }>()
const toneClasses: Record<string, string> = { purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400', emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400', red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', sky: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' }
</script>

<template><AppCard class="overflow-hidden !p-0"><div class="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-800/60"><h3 class="text-lg font-bold text-gray-900 dark:text-white">Activité récente</h3><button class="text-sm font-semibold text-purple-600">Tout voir</button></div><ul class="flex flex-col gap-1 p-2"><li v-for="activity in activities" :key="activity.id" class="group flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all hover:bg-gray-50 dark:hover:bg-white/5"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg" :class="toneClasses[activity.tone]">{{ activity.icon }}</span><div class="min-w-0 flex-1"><p class="truncate text-sm font-bold text-gray-900 dark:text-white">{{ activity.title }}</p><p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p></div><span class="text-gray-300 opacity-0 transition-all group-hover:opacity-100 dark:text-gray-600">→</span></li></ul></AppCard></template>
