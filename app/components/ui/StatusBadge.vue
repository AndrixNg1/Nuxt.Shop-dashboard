<script setup lang="ts">
withDefaults(
  defineProps<{ variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'info' }>(),
  { variant: 'neutral' }
);

const variantClass: Record<string, string> = {
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  danger:  'bg-red-100   text-red-700   dark:bg-red-900/30   dark:text-red-400',
  info:    'bg-blue-100  text-blue-700  dark:bg-blue-900/30  dark:text-blue-400',
  neutral: 'bg-gray-100  text-gray-600  dark:bg-gray-800     dark:text-gray-400',
};

const dotClass: Record<string, string> = {
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger:  'bg-red-500',
  info:    'bg-blue-500',
  neutral: 'bg-gray-400',
};
</script>

<template>
  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" :class="variantClass[variant!]">
    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="dotClass[variant!]"></span>
    <slot />
  </span>
</template>
