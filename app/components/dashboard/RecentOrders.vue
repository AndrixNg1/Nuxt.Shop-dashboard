<script setup lang="ts">
import type { DashboardOrder } from "~/types/dashboard";
import AppCard from "~/components/ui/AppCard.vue";
import UserAvatar from "~/components/ui/UserAvatar.vue";
import StatusBadge from "~/components/ui/StatusBadge.vue";

defineProps<{ orders: DashboardOrder[] }>();
</script>

<template>
  <AppCard>
    <div
      class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
    >
      <div>
        <h2 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">
          Commandes récentes
        </h2>
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Suivez les dernières commandes de votre boutique.
        </p>
      </div>
      <NuxtLink
        to="/orders"
        class="text-xs font-bold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400"
        >Voir toutes les commandes →</NuxtLink
      >
    </div>
    <div class="overflow-x-auto">
      <table class="w-full min-w-[700px] border-collapse text-left">
        <thead>
          <tr>
            <th
              v-for="heading in [
                'Commande',
                'Client',
                'Produit',
                'Montant',
                'Statut',
              ]"
              :key="heading"
              class="border-b border-gray-100 pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:border-gray-800/60 dark:text-gray-500"
            >
              {{ heading }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="group cursor-pointer transition-transform hover:scale-[1.01] hover:bg-gray-50/50 dark:hover:bg-gray-800/20"
          >
            <td class="border-b border-gray-50 py-4 dark:border-gray-800/40">
              <strong class="font-semibold text-gray-900 dark:text-white">{{
                order.id
              }}</strong>
            </td>
            <td class="border-b border-gray-50 py-4 dark:border-gray-800/40">
              <span
                class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"
                ><UserAvatar
                  :initials="order.initials"
                  size="tiny"
                  class="h-7 w-7"
                />{{ order.customer }}</span
              >
            </td>
            <td
              class="border-b border-gray-50 py-4 text-sm text-gray-600 dark:border-gray-800/40 dark:text-gray-300"
            >
              {{ order.product }}
            </td>
            <td class="border-b border-gray-50 py-4 dark:border-gray-800/40">
              <strong class="font-semibold text-gray-900 dark:text-white">{{
                order.amount
              }}</strong>
            </td>
            <td class="border-b border-gray-50 py-4 dark:border-gray-800/40">
              <StatusBadge :variant="order.statusClass">{{
                order.status
              }}</StatusBadge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppCard>
</template>
