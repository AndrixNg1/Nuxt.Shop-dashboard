<script setup lang="ts">
import DashboardHeader from '~/components/dashboard/DashboardHeader.vue'
import DashboardStatsGrid from '~/components/dashboard/DashboardStatsGrid.vue'
import SalesOverview from '~/components/dashboard/SalesOverview.vue'
import RecentActivity from '~/components/dashboard/RecentActivity.vue'
import RecentOrders from '~/components/dashboard/RecentOrders.vue'
import type { DashboardActivity, DashboardOrder, DashboardStat } from '~/types/dashboard'

const stats: DashboardStat[] = [
  { label: "Chiffre d'affaires", value: '24 580 €', change: '+12,8%', detail: 'vs mois dernier', icon: '↗', tone: 'violet' },
  { label: 'Commandes', value: '1 248', change: '+8,2%', detail: 'vs mois dernier', icon: '▤', tone: 'blue' },
  { label: 'Clients actifs', value: '8 642', change: '+4,6%', detail: 'vs mois dernier', icon: '♙', tone: 'orange' },
  { label: 'Panier moyen', value: '86,40 €', change: '+2,4%', detail: 'vs mois dernier', icon: '⌁', tone: 'green' }
]

const activities: DashboardActivity[] = [
  { text: 'Nouvelle commande de Sophie Dubois', time: 'Il y a 8 min', icon: '↗', tone: 'violet' },
  { text: 'Produit « Pack essentiel » mis à jour', time: 'Il y a 42 min', icon: '✎', tone: 'blue' },
  { text: 'Thomas Bernard a créé un compte', time: 'Il y a 1 h', icon: '♙', tone: 'orange' }
]

const orders: DashboardOrder[] = [
  { id: '#SF-10482', customer: 'Sophie Dubois', product: 'Pack essentiel', amount: '129,00 €', status: 'Payée', statusClass: 'success', initials: 'SD' },
  { id: '#SF-10481', customer: 'Thomas Bernard', product: 'Abonnement Pro', amount: '89,00 €', status: 'En attente', statusClass: 'warning', initials: 'TB' },
  { id: '#SF-10480', customer: 'Emma Laurent', product: 'Kit découverte', amount: '49,90 €', status: 'Payée', statusClass: 'success', initials: 'EL' },
  { id: '#SF-10479', customer: 'Lucas Moreau', product: 'Pack essentiel', amount: '129,00 €', status: 'Remboursée', statusClass: 'danger', initials: 'LM' }
]
</script>

<template>
  <div class="mx-auto max-w-[1440px] space-y-8">
    <DashboardHeader />
    <DashboardStatsGrid :stats="stats" />
    <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <SalesOverview />
      <RecentActivity :activities="activities" />
    </section>
    <RecentOrders :orders="orders" />
  </div>
</template>
