<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
}>();
</script>

<template>
  <section
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <p
        class="mb-1.5 text-xs font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400"
      >
        {{ eyebrow }}
      </p>
      <h1
        class="m-0 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white"
      >
        {{ title }}
      </h1>
      <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
    <AppButton class="shrink-0">＋ {{ actionLabel }}</AppButton>
  </section>
</template>
