<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    value: number;
    detail: string;
    tone: "purple" | "emerald" | "amber" | "red" | "sky";
    icon: string;
    progress?: number;
  }>(),
  { progress: undefined },
);
</script>

<template>
  <article
    class="flex flex-col gap-2 rounded-2xl border p-6 shadow-sm"
    :class="`catalog-summary catalog-summary--${tone}`"
  >
    <div class="mb-1 flex items-center justify-between">
      <p
        class="text-sm font-bold uppercase tracking-wider"
        :class="`catalog-summary__label catalog-summary__label--${tone}`"
      >
        {{ label }}
      </p>
      <span class="catalog-summary__icon">{{ icon }}</span>
    </div>
    <p class="text-4xl font-extrabold text-gray-900 dark:text-white">
      {{ value }}
    </p>
    <p
      v-if="progress === undefined"
      class="text-xs text-gray-400 dark:text-gray-500"
    >
      {{ detail }}
    </p>
    <div
      v-else
      class="mt-1 h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10"
    >
      <div
        class="h-full rounded-full transition-all duration-700"
        :class="`catalog-summary__progress--${tone}`"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </article>
</template>
