<script setup lang="ts">
export interface Order {
  id: string;
  customer: string;
  initials: string;
  product: string;
  date: string;
  amount: string;
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  statusLabel: string;
}

defineProps<{
  orders: Order[];
  selectedIds?: string[];
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'view', id: string): void;
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[800px] text-left border-collapse">
      <thead>
        <tr>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3 pr-4 border-b border-gray-100 dark:border-gray-800/60 w-12">
            <span class="sr-only">Sélection</span>
          </th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3 pr-4 border-b border-gray-100 dark:border-gray-800/60">Commande</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3 pr-4 border-b border-gray-100 dark:border-gray-800/60">Client</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3 pr-4 border-b border-gray-100 dark:border-gray-800/60">Produit</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3 pr-4 border-b border-gray-100 dark:border-gray-800/60">Date</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3 pr-4 border-b border-gray-100 dark:border-gray-800/60">Montant</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3 border-b border-gray-100 dark:border-gray-800/60">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="group cursor-pointer transition-all duration-200 hover:bg-purple-50/40 dark:hover:bg-purple-900/10"
          @click="emit('view', order.id)"
        >
          <!-- Checkbox -->
          <td class="py-4 pr-4 border-b border-gray-50 dark:border-gray-800/40">
            <input
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
              :checked="selectedIds?.includes(order.id)"
              @click.stop="emit('select', order.id)"
            />
          </td>
          <!-- ID -->
          <td class="py-4 pr-4 border-b border-gray-50 dark:border-gray-800/40">
            <span class="font-bold text-sm text-gray-900 dark:text-white">{{ order.id }}</span>
          </td>
          <!-- Client -->
          <td class="py-4 pr-4 border-b border-gray-50 dark:border-gray-800/40">
            <div class="flex items-center gap-3">
              <UserAvatar :initials="order.initials" size="sm" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ order.customer }}</span>
            </div>
          </td>
          <!-- Produit -->
          <td class="py-4 pr-4 border-b border-gray-50 dark:border-gray-800/40">
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ order.product }}</span>
          </td>
          <!-- Date -->
          <td class="py-4 pr-4 border-b border-gray-50 dark:border-gray-800/40">
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ order.date }}</span>
          </td>
          <!-- Montant -->
          <td class="py-4 pr-4 border-b border-gray-50 dark:border-gray-800/40">
            <span class="font-bold text-sm text-gray-900 dark:text-white">{{ order.amount }}</span>
          </td>
          <!-- Statut -->
          <td class="py-4 border-b border-gray-50 dark:border-gray-800/40">
            <div class="flex items-center justify-between gap-3">
              <StatusBadge :variant="order.status">{{ order.statusLabel }}</StatusBadge>
              <!-- Action rapide au survol -->
              <button
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                title="Voir le détail"
                @click.stop="emit('view', order.id)"
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
