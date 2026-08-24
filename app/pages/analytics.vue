<script setup lang="ts">
import { ref, computed } from 'vue';
import CatalogPageHeader from '~/components/catalog/CatalogPageHeader.vue';
import AnalyticsChart from '~/components/analytics/AnalyticsChart.vue';

useHead({
  title: 'Analyses — Storeflow',
  meta: [{ name: 'description', content: 'Suivez vos performances et statistiques.' }]
});

// Mock data
const summary = {
  revenue: '45 231,00 €',
  revenueGrowth: '+12.5%',
  orders: 1248,
  ordersGrowth: '+8.2%',
  conversion: '3.24%',
  conversionGrowth: '+1.1%',
  aov: '36,24 €',
  aovGrowth: '-0.5%',
};

const periods = [
  { label: 'Aujourd\'hui', value: 'today' },
  { label: '7 derniers jours', value: '7d' },
  { label: '30 derniers jours', value: '30d' },
  { label: 'Cette année', value: 'year' },
];

const selectedPeriod = ref('30d');
const isFilterOpen = ref(false);

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};

const selectPeriod = (value: string) => {
  selectedPeriod.value = value;
  isFilterOpen.value = false;
};

const selectedPeriodLabel = computed(() => {
  return periods.find(p => p.value === selectedPeriod.value)?.label || '30 derniers jours';
});

// Chart data based on period
const chartLabels = computed(() => {
  if (selectedPeriod.value === '7d') return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  if (selectedPeriod.value === 'year') return ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  if (selectedPeriod.value === 'today') return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
  // Default 30d (mock)
  return Array.from({ length: 30 }, (_, i) => `${i + 1} Août`);
});

const chartData = computed(() => {
  if (selectedPeriod.value === '7d') return [1200, 1900, 1500, 2200, 1800, 2500, 3100];
  if (selectedPeriod.value === 'year') return [12000, 15000, 14000, 18000, 22000, 24000, 21000, 25000, 28000, 27000, 32000, 45000];
  if (selectedPeriod.value === 'today') return [120, 50, 400, 800, 1200, 1500, 1100];
  // Default 30d
  return Array.from({ length: 30 }, () => Math.floor(Math.random() * 2000) + 1000);
});

// Recent activity mock
const recentActivities = [
  { id: 1, title: 'Nouvelle commande #SF-10482', time: 'Il y a 5 min', icon: '📦', color: 'bg-purple-100 text-purple-600' },
  { id: 2, title: 'Nouveau client: Sophie Dubois', time: 'Il y a 12 min', icon: '👤', color: 'bg-emerald-100 text-emerald-600' },
  { id: 3, title: 'Rupture de stock: Offre Premium', time: 'Il y a 1h', icon: '⚠️', color: 'bg-red-100 text-red-600' },
  { id: 4, title: 'Avis client 5 étoiles reçu', time: 'Il y a 2h', icon: '⭐', color: 'bg-amber-100 text-amber-600' },
  { id: 5, title: 'Commande #SF-10478 expédiée', time: 'Il y a 3h', icon: '🚚', color: 'bg-sky-100 text-sky-600' },
];

const recentOrders = [
  { id: '#SF-10482', customer: 'Sophie Dubois', amount: '129,00 €', status: 'Payée', statusClass: 'bg-emerald-100 text-emerald-700' },
  { id: '#SF-10481', customer: 'Thomas Bernard', amount: '89,00 €', status: 'En attente', statusClass: 'bg-amber-100 text-amber-700' },
  { id: '#SF-10480', customer: 'Emma Laurent', amount: '49,90 €', status: 'Payée', statusClass: 'bg-emerald-100 text-emerald-700' },
  { id: '#SF-10479', customer: 'Lucas Moreau', amount: '129,00 €', status: 'Remboursée', statusClass: 'bg-red-100 text-red-700' },
];

</script>

<template>
  <div class="flex h-full flex-col gap-8">
    <CatalogPageHeader
      eyebrow="Pilotage"
      title="Analyses"
      description="Visualisez vos performances, vos ventes et l'évolution de votre activité."
      action-label="Exporter le rapport"
    />

    <!-- KPI Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Revenue -->
      <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col gap-2 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Chiffre d'affaires</p>
          <span class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </span>
        </div>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ summary.revenue }}</p>
        <div class="flex items-center gap-1.5 mt-1">
          <span class="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
            {{ summary.revenueGrowth }}
          </span>
          <span class="text-xs text-gray-400">vs période préc.</span>
        </div>
      </div>

      <!-- Orders -->
      <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col gap-2 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all duration-500"></div>
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Commandes</p>
          <span class="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </span>
        </div>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ summary.orders }}</p>
        <div class="flex items-center gap-1.5 mt-1">
          <span class="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
            {{ summary.ordersGrowth }}
          </span>
          <span class="text-xs text-gray-400">vs période préc.</span>
        </div>
      </div>

      <!-- Conversion -->
      <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col gap-2 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Taux de conversion</p>
          <span class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          </span>
        </div>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ summary.conversion }}</p>
        <div class="flex items-center gap-1.5 mt-1">
          <span class="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
            {{ summary.conversionGrowth }}
          </span>
          <span class="text-xs text-gray-400">vs période préc.</span>
        </div>
      </div>

      <!-- AOV -->
      <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col gap-2 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Panier moyen</p>
          <span class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </span>
        </div>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ summary.aov }}</p>
        <div class="flex items-center gap-1.5 mt-1">
          <span class="text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
            {{ summary.aovGrowth }}
          </span>
          <span class="text-xs text-gray-400">vs période préc.</span>
        </div>
      </div>
    </section>

    <!-- Main Chart Area -->
    <section class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Évolution du chiffre d'affaires</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Revenus bruts sur la période sélectionnée</p>
        </div>
        
        <!-- Styled Custom Filter -->
        <div class="relative">
          <button 
            @click="toggleFilter"
            class="flex items-center justify-between gap-2 w-48 px-4 py-2 bg-gray-50 dark:bg-[#1b1a26] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <span>{{ selectedPeriodLabel }}</span>
            <svg class="w-4 h-4 text-gray-400 transition-transform duration-200" :class="isFilterOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="transform opacity-0 scale-95 -translate-y-2"
            enter-to-class="transform opacity-100 scale-100 translate-y-0"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="transform opacity-100 scale-100 translate-y-0"
            leave-to-class="transform opacity-0 scale-95 -translate-y-2"
          >
            <div v-if="isFilterOpen" class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#29293a] border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl z-20 overflow-hidden py-1">
              <button 
                v-for="period in periods" 
                :key="period.value"
                @click="selectPeriod(period.value)"
                class="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                :class="selectedPeriod === period.value ? 'font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/10' : 'text-gray-700 dark:text-gray-300 font-medium'"
              >
                {{ period.label }}
              </button>
            </div>
          </transition>
        </div>
      </div>
      
      <ClientOnly>
        <AnalyticsChart :labels="chartLabels" :data="chartData" />
        <template #fallback>
          <div class="w-full h-[300px] sm:h-[400px] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1b1a26] rounded-xl border border-gray-100 dark:border-gray-800 animate-pulse">
            <svg class="w-8 h-8 text-gray-300 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            <p class="text-sm font-medium text-gray-400">Chargement du graphique...</p>
          </div>
        </template>
      </ClientOnly>
    </section>

    <!-- Bottom Grids: Recent Activity & Recent Orders -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
      <!-- Activité Récente -->
      <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-100 dark:border-gray-800/60 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Activité récente</h3>
          <button class="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">Tout voir</button>
        </div>
        <div class="p-2">
          <ul class="flex flex-col gap-1">
            <li 
              v-for="activity in recentActivities" 
              :key="activity.id"
              class="group/item flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-[1.02] hover:shadow-md hover:shadow-gray-200/50 dark:hover:shadow-black/20 cursor-pointer"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110" :class="activity.color">
                {{ activity.icon }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ activity.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ activity.time }}</p>
              </div>
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </li>
          </ul>
        </div>
      </div>

      <!-- Commandes Récentes -->
      <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-100 dark:border-gray-800/60 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Commandes récentes</h3>
          <button class="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">Voir toutes</button>
        </div>
        <div class="p-2">
          <ul class="flex flex-col gap-1">
            <li 
              v-for="order in recentOrders" 
              :key="order.id"
              class="group/item flex items-center justify-between gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-[1.02] hover:shadow-md hover:shadow-gray-200/50 dark:hover:shadow-black/20 cursor-pointer"
            >
              <div class="flex items-center gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-gray-900 dark:text-white">{{ order.customer }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono">{{ order.id }}</span>
                </div>
              </div>
              <div class="flex items-center gap-4 text-right">
                <div class="flex flex-col items-end gap-1">
                  <span class="text-sm font-bold text-gray-900 dark:text-white">{{ order.amount }}</span>
                  <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md" :class="order.statusClass">
                    {{ order.status }}
                  </span>
                </div>
                <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
