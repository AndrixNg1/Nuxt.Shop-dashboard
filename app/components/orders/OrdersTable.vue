<script setup lang="ts">
import type { Order } from '~/types/catalog';

defineProps<{
  orders: Order[];
  selectedIds?: string[];
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'view', id: string): void;
  (e: 'status-change', id: string, status: Order['status'], label: string): void;
}>();

const statusOptions: { value: Order['status']; label: string }[] = [
  { value: 'success', label: 'Payée' },
  { value: 'warning', label: 'En attente' },
  { value: 'info',    label: 'Expédiée' },
  { value: 'danger',  label: 'Remboursée' },
  { value: 'neutral', label: 'Annulée' },
];

// ID de la ligne dont le menu statut est ouvert
const openStatusId = ref<string | null>(null);

function toggleStatusMenu(id: string, e: MouseEvent) {
  e.stopPropagation();
  openStatusId.value = openStatusId.value === id ? null : id;
}

function applyStatus(orderId: string, opt: typeof statusOptions[0], e: MouseEvent) {
  e.stopPropagation();
  emit('status-change', orderId, opt.value, opt.label);
  openStatusId.value = null;
}

// Ferme le menu si click en dehors
onMounted(() => document.addEventListener('click', () => { openStatusId.value = null; }));
onUnmounted(() => document.removeEventListener('click', () => { openStatusId.value = null; }));
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[860px] text-left border-collapse">
      <thead>
        <tr>
          <th class="w-10 py-3.5 pr-4 border-b border-gray-100 dark:border-gray-800/60">
            <span class="sr-only">Sélection</span>
          </th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Commande</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Client</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Produit</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Date</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Montant</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 border-b border-gray-100 dark:border-gray-800/60">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="group cursor-pointer transition-all duration-200 hover:bg-purple-50/40 dark:hover:bg-purple-900/[0.08]"
          @click="emit('view', order.id)"
        >
          <td class="py-4 pr-4 border-b border-gray-50 dark:border-gray-800/40" @click.stop>
            <input
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer accent-purple-600"
              :checked="selectedIds?.includes(order.id)"
              @change="emit('select', order.id)"
            />
          </td>

          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <span class="font-bold text-sm text-gray-900 dark:text-white font-mono">{{ order.id }}</span>
          </td>

          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <div class="flex items-center gap-3">
              <UserAvatar :initials="order.initials" size="sm" />
              <div class="flex flex-col leading-tight">
                <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ order.customer }}</span>
              </div>
            </div>
          </td>

          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ order.product }}</span>
          </td>

          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ order.date }}</span>
          </td>

          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <span class="font-bold text-sm text-gray-900 dark:text-white">{{ order.amount }}</span>
          </td>

          <td class="py-4 border-b border-gray-50 dark:border-gray-800/40" @click.stop>
            <div class="relative flex items-center gap-3">
              <button
                class="flex items-center gap-1 focus:outline-none group/status"
                :title="`Changer le statut (${order.statusLabel})`"
                @click="toggleStatusMenu(order.id, $event)"
              >
                <StatusBadge :variant="order.status">{{ order.statusLabel }}</StatusBadge>
                <svg
                  class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0"
                  :class="openStatusId === order.id ? 'rotate-180' : ''"
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
                  v-if="openStatusId === order.id"
                  class="absolute left-0 top-full mt-2 w-44 bg-white dark:bg-[#29293a] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden py-1.5"
                >
                  <p class="px-3 pb-1.5 pt-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">Changer le statut</p>
                  <button
                    v-for="opt in statusOptions"
                    :key="opt.value"
                    class="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none"
                    :class="order.status === opt.value ? 'bg-gray-50 dark:bg-white/5' : ''"
                    @click="applyStatus(order.id, opt, $event)"
                  >
                    <StatusBadge :variant="opt.value">{{ opt.label }}</StatusBadge>
                    <svg v-if="order.status === opt.value" class="w-3.5 h-3.5 text-purple-600 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  </button>
                </div>
              </transition>

              <button
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 flex-shrink-0"
                title="Voir le détail"
                @click="emit('view', order.id)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
