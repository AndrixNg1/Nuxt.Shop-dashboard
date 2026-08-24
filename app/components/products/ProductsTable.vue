<script setup lang="ts">
export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'active' | 'draft' | 'archived' | 'out_of_stock';
  statusLabel: string;
  image: string;
}

defineProps<{
  products: Product[];
  selectedIds?: string[];
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'edit', id: string): void;
  (e: 'status-change', id: string, status: Product['status'], label: string): void;
}>();

const statusOptions: { value: Product['status']; label: string }[] = [
  { value: 'active',       label: 'Actif' },
  { value: 'draft',        label: 'Brouillon' },
  { value: 'out_of_stock', label: 'Rupture' },
  { value: 'archived',     label: 'Archivé' },
];

const openStatusId = ref<string | null>(null);

function toggleStatusMenu(id: string, e: MouseEvent) {
  e.stopPropagation();
  openStatusId.value = openStatusId.value === id ? null : id;
}

function applyStatus(productId: string, opt: typeof statusOptions[0], e: MouseEvent) {
  e.stopPropagation();
  emit('status-change', productId, opt.value, opt.label);
  openStatusId.value = null;
}

// Convert status to badge variant
const statusToVariant = (status: Product['status']) => {
  switch (status) {
    case 'active': return 'success';
    case 'draft': return 'warning';
    case 'out_of_stock': return 'danger';
    case 'archived': return 'neutral';
    default: return 'neutral';
  }
};

onMounted(() => document.addEventListener('click', () => { openStatusId.value = null; }));
onUnmounted(() => document.removeEventListener('click', () => { openStatusId.value = null; }));
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[900px] text-left border-collapse">
      <thead>
        <tr>
          <th class="w-10 py-3.5 pr-4 border-b border-gray-100 dark:border-gray-800/60">
            <span class="sr-only">Sélection</span>
          </th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Produit</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Catégorie</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Prix</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Stock</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 border-b border-gray-100 dark:border-gray-800/60">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="group cursor-pointer transition-all duration-200 hover:bg-purple-50/40 dark:hover:bg-purple-900/[0.08]"
          @click="emit('edit', product.id)"
        >
          <!-- Checkbox -->
          <td class="py-4 pr-4 border-b border-gray-50 dark:border-gray-800/40" @click.stop>
            <input
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer accent-purple-600"
              :checked="selectedIds?.includes(product.id)"
              @change="emit('select', product.id)"
            />
          </td>

          <!-- Produit (Image + Nom) -->
          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 flex items-center justify-center overflow-hidden shrink-0">
                <span class="text-xl">{{ product.image }}</span>
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-sm text-gray-900 dark:text-white">{{ product.name }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono">{{ product.id }}</span>
              </div>
            </div>
          </td>

          <!-- Catégorie -->
          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <span class="text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg">{{ product.category }}</span>
          </td>

          <!-- Prix -->
          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <span class="font-bold text-sm text-gray-900 dark:text-white">{{ product.price }}</span>
          </td>

          <!-- Stock -->
          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full" :class="product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'"></div>
              <span class="text-sm font-medium" :class="product.stock > 10 ? 'text-gray-900 dark:text-white' : product.stock > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'">
                {{ product.stock }} unités
              </span>
            </div>
          </td>

          <!-- Statut (cliquable pour changer) -->
          <td class="py-4 border-b border-gray-50 dark:border-gray-800/40" @click.stop>
            <div class="relative flex items-center gap-3">
              <button
                class="flex items-center gap-1 focus:outline-none group/status"
                :title="`Changer le statut (${product.statusLabel})`"
                @click="toggleStatusMenu(product.id, $event)"
              >
                <StatusBadge :variant="statusToVariant(product.status)">{{ product.statusLabel }}</StatusBadge>
                <svg
                  class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0"
                  :class="openStatusId === product.id ? 'rotate-180' : ''"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <transition
                enter-active-class="transition ease-out duration-150"
                enter-from-class="transform opacity-0 scale-95 -translate-y-1"
                enter-to-class="transform opacity-100 scale-100 translate-y-0"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="openStatusId === product.id"
                  class="absolute left-0 top-full mt-2 w-44 bg-white dark:bg-[#29293a] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden py-1.5"
                >
                  <p class="px-3 pb-1.5 pt-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">Changer le statut</p>
                  <button
                    v-for="opt in statusOptions"
                    :key="opt.value"
                    class="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none"
                    :class="product.status === opt.value ? 'bg-gray-50 dark:bg-white/5' : ''"
                    @click="applyStatus(product.id, opt, $event)"
                  >
                    <StatusBadge :variant="statusToVariant(opt.value)">{{ opt.label }}</StatusBadge>
                    <svg v-if="product.status === opt.value" class="w-3.5 h-3.5 text-purple-600 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  </button>
                </div>
              </transition>

              <!-- Bouton edit -->
              <button
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 flex-shrink-0"
                title="Modifier"
                @click="emit('edit', product.id)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
