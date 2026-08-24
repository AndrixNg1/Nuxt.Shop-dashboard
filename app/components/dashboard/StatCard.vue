<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  change: string;
  detail: string;
  icon: string;
  tone: string;
}>();

const getToneClass = (tone: string) => {
  switch (tone) {
    case "violet":
      return "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30";
    case "blue":
      return "text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
    case "orange":
      return "text-orange-500 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30";
    case "green":
      return "text-green-500 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
    default:
      return "text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800";
  }
};
</script>

<template>
  <div
    class="bg-white dark:bg-[#20202d] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
  >
    <div class="flex justify-between items-start mb-4">
      <span
        class="text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors"
        >{{ label }}</span
      >
      <span
        class="w-10 h-10 flex items-center justify-center rounded-xl text-xl font-bold transition-transform duration-300 group-hover:scale-110"
        :class="getToneClass(tone)"
      >
        {{ icon }}
      </span>
    </div>
    <strong
      class="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight"
      >{{ value }}</strong
    >
    <div class="flex items-center gap-2">
      <b
        class="text-xs font-bold px-2 py-0.5 rounded-md"
        :class="
          change.startsWith('+')
            ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
            : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
        "
        >{{ change }}</b
      >
      <span class="text-xs text-gray-400 dark:text-gray-500 font-medium">{{
        detail
      }}</span>
    </div>
  </div>
</template>
