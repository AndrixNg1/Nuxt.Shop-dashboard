<script setup lang="ts">
withDefaults(
  defineProps<{ initials: string; size?: 'sm' | 'md' | 'lg' | 'small' | 'tiny' | 'default' }>(),
  { size: 'md' }
);

const sizeClass: Record<string, string> = {
  tiny:    'w-7  h-7  text-[10px]',
  small:   'w-8  h-8  text-xs',
  sm:      'w-8  h-8  text-xs',
  default: 'w-9  h-9  text-sm',
  md:      'w-9  h-9  text-sm',
  lg:      'w-11 h-11 text-base',
};
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-xl font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 flex-shrink-0"
    :class="sizeClass[size!] ?? sizeClass.md"
  >{{ initials }}</span>
</template>
