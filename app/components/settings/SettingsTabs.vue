<script setup lang="ts">
import type { SettingsTab, SettingsTabId } from '~/types/settings'

defineProps<{ tabs: SettingsTab[]; activeTab: SettingsTabId }>()
const emit = defineEmits<{ (event: 'update:activeTab', value: SettingsTabId): void }>()
</script>

<template><nav class="flex w-full flex-col gap-1 lg:w-64" aria-label="Sections des paramètres"><button v-for="tab in tabs" :key="tab.id" class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all" :class="activeTab === tab.id ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'" @click="emit('update:activeTab', tab.id)"><span class="text-base">{{ tab.icon }}</span>{{ tab.label }}</button></nav></template>
