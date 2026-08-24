<script setup lang="ts">
import type { AnalyticsPeriod } from '~/types/analytics'

defineProps<{ periods: { label: string; value: AnalyticsPeriod }[]; modelValue: AnalyticsPeriod; selectedLabel: string }>()
const emit = defineEmits<{ (event: 'update:modelValue', value: AnalyticsPeriod): void }>()
const open = ref(false)
</script>

<template><div class="relative"><button class="flex w-48 items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-purple-300 dark:border-gray-700 dark:bg-[#1b1a26] dark:text-gray-300" @click="open = !open">{{ selectedLabel }} <span :class="open ? 'rotate-180' : ''" class="transition-transform">⌄</span></button><div v-if="open" class="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl dark:border-gray-800 dark:bg-[#29293a]"><button v-for="period in periods" :key="period.value" class="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-white/5" :class="modelValue === period.value ? 'bg-purple-50 font-bold text-purple-600 dark:bg-purple-900/10 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'" @click="emit('update:modelValue', period.value); open = false">{{ period.label }}</button></div></div></template>
