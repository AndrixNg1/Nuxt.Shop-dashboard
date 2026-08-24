<script setup lang="ts">
import UserAvatar from '~/components/ui/UserAvatar.vue';
import StatusBadge from '~/components/ui/StatusBadge.vue';

export interface Customer {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: string;
  status: 'active' | 'inactive' | 'blocked';
  statusLabel: string;
}

defineProps<{
  customers: Customer[];
  selectedIds?: string[];
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'view', id: string): void;
  (e: 'status-change', id: string, status: Customer['status'], label: string): void;
}>();

const statusOptions: { value: Customer['status']; label: string }[] = [
  { value: 'active',   label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'blocked',  label: 'Bloqué' },
];

const openStatusId = ref<string | null>(null);

function toggleStatusMenu(id: string, e: MouseEvent) {
  e.stopPropagation();
  openStatusId.value = openStatusId.value === id ? null : id;
}

function applyStatus(customerId: string, opt: typeof statusOptions[0], e: MouseEvent) {
  e.stopPropagation();
  emit('status-change', customerId, opt.value, opt.label);
  openStatusId.value = null;
}

const statusToVariant = (status: Customer['status']) => {
  switch (status) {
    case 'active': return 'success';
    case 'inactive': return 'neutral';
    case 'blocked': return 'danger';
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
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Client</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Contact & Loc.</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Commandes</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 pr-6 border-b border-gray-100 dark:border-gray-800/60">Dépenses</th>
          <th class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-3.5 border-b border-gray-100 dark:border-gray-800/60">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in customers"
          :key="customer.id"
          class="group cursor-pointer transition-all duration-200 hover:bg-purple-50/40 dark:hover:bg-purple-900/[0.08]"
          @click="emit('view', customer.id)"
        >
          <td class="py-4 pr-4 border-b border-gray-50 dark:border-gray-800/40" @click.stop>
            <input
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer accent-purple-600"
              :checked="selectedIds?.includes(customer.id)"
              @change="emit('select', customer.id)"
            />
          </td>

          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <div class="flex items-center gap-3">
              <UserAvatar :initials="customer.initials" />
              <div class="flex flex-col">
                <span class="font-bold text-sm text-gray-900 dark:text-white">{{ customer.name }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ customer.email }}</span>
              </div>
            </div>
          </td>

          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <div class="flex flex-col gap-1">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ customer.phone }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ customer.location }}</span>
            </div>
          </td>

          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <span class="font-bold text-sm text-gray-900 dark:text-white">{{ customer.totalOrders }}</span>
          </td>

          <td class="py-4 pr-6 border-b border-gray-50 dark:border-gray-800/40">
            <span class="font-bold text-sm text-emerald-600 dark:text-emerald-400">{{ customer.totalSpent }}</span>
          </td>

          <td class="py-4 border-b border-gray-50 dark:border-gray-800/40" @click.stop>
            <div class="relative flex items-center gap-3">
              <button
                class="flex items-center gap-1 focus:outline-none group/status"
                :title="`Changer le statut (${customer.statusLabel})`"
                @click="toggleStatusMenu(customer.id, $event)"
              >
                <StatusBadge :variant="statusToVariant(customer.status)">{{ customer.statusLabel }}</StatusBadge>
                <svg
                  class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0"
                  :class="openStatusId === customer.id ? 'rotate-180' : ''"
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
                  v-if="openStatusId === customer.id"
                  class="absolute left-0 top-full mt-2 w-44 bg-white dark:bg-[#29293a] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden py-1.5"
                >
                  <p class="px-3 pb-1.5 pt-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">Changer le statut</p>
                  <button
                    v-for="opt in statusOptions"
                    :key="opt.value"
                    class="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none"
                    :class="customer.status === opt.value ? 'bg-gray-50 dark:bg-white/5' : ''"
                    @click="applyStatus(customer.id, opt, $event)"
                  >
                    <StatusBadge :variant="statusToVariant(opt.value)">{{ opt.label }}</StatusBadge>
                    <svg v-if="customer.status === opt.value" class="w-3.5 h-3.5 text-purple-600 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  </button>
                </div>
              </transition>

              <button
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 flex-shrink-0"
                title="Voir profil"
                @click="emit('view', customer.id)"
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
