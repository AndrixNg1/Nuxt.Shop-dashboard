<script setup lang="ts">
import type { Customer } from '~/components/customers/CustomersTable.vue';

useHead({
  title: 'Clients — Storeflow',
  meta: [{ name: 'description', content: 'Gérez et suivez votre clientèle.' }]
});

const allCustomers = ref<Customer[]>([
  { id: 'CUST-001', name: 'Sophie Dubois', initials: 'SD', email: 'sophie.dubois@example.com', phone: '+33 6 12 34 56 78', location: 'Paris, FR', totalOrders: 12, totalSpent: '1 450,00 €', status: 'active', statusLabel: 'Actif' },
  { id: 'CUST-002', name: 'Thomas Bernard', initials: 'TB', email: 'thomas.b@example.com', phone: '+33 6 98 76 54 32', location: 'Lyon, FR', totalOrders: 3, totalSpent: '295,00 €', status: 'inactive', statusLabel: 'Inactif' },
  { id: 'CUST-003', name: 'Emma Laurent', initials: 'EL', email: 'emma.laurent@example.com', phone: '+33 7 11 22 33 44', location: 'Marseille, FR', totalOrders: 8, totalSpent: '890,50 €', status: 'active', statusLabel: 'Actif' },
  { id: 'CUST-004', name: 'Lucas Moreau', initials: 'LM', email: 'lucas.moreau@example.com', phone: '+33 6 55 44 33 22', location: 'Bordeaux, FR', totalOrders: 1, totalSpent: '49,90 €', status: 'blocked', statusLabel: 'Bloqué' },
  { id: 'CUST-005', name: 'Camille Petit', initials: 'CP', email: 'c.petit@example.com', phone: '+33 7 99 88 77 66', location: 'Nantes, FR', totalOrders: 5, totalSpent: '640,00 €', status: 'active', statusLabel: 'Actif' },
  { id: 'CUST-006', name: 'Antoine Durand', initials: 'AD', email: 'antoine.d@example.com', phone: '+33 6 11 33 55 77', location: 'Lille, FR', totalOrders: 0, totalSpent: '0,00 €', status: 'inactive', statusLabel: 'Inactif' },
]);

const search = ref('');
const activeFilter = ref('all');
const selectedIds = ref<string[]>([]);

const filteredCustomers = computed(() => {
  let list = allCustomers.value;
  if (activeFilter.value !== 'all') {
    list = list.filter(c => c.status === activeFilter.value);
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  }
  return list;
});

const statusSummary = computed(() => ({
  total:    allCustomers.value.length,
  active:   allCustomers.value.filter(c => c.status === 'active').length,
  inactive: allCustomers.value.filter(c => c.status === 'inactive').length,
  blocked:  allCustomers.value.filter(c => c.status === 'blocked').length,
}));

function toggleSelect(id: string) {
  const idx = selectedIds.value.indexOf(id);
  if (idx === -1) selectedIds.value.push(id);
  else            selectedIds.value.splice(idx, 1);
}

function changeStatus(id: string, status: Customer['status'], label: string) {
  const customer = allCustomers.value.find(c => c.id === id);
  if (customer) {
    customer.status = status;
    customer.statusLabel = label;
  }
}

function viewCustomer(id: string) {
  console.log('Voir client', id);
}
</script>

<template>
  <div class="flex flex-col gap-8 h-full">

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p class="text-xs font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest mb-1.5">Relation client</p>
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white m-0 leading-tight">Clients</h1>
        <p class="text-base text-gray-500 dark:text-gray-400 mt-2">Suivez vos clients, leur historique d'achat et leurs coordonnées.</p>
      </div>
      <button class="inline-flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Nouveau client
      </button>
    </div>

    <section class="grid grid-cols-2 xl:grid-cols-4 gap-5">
      <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Clients</p>
          <span class="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.total }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">inscrits sur la boutique</p>
      </div>
      <div class="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-700/40 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Actifs</p>
          <span class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.active }}</p>
        <div class="h-1.5 rounded-full bg-emerald-200 dark:bg-emerald-900/40 overflow-hidden mt-1">
          <div class="h-full bg-emerald-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.active / statusSummary.total) * 100}%` }"></div>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Inactifs</p>
          <span class="w-9 h-9 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.inactive }}</p>
        <div class="h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden mt-1">
          <div class="h-full bg-gray-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.inactive / statusSummary.total) * 100}%` }"></div>
        </div>
      </div>
      <div class="bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-700/40 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Bloqués</p>
          <span class="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.blocked }}</p>
        <div class="h-1.5 rounded-full bg-red-200 dark:bg-red-900/40 overflow-hidden mt-1">
          <div class="h-full bg-red-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.blocked / statusSummary.total) * 100}%` }"></div>
        </div>
      </div>
    </section>

    <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col flex-1 min-h-0">
      <div class="p-6 border-b border-gray-100 dark:border-gray-800/60">
        <CustomersToolbar
          :total="allCustomers.length"
          :filtered="filteredCustomers.length"
          :search="search"
          :active-filter="activeFilter"
          @update:search="search = $event"
          @update:active-filter="activeFilter = $event"
        />
      </div>

      <div v-if="filteredCustomers.length === 0" class="flex-1 flex flex-col items-center justify-center text-center py-20">
        <div class="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Aucun client trouvé</h3>
        <p class="text-sm text-gray-400">Essayez de modifier vos filtres ou votre recherche.</p>
      </div>

      <div v-else class="flex-1 overflow-auto px-6">
        <CustomersTable
          :customers="filteredCustomers"
          :selected-ids="selectedIds"
          @select="toggleSelect"
          @view="viewCustomer"
          @status-change="changeStatus"
        />
      </div>

      <div class="p-5 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between">
        <p class="text-sm text-gray-400 dark:text-gray-500">
          <span class="font-semibold text-gray-700 dark:text-gray-300">{{ filteredCustomers.length }}</span> / <span class="font-semibold text-gray-700 dark:text-gray-300">{{ allCustomers.length }}</span> clients
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
