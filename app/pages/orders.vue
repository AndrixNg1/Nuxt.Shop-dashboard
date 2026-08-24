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
  <div class="space-y-8">

    <!-- En-tête page -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Gestion</p>
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white m-0">Commandes</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1.5">Consultez et gérez l'ensemble des commandes de votre boutique.</p>
      </div>
      <button class="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Nouvelle commande
      </button>
    </div>

    <!-- Cartes récap statuts -->
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <AppCard>
        <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Total</p>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.total }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">commandes ce mois</p>
      </AppCard>
      <AppCard>
        <p class="text-xs font-semibold text-green-500 uppercase tracking-wider mb-3">Payées</p>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.paid }}</p>
        <div class="mt-2 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div class="h-full bg-green-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.paid / statusSummary.total) * 100}%` }"></div>
        </div>
      </AppCard>
      <AppCard>
        <p class="text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-3">En attente</p>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.pending }}</p>
        <div class="mt-2 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div class="h-full bg-yellow-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.pending / statusSummary.total) * 100}%` }"></div>
        </div>
      </AppCard>
      <AppCard>
        <p class="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-3">Expédiées</p>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.shipped }}</p>
        <div class="mt-2 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div class="h-full bg-blue-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.shipped / statusSummary.total) * 100}%` }"></div>
        </div>
      </AppCard>
    </section>

    <!-- Table -->
    <AppCard>
      <div class="mb-6">
        <OrdersToolbar
          :total="allOrders.length"
          :filtered="filteredOrders.length"
          :search="search"
          :active-filter="activeFilter"
          @update:search="search = $event"
          @update:active-filter="activeFilter = $event"
        />
      </div>

      <!-- État vide -->
      <div v-if="filteredOrders.length === 0" class="py-16 flex flex-col items-center justify-center text-center">
        <div class="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        </div>
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-1">Aucune commande trouvée</h3>
        <p class="text-sm text-gray-400">Essayez de modifier vos filtres ou votre recherche.</p>
      </div>

      <!-- Table -->
      <OrdersTable
        v-else
        :orders="filteredOrders"
        :selected-ids="selectedIds"
        @select="toggleSelect"
        @view="viewOrder"
        @status-change="changeStatus"
      />

      <!-- Pagination -->
      <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between">
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Affichage de <span class="font-semibold text-gray-700 dark:text-gray-300">{{ filteredOrders.length }}</span> sur <span class="font-semibold text-gray-700 dark:text-gray-300">{{ allOrders.length }}</span> commandes
        </p>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors disabled:opacity-40" disabled>
            ← Précédent
          </button>
          <span class="px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-600 text-white">1</span>
          <button class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors disabled:opacity-40" disabled>
            Suivant →
          </button>
        </div>
      </div>
    </AppCard>

  </div>
</template>
