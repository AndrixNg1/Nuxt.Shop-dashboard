<script setup lang="ts">
import { computed, ref } from "vue";
import CatalogPageHeader from "~/components/catalog/CatalogPageHeader.vue";
import CatalogSummaryCard from "~/components/catalog/CatalogSummaryCard.vue";
import ResourceEmptyState from "~/components/catalog/ResourceEmptyState.vue";
import ResourcePagination from "~/components/catalog/ResourcePagination.vue";
import ResourceToolbar from "~/components/catalog/ResourceToolbar.vue";
import ProductsTable from "~/components/products/ProductsTable.vue";
import type { Product, ProductStatus, ResourceFilter } from "~/types/catalog";

useHead({
  title: "Produits — Storeflow",
  meta: [
    { name: "description", content: "Gérez votre catalogue de produits." },
  ],
});

const products = ref<Product[]>([
  {
    id: "PRD-001",
    name: "Pack Essentiel",
    category: "Packs",
    price: "129,00 €",
    stock: 45,
    status: "active",
    statusLabel: "Actif",
  },
  {
    id: "PRD-002",
    name: "Abonnement Pro",
    category: "Services",
    price: "89,00 €",
    stock: 999,
    status: "active",
    statusLabel: "Actif",
  },
  {
    id: "PRD-003",
    name: "Kit Découverte",
    category: "Packs",
    price: "49,90 €",
    stock: 12,
    status: "active",
    statusLabel: "Actif",
  },
  {
    id: "PRD-004",
    name: "Offre Premium",
    category: "Services",
    price: "199,00 €",
    stock: 0,
    status: "out_of_stock",
    statusLabel: "Rupture",
  },
  {
    id: "PRD-005",
    name: "Consulting 1h",
    category: "Services",
    price: "150,00 €",
    stock: 5,
    status: "active",
    statusLabel: "Actif",
  },
  {
    id: "PRD-006",
    name: "Template Starter",
    category: "Digital",
    price: "29,00 €",
    stock: 999,
    status: "draft",
    statusLabel: "Brouillon",
  },
  {
    id: "PRD-007",
    name: "Audit SEO",
    category: "Services",
    price: "299,00 €",
    stock: 2,
    status: "active",
    statusLabel: "Actif",
  },
  {
    id: "PRD-008",
    name: "Ancien Pack (V1)",
    category: "Packs",
    price: "99,00 €",
    stock: 0,
    status: "archived",
    statusLabel: "Archivé",
  },
  { id: "PRD-009", name: "Formation Express", category: "Services", price: "79,00 €", stock: 18, status: "active", statusLabel: "Actif" },
  { id: "PRD-010", name: "Guide SEO 2026", category: "Digital", price: "39,00 €", stock: 999, status: "active", statusLabel: "Actif" },
  { id: "PRD-011", name: "Pack Business", category: "Packs", price: "249,00 €", stock: 7, status: "active", statusLabel: "Actif" },
  { id: "PRD-012", name: "Audit Express", category: "Services", price: "59,00 €", stock: 0, status: "out_of_stock", statusLabel: "Rupture" },
]);
const search = ref("");
const activeFilter = ref("all");
const selectedIds = ref<string[]>([]);
const page = ref(1);
const pageSize = 10;
const filters: ResourceFilter[] = [
  { label: "Tous", value: "all" },
  { label: "Actifs", value: "active" },
  { label: "Brouillons", value: "draft" },
  { label: "Rupture", value: "out_of_stock" },
  { label: "Archivés", value: "archived" },
];
const filteredProducts = computed(() =>
  products.value.filter(
    (product) =>
      (activeFilter.value === "all" || product.status === activeFilter.value) &&
      `${product.name} ${product.id} ${product.category}`
        .toLowerCase()
        .includes(search.value.toLowerCase()),
  ),
);
const paginatedProducts = computed(() => filteredProducts.value.slice((page.value - 1) * pageSize, page.value * pageSize));
const summary = computed(() => ({
  total: products.value.length,
  active: products.value.filter((product) => product.status === "active")
    .length,
  draft: products.value.filter((product) => product.status === "draft").length,
  outOfStock: products.value.filter(
    (product) => product.status === "out_of_stock",
  ).length,
}));
const percentage = (value: number) =>
  summary.value.total ? Math.round((value / summary.value.total) * 100) : 0;
const toggleSelect = (id: string) => {
  selectedIds.value = selectedIds.value.includes(id)
    ? selectedIds.value.filter((selected) => selected !== id)
    : [...selectedIds.value, id];
};
const changeStatus = (id: string, status: ProductStatus, label: string) => {
  const product = products.value.find((item) => item.id === id);
  if (product) {
    product.status = status;
    product.statusLabel = label;
  }
};
const editProduct = (id: string) => console.log("Modifier produit", id);
const updateSearch = (value: string) => { search.value = value; page.value = 1; };
const updateFilter = (value: string) => { activeFilter.value = value; page.value = 1; };
</script>

<template>
  <div class="flex h-full flex-col gap-8">
    <CatalogPageHeader
      eyebrow="Catalogue"
      title="Produits"
      description="Gérez vos articles, leurs prix et leurs niveaux de stock."
      action-label="Ajouter un produit"
    />
    <section class="grid grid-cols-2 gap-5 xl:grid-cols-4">
      <CatalogSummaryCard
        label="Total produits"
        :value="summary.total"
        detail="dans votre catalogue"
        tone="purple"
        icon="▧"
      /><CatalogSummaryCard
        label="Actifs"
        :value="summary.active"
        detail=""
        :progress="percentage(summary.active)"
        tone="emerald"
        icon="↗"
      /><CatalogSummaryCard
        label="Brouillons"
        :value="summary.draft"
        detail=""
        :progress="percentage(summary.draft)"
        tone="amber"
        icon="✎"
      /><CatalogSummaryCard
        label="Rupture de stock"
        :value="summary.outOfStock"
        detail=""
        :progress="percentage(summary.outOfStock)"
        tone="red"
        icon="!"
      />
    </section>
    <AppCard class="flex min-h-0 flex-1 flex-col !p-0"
      ><div class="border-b border-gray-100 p-6 dark:border-gray-800/60">
        <ResourceToolbar
          :total="products.length"
          :filtered="filteredProducts.length"
          :search="search"
          :active-filter="activeFilter"
          :filters="filters"
          placeholder="Rechercher un produit, une référence..."
          resource-label="produits"
          @update:search="updateSearch"
          @update:active-filter="updateFilter"
        />
      </div>
      <div v-if="filteredProducts.length === 0" class="flex-1">
        <ResourceEmptyState
          title="Aucun produit trouvé"
          description="Essayez de modifier vos filtres ou votre recherche."
          icon="▧"
        />
      </div>
      <div v-else class="flex-1 overflow-auto px-6">
        <ProductsTable
          :products="paginatedProducts"
          :selected-ids="selectedIds"
          @select="toggleSelect"
          @edit="editProduct"
          @status-change="changeStatus"
        />
      </div>
      <ResourcePagination
        :page="page"
        :page-size="pageSize"
        :total="filteredProducts.length"
        label="produits"
        @update:page="page = $event"
    /></AppCard>
  </div>
</template>
