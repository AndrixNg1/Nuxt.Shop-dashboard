<script setup lang="ts">
import { computed, ref } from "vue";
import CatalogPageHeader from "~/components/catalog/CatalogPageHeader.vue";
import CatalogSummaryCard from "~/components/catalog/CatalogSummaryCard.vue";
import ResourceEmptyState from "~/components/catalog/ResourceEmptyState.vue";
import ResourcePagination from "~/components/catalog/ResourcePagination.vue";
import ResourceToolbar from "~/components/catalog/ResourceToolbar.vue";
import OrdersTable from "~/components/orders/OrdersTable.vue";
import type { Order, OrderStatus, ResourceFilter } from "~/types/catalog";

useHead({
  title: "Commandes — Storeflow",
  meta: [
    { name: "description", content: "Gérez et suivez toutes vos commandes." },
  ],
});

const orders = ref<Order[]>([
  {
    id: "#SF-10482",
    customer: "Sophie Dubois",
    initials: "SD",
    product: "Pack essentiel",
    date: "24 août 2026",
    amount: "129,00 €",
    status: "success",
    statusLabel: "Payée",
  },
  {
    id: "#SF-10481",
    customer: "Thomas Bernard",
    initials: "TB",
    product: "Abonnement Pro",
    date: "24 août 2026",
    amount: "89,00 €",
    status: "warning",
    statusLabel: "En attente",
  },
  {
    id: "#SF-10480",
    customer: "Emma Laurent",
    initials: "EL",
    product: "Kit découverte",
    date: "23 août 2026",
    amount: "49,90 €",
    status: "success",
    statusLabel: "Payée",
  },
  {
    id: "#SF-10479",
    customer: "Lucas Moreau",
    initials: "LM",
    product: "Pack essentiel",
    date: "23 août 2026",
    amount: "129,00 €",
    status: "danger",
    statusLabel: "Remboursée",
  },
  {
    id: "#SF-10478",
    customer: "Camille Petit",
    initials: "CP",
    product: "Offre Premium",
    date: "22 août 2026",
    amount: "199,00 €",
    status: "info",
    statusLabel: "Expédiée",
  },
  {
    id: "#SF-10477",
    customer: "Antoine Durand",
    initials: "AD",
    product: "Kit découverte",
    date: "22 août 2026",
    amount: "49,90 €",
    status: "success",
    statusLabel: "Payée",
  },
  {
    id: "#SF-10476",
    customer: "Julie Martin",
    initials: "JM",
    product: "Abonnement Pro",
    date: "21 août 2026",
    amount: "89,00 €",
    status: "warning",
    statusLabel: "En attente",
  },
  {
    id: "#SF-10475",
    customer: "Pierre Lecomte",
    initials: "PL",
    product: "Offre Premium",
    date: "21 août 2026",
    amount: "199,00 €",
    status: "info",
    statusLabel: "Expédiée",
  },
  {
    id: "#SF-10474",
    customer: "Marie Fournier",
    initials: "MF",
    product: "Pack essentiel",
    date: "20 août 2026",
    amount: "129,00 €",
    status: "success",
    statusLabel: "Payée",
  },
  {
    id: "#SF-10473",
    customer: "David Girard",
    initials: "DG",
    product: "Kit découverte",
    date: "20 août 2026",
    amount: "49,90 €",
    status: "danger",
    statusLabel: "Remboursée",
  },
  {
    id: "#SF-10472",
    customer: "Élodie Rousseau",
    initials: "ER",
    product: "Abonnement Pro",
    date: "19 août 2026",
    amount: "89,00 €",
    status: "success",
    statusLabel: "Payée",
  },
  {
    id: "#SF-10471",
    customer: "Maxime Blanc",
    initials: "MB",
    product: "Offre Premium",
    date: "19 août 2026",
    amount: "199,00 €",
    status: "info",
    statusLabel: "Expédiée",
  },
]);
const search = ref("");
const activeFilter = ref("all");
const selectedIds = ref<string[]>([]);
const page = ref(1);
const pageSize = 10;
const filters: ResourceFilter[] = [
  { label: "Toutes", value: "all" },
  { label: "Payées", value: "success" },
  { label: "En attente", value: "warning" },
  { label: "Remboursées", value: "danger" },
  { label: "Expédiées", value: "info" },
];
const filteredOrders = computed(() =>
  orders.value.filter(
    (order) =>
      (activeFilter.value === "all" || order.status === activeFilter.value) &&
      `${order.id} ${order.customer} ${order.product}`
        .toLowerCase()
        .includes(search.value.toLowerCase()),
  ),
);
const paginatedOrders = computed(() => filteredOrders.value.slice((page.value - 1) * pageSize, page.value * pageSize));
const summary = computed(() => ({
  total: orders.value.length,
  paid: orders.value.filter((order) => order.status === "success").length,
  pending: orders.value.filter((order) => order.status === "warning").length,
  shipped: orders.value.filter((order) => order.status === "info").length,
}));
const percentage = (value: number) =>
  summary.value.total ? Math.round((value / summary.value.total) * 100) : 0;
const toggleSelect = (id: string) => {
  selectedIds.value = selectedIds.value.includes(id)
    ? selectedIds.value.filter((selected) => selected !== id)
    : [...selectedIds.value, id];
};
const changeStatus = (id: string, status: OrderStatus, label: string) => {
  const order = orders.value.find((item) => item.id === id);
  if (order) {
    order.status = status;
    order.statusLabel = label;
  }
};
const viewOrder = (id: string) => console.log("Voir commande", id);
const updateSearch = (value: string) => { search.value = value; page.value = 1; };
const updateFilter = (value: string) => { activeFilter.value = value; page.value = 1; };
</script>

<template>
  <div class="flex h-full flex-col gap-8">
    <CatalogPageHeader
      eyebrow="Gestion"
      title="Commandes"
      description="Consultez et gérez l'ensemble des commandes de votre boutique."
      action-label="Nouvelle commande"
    />
    <section class="grid grid-cols-2 gap-5 xl:grid-cols-4">
      <CatalogSummaryCard
        label="Total"
        :value="summary.total"
        detail="commandes ce mois"
        tone="purple"
        icon="▤"
      /><CatalogSummaryCard
        label="Payées"
        :value="summary.paid"
        detail=""
        :progress="percentage(summary.paid)"
        tone="emerald"
        icon="✓"
      /><CatalogSummaryCard
        label="En attente"
        :value="summary.pending"
        detail=""
        :progress="percentage(summary.pending)"
        tone="amber"
        icon="◷"
      /><CatalogSummaryCard
        label="Expédiées"
        :value="summary.shipped"
        detail=""
        :progress="percentage(summary.shipped)"
        tone="sky"
        icon="□"
      />
    </section>
    <AppCard class="flex min-h-0 flex-1 flex-col !p-0"
      ><div class="border-b border-gray-100 p-6 dark:border-gray-800/60">
        <ResourceToolbar
          :total="orders.length"
          :filtered="filteredOrders.length"
          :search="search"
          :active-filter="activeFilter"
          :filters="filters"
          placeholder="Rechercher une commande, un client..."
          resource-label="commandes"
          @update:search="updateSearch"
          @update:active-filter="updateFilter"
        />
      </div>
      <div v-if="filteredOrders.length === 0" class="flex-1">
        <ResourceEmptyState
          title="Aucune commande trouvée"
          description="Essayez de modifier vos filtres ou votre recherche."
          icon="▤"
        />
      </div>
      <div v-else class="flex-1 overflow-auto px-6">
        <OrdersTable
          :orders="paginatedOrders"
          :selected-ids="selectedIds"
          @select="toggleSelect"
          @view="viewOrder"
          @status-change="changeStatus"
        />
      </div>
      <ResourcePagination
        :page="page"
        :page-size="pageSize"
        :total="filteredOrders.length"
        label="commandes"
        @update:page="page = $event"
      /></AppCard>
  </div>
</template>
