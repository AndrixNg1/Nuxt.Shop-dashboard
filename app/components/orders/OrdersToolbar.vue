<script setup lang="ts">
defineProps<{
  total: number;
  filtered: number;
  search: string;
  activeFilter: string;
}>();

const emit = defineEmits<{
  (e: 'update:search', v: string): void;
  (e: 'update:activeFilter', v: string): void;
}>();

const filters = [
  { label: 'Toutes', value: 'all' },
  { label: 'Payées', value: 'success' },
  { label: 'En attente', value: 'warning' },
  { label: 'Remboursées', value: 'danger' },
  { label: 'Expédiées', value: 'info' },
];
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center gap-4">
    <!-- Barre de recherche -->
    <div class="relative flex-1 max-w-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"/>
        </svg>
      </div>
      <input
        :value="search"
        type="text"
        placeholder="Rechercher une commande, un client..."
        class="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-[#1b1a26] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Filtres par statut -->
    <div class="flex items-center gap-2 flex-wrap">
      <button
        v-for="f in filters"
        :key="f.value"
        class="px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none"
        :class="activeFilter === f.value
          ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
          : 'bg-gray-100 dark:bg-[#1b1a26] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'"
        @click="emit('update:activeFilter', f.value)"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Compteur résultats -->
    <p class="text-xs text-gray-400 dark:text-gray-500 ml-auto hidden lg:block shrink-0">
      {{ filtered }} / {{ total }} commandes
    </p>
  </div>
</template>
