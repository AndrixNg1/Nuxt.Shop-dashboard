<script setup lang="ts">
import type { Order } from '~/components/orders/OrdersTable.vue';

useHead({
  title: 'Commandes — Storeflow',
  meta: [{ name: 'description', content: 'Gérez et suivez toutes vos commandes.' }]
});

const allOrders = ref<Order[]>([
  { id: '#SF-10482', customer: 'Sophie Dubois',    initials: 'SD', product: 'Pack essentiel',   date: '24 août 2026',  amount: '129,00 €', status: 'success', statusLabel: 'Payée' },
  { id: '#SF-10481', customer: 'Thomas Bernard',   initials: 'TB', product: 'Abonnement Pro',   date: '24 août 2026',  amount: '89,00 €',  status: 'warning', statusLabel: 'En attente' },
  { id: '#SF-10480', customer: 'Emma Laurent',     initials: 'EL', product: 'Kit découverte',   date: '23 août 2026',  amount: '49,90 €',  status: 'success', statusLabel: 'Payée' },
  { id: '#SF-10479', customer: 'Lucas Moreau',     initials: 'LM', product: 'Pack essentiel',   date: '23 août 2026',  amount: '129,00 €', status: 'danger',  statusLabel: 'Remboursée' },
  { id: '#SF-10478', customer: 'Camille Petit',    initials: 'CP', product: 'Offre Premium',    date: '22 août 2026',  amount: '199,00 €', status: 'info',    statusLabel: 'Expédiée' },
  { id: '#SF-10477', customer: 'Antoine Durand',   initials: 'AD', product: 'Kit découverte',   date: '22 août 2026',  amount: '49,90 €',  status: 'success', statusLabel: 'Payée' },
  { id: '#SF-10476', customer: 'Julie Martin',     initials: 'JM', product: 'Abonnement Pro',   date: '21 août 2026',  amount: '89,00 €',  status: 'warning', statusLabel: 'En attente' },
  { id: '#SF-10475', customer: 'Pierre Lecomte',   initials: 'PL', product: 'Offre Premium',    date: '21 août 2026',  amount: '199,00 €', status: 'info',    statusLabel: 'Expédiée' },
  { id: '#SF-10474', customer: 'Marie Fournier',   initials: 'MF', product: 'Pack essentiel',   date: '20 août 2026',  amount: '129,00 €', status: 'success', statusLabel: 'Payée' },
  { id: '#SF-10473', customer: 'David Girard',     initials: 'DG', product: 'Kit découverte',   date: '20 août 2026',  amount: '49,90 €',  status: 'danger',  statusLabel: 'Remboursée' },
  { id: '#SF-10472', customer: 'Élodie Rousseau',  initials: 'ER', product: 'Abonnement Pro',   date: '19 août 2026',  amount: '89,00 €',  status: 'success', statusLabel: 'Payée' },
  { id: '#SF-10471', customer: 'Maxime Blanc',     initials: 'MB', product: 'Offre Premium',    date: '19 août 2026',  amount: '199,00 €', status: 'info',    statusLabel: 'Expédiée' },
]);

const search        = ref('');
const activeFilter  = ref('all');
const selectedIds   = ref<string[]>([]);

const filteredOrders = computed(() => {
  let list = allOrders.value;
  if (activeFilter.value !== 'all') {
    list = list.filter(o => o.status === activeFilter.value);
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q)
    );
  }
  return list;
});

const statusSummary = computed(() => ({
  total:   allOrders.value.length,
  paid:    allOrders.value.filter(o => o.status === 'success').length,
  pending: allOrders.value.filter(o => o.status === 'warning').length,
  shipped: allOrders.value.filter(o => o.status === 'info').length,
}));

function toggleSelect(id: string) {
  const idx = selectedIds.value.indexOf(id);
  if (idx === -1) selectedIds.value.push(id);
  else            selectedIds.value.splice(idx, 1);
}

function changeStatus(id: string, status: Order['status'], label: string) {
  const order = allOrders.value.find(o => o.id === id);
  if (order) { order.status = status; order.statusLabel = label; }
}

function viewOrder(id: string) {
  console.log('Voir commande', id);
}
</script>

<template>
  <div class="flex flex-col gap-8 h-full">

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p class="text-xs font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest mb-1.5">Gestion</p>
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white m-0 leading-tight">Commandes</h1>
        <p class="text-base text-gray-500 dark:text-gray-400 mt-2">Consultez et gérez l'ensemble des commandes de votre boutique.</p>
      </div>
      <button class="inline-flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Nouvelle commande
      </button>
    </div>

    <section class="grid grid-cols-2 xl:grid-cols-4 gap-5">
      <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total</p>
          <span class="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.total }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">commandes ce mois</p>
      </div>
      <div class="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-700/40 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Payées</p>
          <span class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.paid }}</p>
        <div class="h-1.5 rounded-full bg-emerald-200 dark:bg-emerald-900/40 overflow-hidden mt-1">
          <div class="h-full bg-emerald-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.paid / statusSummary.total) * 100}%` }"></div>
        </div>
      </div>
      <div class="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-700/40 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">En attente</p>
          <span class="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.pending }}</p>
        <div class="h-1.5 rounded-full bg-amber-200 dark:bg-amber-900/40 overflow-hidden mt-1">
          <div class="h-full bg-amber-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.pending / statusSummary.total) * 100}%` }"></div>
        </div>
      </div>
      <div class="bg-sky-50 dark:bg-sky-900/10 rounded-2xl border border-sky-200 dark:border-sky-700/40 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Expédiées</p>
          <span class="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.shipped }}</p>
        <div class="h-1.5 rounded-full bg-sky-200 dark:bg-sky-900/40 overflow-hidden mt-1">
          <div class="h-full bg-sky-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.shipped / statusSummary.total) * 100}%` }"></div>
        </div>
      </div>
    </section>

    <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col flex-1 min-h-0">
      <div class="p-6 border-b border-gray-100 dark:border-gray-800/60">
        <OrdersToolbar
          :total="allOrders.length"
          :filtered="filteredOrders.length"
          :search="search"
          :active-filter="activeFilter"
          @update:search="search = $event"
          @update:active-filter="activeFilter = $event"
        />
      </div>

      <div v-if="filteredOrders.length === 0" class="flex-1 flex flex-col items-center justify-center text-center py-20">
        <div class="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Aucune commande trouvée</h3>
        <p class="text-sm text-gray-400">Essayez de modifier vos filtres ou votre recherche.</p>
      </div>

      <div v-else class="flex-1 overflow-auto px-6">
        <OrdersTable
          :orders="filteredOrders"
          :selected-ids="selectedIds"
          @select="toggleSelect"
          @view="viewOrder"
          @status-change="changeStatus"
        />
      </div>

      <div class="p-5 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between">
        <p class="text-sm text-gray-400 dark:text-gray-500">
          <span class="font-semibold text-gray-700 dark:text-gray-300">{{ filteredOrders.length }}</span> / <span class="font-semibold text-gray-700 dark:text-gray-300">{{ allOrders.length }}</span> commandes
        </p>
        <div class="flex items-center gap-2">
          <button class="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors disabled:opacity-40" disabled>← Précédent</button>
          <span class="px-4 py-2 text-sm font-bold rounded-lg bg-purple-600 text-white">1</span>
          <button class="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors disabled:opacity-40" disabled>Suivant →</button>
        </div>
      </div>
    </div>

  </div>
</template>

