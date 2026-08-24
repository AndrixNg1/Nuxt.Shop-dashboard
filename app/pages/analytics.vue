<script setup lang="ts">
import CatalogPageHeader from '~/components/catalog/CatalogPageHeader.vue'
import AppCard from '~/components/ui/AppCard.vue'
import AnalyticsActivityList from '~/components/analytics/AnalyticsActivityList.vue'
import AnalyticsChart from '~/components/analytics/AnalyticsChart.vue'
import AnalyticsComparisonChart from '~/components/analytics/AnalyticsComparisonChart.vue'
import AnalyticsCustomersChart from '~/components/analytics/AnalyticsCustomersChart.vue'
import AnalyticsKpiGrid from '~/components/analytics/AnalyticsKpiGrid.vue'
import AnalyticsPeriodFilter from '~/components/analytics/AnalyticsPeriodFilter.vue'
import { useAnalyticsData } from '~/composables/useAnalyticsData'
import type { AnalyticsActivity } from '~/types/analytics'

useHead({ title: 'Analyses — Storeflow', meta: [{ name: 'description', content: 'Suivez vos performances et statistiques.' }] })
const { periodOptions, selectedPeriod, selectedPeriodLabel, summary, data } = useAnalyticsData()
const topCustomersLabels = ['Sophie Dubois', 'Thomas Bernard', 'Emma Laurent', 'Lucas Moreau', 'Camille Petit']
const topCustomersData = [1450, 890, 640, 295, 49]
const activities: AnalyticsActivity[] = [
  { id: 1, title: 'Nouvelle commande #SF-10482', time: 'Il y a 5 min', icon: '🛍', tone: 'purple' },
  { id: 2, title: 'Nouveau client : Sophie Dubois', time: 'Il y a 12 min', icon: '♙', tone: 'emerald' },
  { id: 3, title: 'Rupture de stock : Offre Premium', time: 'Il y a 1 h', icon: '!', tone: 'red' },
  { id: 4, title: 'Avis client 5 étoiles reçu', time: 'Il y a 2 h', icon: '★', tone: 'amber' },
  { id: 5, title: 'Commande #SF-10478 expédiée', time: 'Il y a 3 h', icon: '□', tone: 'sky' }
]
</script>

<template>
  <div class="flex h-full flex-col gap-8">
    <CatalogPageHeader eyebrow="Pilotage" title="Analyses" description="Visualisez vos performances, vos ventes et l'évolution de votre activité." action-label="Exporter le rapport" />
    <AnalyticsKpiGrid :summary="summary" />
    <AppCard>
      <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 class="text-lg font-bold text-gray-900 dark:text-white">Évolution du chiffre d'affaires</h2><p class="text-sm text-gray-500 dark:text-gray-400">Revenus bruts sur la période sélectionnée</p></div><AnalyticsPeriodFilter v-model="selectedPeriod" :periods="periodOptions" :selected-label="selectedPeriodLabel" /></div>
      <ClientOnly><AnalyticsChart :labels="data.labels" :data="data.revenue" /><template #fallback><div class="h-[300px] animate-pulse rounded-xl bg-gray-50 dark:bg-[#1b1a26]" /></template></ClientOnly>
    </AppCard>
    <section class="grid grid-cols-1 gap-8 lg:grid-cols-2"><AppCard><h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">Produits vs Commandes</h3><p class="mb-6 text-sm text-gray-500 dark:text-gray-400">Comparaison des volumes sur la période</p><ClientOnly><AnalyticsComparisonChart :labels="data.labels" :orders-data="data.orders" :products-data="data.products" /></ClientOnly></AppCard><AppCard><h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">Meilleurs clients</h3><p class="mb-6 text-sm text-gray-500 dark:text-gray-400">Classement par volume de dépenses</p><ClientOnly><AnalyticsCustomersChart :labels="topCustomersLabels" :data="topCustomersData" /></ClientOnly></AppCard></section>
    <AnalyticsActivityList :activities="activities" />
  </div>
</template>
