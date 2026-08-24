<script setup lang="ts">
const stats = [
  { label: "Chiffre d'affaires", value: '24 580 €', change: '+12,8%', detail: 'vs mois dernier', icon: '↗', tone: 'violet' },
  { label: 'Commandes', value: '1 248', change: '+8,2%', detail: 'vs mois dernier', icon: '▤', tone: 'blue' },
  { label: 'Clients actifs', value: '8 642', change: '+4,6%', detail: 'vs mois dernier', icon: '♙', tone: 'orange' },
  { label: 'Panier moyen', value: '86,40 €', change: '+2,4%', detail: 'vs mois dernier', icon: '⌁', tone: 'green' },
]
const orders = [
  { id: '#SF-10482', customer: 'Sophie Dubois', product: 'Pack essentiel', amount: '129,00 €', status: 'Payée', statusClass: 'success', initials: 'SD' },
  { id: '#SF-10481', customer: 'Thomas Bernard', product: 'Abonnement Pro', amount: '89,00 €', status: 'En attente', statusClass: 'warning', initials: 'TB' },
  { id: '#SF-10480', customer: 'Emma Laurent', product: 'Kit découverte', amount: '49,90 €', status: 'Payée', statusClass: 'success', initials: 'EL' },
  { id: '#SF-10479', customer: 'Lucas Moreau', product: 'Pack essentiel', amount: '129,00 €', status: 'Remboursée', statusClass: 'danger', initials: 'LM' },
]
const activities = [
  { text: 'Nouvelle commande de Sophie Dubois', time: 'Il y a 8 min', icon: '↗', tone: 'violet' },
  { text: 'Produit « Pack essentiel » mis à jour', time: 'Il y a 42 min', icon: '✎', tone: 'blue' },
  { text: 'Thomas Bernard a créé un compte', time: 'Il y a 1 h', icon: '♙', tone: 'orange' },
]
</script>

<template>
  <div class="dashboard-page">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Lundi 24 août 2026</p>
        <h1>Bonjour Alex <span>👋</span></h1>
        <p>Voici ce qu'il se passe dans votre boutique aujourd'hui.</p>
      </div><AppButton>＋ <span>Ajouter</span></AppButton>
    </section>
    <section class="stats-grid"><DashboardStatCard v-for="stat in stats" :key="stat.label" v-bind="stat" /></section>
    <section class="content-grid">
      <AppCard>
        <div class="panel__heading">
          <div>
            <h2>Ventes</h2>
            <p>Évolution de votre chiffre d'affaires</p>
          </div><select>
            <option>7 derniers jours</option>
            <option>30 derniers jours</option>
          </select>
        </div>
        <div class="sales-total"><strong>8 420 €</strong><span>+18,4% <small>vs période précédente</small></span></div>
        <DashboardSalesChart aria-label="Graphique des ventes sur sept jours" />
        <!--
        <div class="chart" aria-label="Graphique des ventes sur sept jours">
          <div class="chart__grid"><span>3k</span><span>2k</span><span>1k</span><span>0</span></div><svg
            viewBox="0 0 700 220" preserveAspectRatio="none" role="img">
            <defs>
              <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#7658ef" stop-opacity=".25" />
                <stop offset="100%" stop-color="#7658ef" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,176 C30,170 58,153 95,164 S148,127 188,142 S244,99 282,121 S335,78 375,107 S429,96 469,112 S526,54 565,80 S623,29 700,50 L700,220 L0,220Z"
              fill="url(#fill)" />
            <path
              d="M0,176 C30,170 58,153 95,164 S148,127 188,142 S244,99 282,121 S335,78 375,107 S429,96 469,112 S526,54 565,80 S623,29 700,50"
              fill="none" stroke="#7658ef" stroke-width="3" vector-effect="non-scaling-stroke" />
          </svg>
          <div class="chart__labels">
            <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
          </div>
        </div>-->
      </AppCard>
      <article class="panel activity-panel">
        <div class="panel__heading">
          <div>
            <h2>Activité récente</h2>
            <p>Les dernières actions</p>
          </div><button class="text-button">Tout voir</button>
        </div>
        <div class="activity-list">
          <div v-for="activity in activities" :key="activity.text" class="activity"><span class="activity__icon"
              :class="`tone-${activity.tone}`">{{ activity.icon }}</span>
            <div><strong>{{ activity.text }}</strong><span>{{ activity.time }}</span></div>
          </div>
        </div>
      </article>
    </section>
    <section class="panel orders-panel">
      <div class="panel__heading">
        <div>
          <h2>Commandes récentes</h2>
          <p>Suivez les dernières commandes de votre boutique.</p>
        </div>
        <NuxtLink to="/orders" class="text-button">Voir toutes les commandes →</NuxtLink>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Commande</th>
              <th>Client</th>
              <th>Produit</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td><strong>{{ order.id }}</strong></td>
              <td><span class="customer"><UserAvatar :initials="order.initials" size="tiny" />{{ order.customer
                  }}</span></td>
              <td>{{ order.product }}</td>
              <td><strong>{{ order.amount }}</strong></td>
              <td><StatusBadge :variant="order.statusClass as 'success' | 'warning' | 'danger'">{{ order.status }}</StatusBadge></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
