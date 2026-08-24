<script setup lang="ts">
import type { ResourceFilter } from "~/types/catalog";

const props = defineProps<{
  total: number;
  filtered: number;
  search: string;
  activeFilter: string;
  filters: ResourceFilter[];
  placeholder: string;
  resourceLabel: string;
}>();
const emit = defineEmits<{
  (event: "update:search", value: string): void;
  (event: "update:activeFilter", value: string): void;
}>();
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
    <div class="relative max-w-sm flex-1">
      <span
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
        >⌕</span
      ><input
        :value="props.search"
        type="search"
        :placeholder="placeholder"
        class="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-[#1b1a26] dark:text-gray-100"
        @input="
          emit('update:search', ($event.target as HTMLInputElement).value)
        "
      />
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="filter in filters"
        :key="filter.value"
        class="rounded-xl px-3 py-2 text-xs font-semibold transition-all"
        :class="
          activeFilter === filter.value
            ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-[#1b1a26] dark:text-gray-400 dark:hover:bg-gray-800'
        "
        @click="emit('update:activeFilter', filter.value)"
      >
        {{ filter.label }}
      </button>
    </div>
    <p
      class="ml-auto hidden shrink-0 text-xs text-gray-400 dark:text-gray-500 lg:block"
    >
      {{ filtered }} / {{ total }} {{ resourceLabel }}
    </p>
  </div>
</template>
