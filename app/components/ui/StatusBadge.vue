<script setup lang="ts">
withDefaults(
  defineProps<{ variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'info' }>(),
  { variant: 'neutral' }
);

const variantClass: Record<string, string> = {
  success: 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30',
  warning: 'bg-amber-100   text-amber-800   border border-amber-200   dark:bg-amber-500/20  dark:text-amber-300  dark:border-amber-500/30',
  danger:  'bg-red-100     text-red-800     border border-red-200     dark:bg-red-500/20    dark:text-red-300    dark:border-red-500/30',
  info:    'bg-sky-100     text-sky-800     border border-sky-200     dark:bg-sky-500/20    dark:text-sky-300    dark:border-sky-500/30',
  neutral: 'bg-gray-100    text-gray-700    border border-gray-200    dark:bg-gray-700/40   dark:text-gray-300   dark:border-gray-600/40',
};

const dotClass: Record<string, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger:  'bg-red-500',
  info:    'bg-sky-500',
  neutral: 'bg-gray-400',
};
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap"
    :class="variantClass[variant!]"
  >
    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" :class="dotClass[variant!]"></span>
    <slot />
  </span>
</template>
