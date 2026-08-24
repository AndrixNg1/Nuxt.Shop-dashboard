<script setup lang="ts">
import type { DashboardActivity } from "~/types/dashboard";

defineProps<{ activities: DashboardActivity[] }>();
</script>

<template>
  <AppCard>
    <div class="mb-6 flex items-start justify-between">
      <div>
        <h2 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">
          Activité récente
        </h2>
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Les dernières actions
        </p>
      </div>
      <button
        class="text-xs font-bold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400"
      >
        Tout voir
      </button>
    </div>
    <div class="space-y-5">
      <div
        v-for="activity in activities"
        :key="activity.text"
        class="group flex cursor-pointer items-center gap-4 border-b border-gray-100 pb-5 transition-transform duration-300 last:border-0 last:pb-0 hover:scale-[1.02] dark:border-gray-800/60"
      >
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-medium"
          :class="`tone-${activity.tone}`"
          >{{ activity.icon }}</span
        >
        <div class="flex flex-col gap-1">
          <strong
            class="text-sm font-semibold leading-tight text-gray-900 dark:text-white"
            >{{ activity.text }}</strong
          ><span class="text-xs text-gray-400 dark:text-gray-500">{{
            activity.time
          }}</span>
        </div>
      </div>
    </div>
  </AppCard>
</template>
