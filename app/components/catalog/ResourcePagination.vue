<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    total: number;
    page: number;
    pageSize?: number;
    label: string;
  }>(),
  { pageSize: 10 },
);
const emit = defineEmits<{ (event: "update:page", page: number): void }>();
const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize)),
);
const firstItem = computed(() =>
  props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1,
);
const lastItem = computed(() =>
  Math.min(props.page * props.pageSize, props.total),
);
const goTo = (page: number) => {
  if (page >= 1 && page <= totalPages.value) emit("update:page", page);
};
</script>

<template>
  <footer
    class="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800/60"
  >
    <p class="text-sm text-gray-400 dark:text-gray-500">
      <strong class="text-gray-700 dark:text-gray-300"
        >{{ firstItem }}–{{ lastItem }}</strong
      >
      sur <strong class="text-gray-700 dark:text-gray-300">{{ total }}</strong>
      {{ label }}
    </p>
    <div class="flex items-center gap-2">
      <button
        :disabled="page === 1"
        class="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-500 transition-colors hover:border-purple-300 hover:text-purple-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700"
        @click="goTo(page - 1)"
      >
        ← <span class="hidden sm:inline">Précédent</span></button
      ><button
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="min-w-9 rounded-lg px-3 py-2 text-sm font-bold transition-colors"
        :class="
          pageNumber === page
            ? 'bg-purple-600 text-white'
            : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-400 dark:hover:bg-purple-900/20'
        "
        @click="goTo(pageNumber)"
      >
        {{ pageNumber }}</button
      ><button
        :disabled="page === totalPages"
        class="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-500 transition-colors hover:border-purple-300 hover:text-purple-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700"
        @click="goTo(page + 1)"
      >
        <span class="hidden sm:inline">Suivant</span> →
      </button>
    </div>
  </footer>
</template>
