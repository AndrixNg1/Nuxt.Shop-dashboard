<script setup lang="ts">
import type { DashboardStat } from "~/types/dashboard";
import StatCard from "~/components/dashboard/StatCard.vue";

defineProps<{ stats: DashboardStat[] }>();
</script>

<template>
  <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard v-for="stat in stats" :key="stat.label" v-bind="stat" />
  </section>
</template>
