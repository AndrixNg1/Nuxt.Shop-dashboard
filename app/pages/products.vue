<script setup lang="ts">
import type { Product } from '~/components/products/ProductsTable.vue';

useHead({
  title: 'Produits — Storeflow',
  meta: [{ name: 'description', content: 'Gérez votre catalogue de produits.' }]
});

const allProducts = ref<Product[]>([
  { id: 'PRD-001', name: 'Pack Essentiel', category: 'Packs', price: '129,00 €', stock: 45, status: 'active', statusLabel: 'Actif' },
  { id: 'PRD-002', name: 'Abonnement Pro', category: 'Services', price: '89,00 €', stock: 999, status: 'active', statusLabel: 'Actif' },
  { id: 'PRD-003', name: 'Kit Découverte', category: 'Packs', price: '49,90 €', stock: 12, status: 'active', statusLabel: 'Actif' },
  { id: 'PRD-004', name: 'Offre Premium', category: 'Services', price: '199,00 €', stock: 0, status: 'out_of_stock', statusLabel: 'Rupture' },
  { id: 'PRD-005', name: 'Consulting 1h', category: 'Services', price: '150,00 €', stock: 5, status: 'active', statusLabel: 'Actif' },
  { id: 'PRD-006', name: 'Template Starter', category: 'Digital', price: '29,00 €', stock: 999, status: 'draft', statusLabel: 'Brouillon' },
  { id: 'PRD-007', name: 'Audit SEO', category: 'Services', price: '299,00 €', stock: 2, status: 'active', statusLabel: 'Actif' },
  { id: 'PRD-008', name: 'Ancien Pack (V1)', category: 'Packs', price: '99,00 €', stock: 0, status: 'archived', statusLabel: 'Archivé' },
]);

const search = ref('');
const activeFilter = ref('all');
const selectedIds = ref<string[]>([]);

const filteredProducts = computed(() => {
  let list = allProducts.value;
  if (activeFilter.value !== 'all') {
    list = list.filter(p => p.status === activeFilter.value);
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  return list;
});

const statusSummary = computed(() => ({
  total:   allProducts.value.length,
  active:  allProducts.value.filter(p => p.status === 'active').length,
  draft:   allProducts.value.filter(p => p.status === 'draft').length,
  outOfStock: allProducts.value.filter(p => p.status === 'out_of_stock').length,
}));

function toggleSelect(id: string) {
  const idx = selectedIds.value.indexOf(id);
  if (idx === -1) selectedIds.value.push(id);
  else            selectedIds.value.splice(idx, 1);
}

function changeStatus(id: string, status: Product['status'], label: string) {
  const product = allProducts.value.find(p => p.id === id);
  if (product) {
    product.status = status;
    product.statusLabel = label;
  }
}

function editProduct(id: string) {
  console.log('Modifier produit', id);
}
</script>

<template>
  <div class="flex flex-col gap-8 h-full">

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p class="text-xs font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest mb-1.5">Catalogue</p>
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white m-0 leading-tight">Produits</h1>
        <p class="text-base text-gray-500 dark:text-gray-400 mt-2">Gérez vos articles, leurs prix et leurs niveaux de stock.</p>
      </div>
      <button class="inline-flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Ajouter un produit
      </button>
    </div>

    <section class="grid grid-cols-2 xl:grid-cols-4 gap-5">
      <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Produits</p>
          <span class="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.total }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">dans votre catalogue</p>
      </div>
      <div class="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-700/40 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Actifs</p>
          <span class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.active }}</p>
        <div class="h-1.5 rounded-full bg-emerald-200 dark:bg-emerald-900/40 overflow-hidden mt-1">
          <div class="h-full bg-emerald-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.active / statusSummary.total) * 100}%` }"></div>
        </div>
      </div>
      <div class="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-700/40 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Brouillons</p>
          <span class="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.draft }}</p>
        <div class="h-1.5 rounded-full bg-amber-200 dark:bg-amber-900/40 overflow-hidden mt-1">
          <div class="h-full bg-amber-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.draft / statusSummary.total) * 100}%` }"></div>
        </div>
      </div>
      <div class="bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-700/40 shadow-sm p-6 flex flex-col gap-2">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Rupture de stock</p>
          <span class="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </span>
        </div>
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ statusSummary.outOfStock }}</p>
        <div class="h-1.5 rounded-full bg-red-200 dark:bg-red-900/40 overflow-hidden mt-1">
          <div class="h-full bg-red-500 rounded-full transition-all duration-700" :style="{ width: `${(statusSummary.outOfStock / statusSummary.total) * 100}%` }"></div>
        </div>
      </div>
    </section>

    <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col flex-1 min-h-0">
      <div class="p-6 border-b border-gray-100 dark:border-gray-800/60">
        <ProductsToolbar
          :total="allProducts.length"
          :filtered="filteredProducts.length"
          :search="search"
          :active-filter="activeFilter"
          @update:search="search = $event"
          @update:active-filter="activeFilter = $event"
        />
      </div>

      <div v-if="filteredProducts.length === 0" class="flex-1 flex flex-col items-center justify-center text-center py-20">
        <div class="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Aucun produit trouvé</h3>
        <p class="text-sm text-gray-400">Essayez de modifier vos filtres ou votre recherche.</p>
      </div>

      <div v-else class="flex-1 overflow-auto px-6">
        <ProductsTable
          :products="filteredProducts"
          :selected-ids="selectedIds"
          @select="toggleSelect"
          @edit="editProduct"
          @status-change="changeStatus"
        />
      </div>

      <div class="p-5 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between">
        <p class="text-sm text-gray-400 dark:text-gray-500">
          <span class="font-semibold text-gray-700 dark:text-gray-300">{{ filteredProducts.length }}</span> / <span class="font-semibold text-gray-700 dark:text-gray-300">{{ allProducts.length }}</span> produits
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
