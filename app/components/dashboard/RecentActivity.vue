<script setup lang="ts">
import type { DashboardActivity } from "~/types/dashboard";

defineProps<{ activities: DashboardActivity[] }>();

const getToneClass = (tone: string) => {
  switch (tone) {
    case "violet": return "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30";
    case "blue":   return "text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
    case "orange": return "text-orange-500 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30";
    case "green":  return "text-green-500 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
    default:       return "text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800";
  }
};
</script>

<template>
  <AppCard>
    <!-- En-tête -->
    <div class="mb-5 flex items-start justify-between">
      <div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Activité récente</h2>
        <p class="mt-0.5 text-xs text-gray-400 dark:text-gray-500">Les dernières actions</p>
      </div>
      <button class="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors focus:outline-none">
        Tout voir →
      </button>
    </div>

    <!-- Liste des activités -->
    <ul class="space-y-1">
      <li
        v-for="(activity, index) in activities"
        :key="activity.text"
        class="group flex items-center gap-4 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-[1.015]"
        :class="index < activities.length - 1 ? 'border-b border-gray-100 dark:border-gray-800/50' : ''"
      >
        <!-- Icône colorée -->
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-medium transition-transform duration-200 group-hover:scale-110"
          :class="getToneClass(activity.tone)"
        >{{ activity.icon }}</span>

        <!-- Texte -->
        <div class="flex flex-1 flex-col min-w-0">
          <strong class="truncate text-sm font-semibold leading-tight text-gray-900 dark:text-white">
            {{ activity.text }}
          </strong>
          <span class="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{{ activity.time }}</span>
        </div>

        <!-- Flèche d'action au survol -->
        <svg
          class="h-4 w-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </li>
    </ul>
  </AppCard>
</template>
