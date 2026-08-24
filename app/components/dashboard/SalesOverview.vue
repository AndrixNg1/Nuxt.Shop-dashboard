<script setup lang="ts">
import { computed, ref } from "vue";
import AppCard from "~/components/ui/AppCard.vue";
import SalesChart from "~/components/dashboard/SalesChart.vue";

const filterOptions = [
  { label: "1 semaine", value: "week" },
  { label: "Mensuel", value: "month" },
  { label: "3 mois", value: "3months" },
  { label: "Annuel", value: "year" },
];
const selectedFilter = ref("week");
const isFilterOpen = ref(false);
const selectedFilterLabel = computed(
  () =>
    filterOptions.find((option) => option.value === selectedFilter.value)
      ?.label ?? "1 semaine",
);
const salesData = computed(
  () =>
    ({
      week: { total: "8 420 €", change: "+18,4%", trend: "up" },
      month: { total: "24 580 €", change: "+12,8%", trend: "up" },
      "3months": { total: "68 350 €", change: "+5,2%", trend: "up" },
      year: { total: "284 100 €", change: "-2,1%", trend: "down" },
    })[selectedFilter.value] ?? {
      total: "8 420 €",
      change: "+18,4%",
      trend: "up",
    },
);
</script>

<template>
  <AppCard class="xl:col-span-2">
    <div class="mb-2 flex items-start justify-between">
      <div>
        <h2 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">
          Ventes
        </h2>
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Évolution de votre chiffre d'affaires
        </p>
      </div>
      <div class="relative">
        <button
          class="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:border-purple-300 focus:outline-none dark:border-gray-700 dark:bg-[#1b1a26] dark:text-gray-300"
          @click="isFilterOpen = !isFilterOpen"
        >
          {{ selectedFilterLabel }}
          <span
            :class="isFilterOpen ? 'rotate-180' : ''"
            class="transition-transform"
            >⌄</span
          >
        </button>
        <div
          v-if="isFilterOpen"
          class="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl dark:border-gray-800 dark:bg-[#29293a]"
        >
          <button
            v-for="option in filterOptions"
            :key="option.value"
            class="block w-full px-4 py-2 text-left text-xs font-medium transition-colors hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20"
            :class="
              selectedFilter === option.value
                ? 'bg-purple-50/50 text-purple-600 dark:bg-purple-900/10 dark:text-purple-400'
                : 'text-gray-700 dark:text-gray-300'
            "
            @click="
              selectedFilter = option.value;
              isFilterOpen = false;
            "
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="mb-2 mt-6 flex items-baseline gap-3">
      <strong
        class="text-3xl font-extrabold text-gray-900 transition-all dark:text-white"
        >{{ salesData.total }}</strong
      ><span
        class="rounded-md px-2 py-1 text-xs font-bold"
        :class="
          salesData.trend === 'up'
            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
        "
        >{{ salesData.change }}
        <small class="ml-1 font-normal text-gray-400 dark:text-gray-500"
          >vs période précédente</small
        ></span
      >
    </div>
    <SalesChart :period="selectedFilter" aria-label="Graphique des ventes" />
  </AppCard>
</template>
