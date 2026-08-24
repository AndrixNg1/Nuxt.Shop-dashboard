<script setup lang="ts">
import { computed, ref } from "vue";
import CatalogPageHeader from "~/components/catalog/CatalogPageHeader.vue";
import CatalogSummaryCard from "~/components/catalog/CatalogSummaryCard.vue";
import ResourceEmptyState from "~/components/catalog/ResourceEmptyState.vue";
import ResourcePagination from "~/components/catalog/ResourcePagination.vue";
import ResourceToolbar from "~/components/catalog/ResourceToolbar.vue";
import CustomersTable from "~/components/customers/CustomersTable.vue";
import type { Customer, CustomerStatus } from "~/types/customers";
import type { ResourceFilter } from "~/types/catalog";

useHead({
  title: "Clients — Storeflow",
  meta: [{ name: "description", content: "Gérez et suivez votre clientèle." }],
});

const names = [
  "Sophie Dubois",
  "Thomas Bernard",
  "Emma Laurent",
  "Lucas Moreau",
  "Camille Petit",
  "Antoine Durand",
  "Julie Martin",
  "Pierre Lecomte",
  "Marie Fournier",
  "David Girard",
  "Élodie Rousseau",
  "Maxime Blanc",
  "Clara Robert",
  "Hugo Richard",
  "Chloé Simon",
  "Nathan Michel",
  "Manon Lefèvre",
  "Gabriel Leroy",
  "Laura Roux",
  "Louis David",
  "Inès Bertrand",
  "Arthur Morel",
  "Sarah Fournier",
  "Romain Faure",
  "Léa André",
  "Mathieu Mercier",
  "Anaïs Olivier",
  "Baptiste Gautier",
  "Océane Chevalier",
  "Théo François",
  "Margaux Giraud",
  "Alexandre Fontaine",
  "Pauline Barbier",
  "Valentin Renard",
  "Mélanie Boucher",
  "Nicolas Tessier",
  "Justine Perrin",
  "Jérôme Marchand",
  "Céline Legrand",
  "Adrien Lacroix",
  "Amandine Dupont",
  "Sébastien Guillot",
  "Noémie Dumas",
  "Quentin Brun",
  "Émilie Vidal",
  "Timothée Marty",
  "Alicia Collet",
  "Fabien Picard",
  "Hélène Rey",
  "Victoria Masson",
];
const locations = [
  "Paris, FR",
  "Lyon, FR",
  "Marseille, FR",
  "Bordeaux, FR",
  "Nantes, FR",
  "Lille, FR",
  "Toulouse, FR",
  "Nice, FR",
];
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
const formatAmount = (amount: number) =>
  `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)} €`;

const customers = ref<Customer[]>(
  names.map((name, index) => {
    const status: CustomerStatus =
      index % 11 === 3 ? "blocked" : index % 7 === 1 ? "inactive" : "active";
    const totalOrders = (index * 5) % 18;
    return {
      id: `CUST-${String(index + 1).padStart(3, "0")}`,
      name,
      initials: initials(name),
      email: `${name
        .toLowerCase()
        .replaceAll(" ", ".")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")}@example.com`,
      phone: `+33 6 ${String(12000000 + index * 137921)
        .padStart(8, "0")
        .match(/.{1,2}/g)
        ?.join(" ")}`,
      location: locations[index % locations.length] ?? "Paris, FR",
      totalOrders,
      totalSpent: formatAmount(totalOrders * 74.5 + index * 12.5),
      status,
      statusLabel:
        status === "active"
          ? "Actif"
          : status === "inactive"
            ? "Inactif"
            : "Bloqué",
    };
  }),
);

const search = ref("");
const activeFilter = ref("all");
const selectedIds = ref<string[]>([]);
const page = ref(1);
const pageSize = 10;
const filters: ResourceFilter[] = [
  { label: "Tous", value: "all" },
  { label: "Actifs", value: "active" },
  { label: "Inactifs", value: "inactive" },
  { label: "Bloqués", value: "blocked" },
];
const filteredCustomers = computed(() =>
  customers.value.filter(
    (customer) =>
      (activeFilter.value === "all" ||
        customer.status === activeFilter.value) &&
      `${customer.name} ${customer.email} ${customer.location}`
        .toLowerCase()
        .includes(search.value.toLowerCase()),
  ),
);
const paginatedCustomers = computed(() =>
  filteredCustomers.value.slice(
    (page.value - 1) * pageSize,
    page.value * pageSize,
  ),
);
const summary = computed(() => ({
  total: customers.value.length,
  active: customers.value.filter((customer) => customer.status === "active")
    .length,
  inactive: customers.value.filter((customer) => customer.status === "inactive")
    .length,
  blocked: customers.value.filter((customer) => customer.status === "blocked")
    .length,
}));
const percentage = (value: number) =>
  summary.value.total ? Math.round((value / summary.value.total) * 100) : 0;
const toggleSelect = (id: string) => {
  selectedIds.value = selectedIds.value.includes(id)
    ? selectedIds.value.filter((selected) => selected !== id)
    : [...selectedIds.value, id];
};
const changeStatus = (id: string, status: CustomerStatus, label: string) => {
  const customer = customers.value.find((item) => item.id === id);
  if (customer) {
    customer.status = status;
    customer.statusLabel = label;
  }
};
const viewCustomer = (id: string) => console.log("Voir client", id);
const updateSearch = (value: string) => {
  search.value = value;
  page.value = 1;
};
const updateFilter = (value: string) => {
  activeFilter.value = value;
  page.value = 1;
};
</script>

<template>
  <div class="flex h-full flex-col gap-8">
    <CatalogPageHeader
      eyebrow="Relation client"
      title="Clients"
      description="Suivez vos clients, leur historique d'achat et leurs coordonnées."
      action-label="Nouveau client"
    />
    <section class="grid grid-cols-2 gap-5 xl:grid-cols-4">
      <CatalogSummaryCard
        label="Total clients"
        :value="summary.total"
        detail="inscrits sur la boutique"
        tone="purple"
        icon="♙"
      /><CatalogSummaryCard
        label="Actifs"
        :value="summary.active"
        detail=""
        :progress="percentage(summary.active)"
        tone="emerald"
        icon="✓"
      /><CatalogSummaryCard
        label="Inactifs"
        :value="summary.inactive"
        detail=""
        :progress="percentage(summary.inactive)"
        tone="amber"
        icon="◷"
      /><CatalogSummaryCard
        label="Bloqués"
        :value="summary.blocked"
        detail=""
        :progress="percentage(summary.blocked)"
        tone="red"
        icon="×"
      />
    </section>
    <AppCard class="flex min-h-0 flex-1 flex-col p-0!"
      ><div class="border-b border-gray-100 p-6 dark:border-gray-800/60">
        <ResourceToolbar
          :total="customers.length"
          :filtered="filteredCustomers.length"
          :search="search"
          :active-filter="activeFilter"
          :filters="filters"
          placeholder="Rechercher un client, un email..."
          resource-label="clients"
          @update:search="updateSearch"
          @update:active-filter="updateFilter"
        />
      </div>
      <div v-if="filteredCustomers.length === 0" class="flex-1">
        <ResourceEmptyState
          title="Aucun client trouvé"
          description="Essayez de modifier vos filtres ou votre recherche."
          icon="♙"
        />
      </div>
      <div v-else class="flex-1 overflow-auto px-6">
        <CustomersTable
          :customers="paginatedCustomers"
          :selected-ids="selectedIds"
          @select="toggleSelect"
          @view="viewCustomer"
          @status-change="changeStatus"
        />
      </div>
      <ResourcePagination
        :page="page"
        :page-size="pageSize"
        :total="filteredCustomers.length"
        label="clients"
        @update:page="page = $event"
    /></AppCard>
  </div>
</template>
