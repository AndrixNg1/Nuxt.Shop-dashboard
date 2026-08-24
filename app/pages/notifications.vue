<script setup lang="ts">
useHead({
  title: 'Notifications — Storeflow',
  meta: [
    { name: 'description', content: 'Gérez vos alertes et notifications système.' }
  ]
})

const notifications = ref([
  {
    id: 1,
    title: 'Nouvelle commande #4829',
    description: 'Jean Dupont vient de passer une commande de 124,50 €.',
    time: 'Il y a 5 minutes',
    type: 'success',
    isRead: false
  },
  {
    id: 2,
    title: 'Mise à jour système terminée',
    description: 'La plateforme a été mise à jour vers la version v2.4.1 avec succès.',
    time: 'Il y a 2 heures',
    type: 'info',
    isRead: false
  },
  {
    id: 3,
    title: 'Alerte stock critique',
    description: 'Le produit "Casque Audio Sans Fil" a moins de 5 unités en stock.',
    time: 'Il y a 5 heures',
    type: 'warning',
    isRead: true
  },
  {
    id: 4,
    title: 'Paiement échoué',
    description: 'Le prélèvement pour votre abonnement mensuel n\'a pas pu aboutir.',
    time: 'Hier, 14:30',
    type: 'danger',
    isRead: true
  },
  {
    id: 5,
    title: 'Nouveau client inscrit',
    description: 'Marie Martin a créé un compte client sur votre boutique.',
    time: 'Hier, 09:15',
    type: 'info',
    isRead: true
  }
])

const markAllAsRead = () => {
  notifications.value.forEach(n => n.isRead = true)
}

const getIconClass = (type: string) => {
  switch (type) {
    case 'success': return 'text-green-500 bg-green-100 dark:bg-green-500/10'
    case 'info': return 'text-blue-500 bg-blue-100 dark:bg-blue-500/10'
    case 'warning': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-500/10'
    case 'danger': return 'text-red-500 bg-red-100 dark:bg-red-500/10'
    default: return 'text-gray-500 bg-gray-100 dark:bg-gray-500/10'
  }
}

const getIconSvg = (type: string) => {
  switch (type) {
    case 'success': return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />'
    case 'info': return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
    case 'warning': return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />'
    case 'danger': return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />'
    default: return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />'
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- En-tête de la page -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Centre d'alertes</p>
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white m-0">Notifications</h1>
        <p class="text-sm text-gray-500 mt-2">Consultez et gérez vos alertes et messages système.</p>
      </div>
      <button 
        @click="markAllAsRead"
        class="inline-flex items-center justify-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-[#1b1a26]"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        Tout marquer comme lu
      </button>
    </div>

    <!-- Liste des notifications -->
    <div class="bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-250">
      <ul class="divide-y divide-gray-100 dark:divide-gray-800/60">
        <li 
          v-for="notif in notifications" 
          :key="notif.id"
          class="relative p-5 hover:bg-gray-50 dark:hover:bg-[#242435] transition-all duration-200 flex gap-4 group cursor-pointer"
          :class="{ 'bg-purple-50/30 dark:bg-purple-900/10': !notif.isRead }"
        >
          <!-- Indicateur non-lu -->
          <span v-if="!notif.isRead" class="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-8 bg-purple-600 rounded-r-full"></span>
          
          <!-- Icône statuts -->
          <div :class="['flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110', getIconClass(notif.type)]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="getIconSvg(notif.type)"></svg>
          </div>
          
          <!-- Contenu -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1 gap-1">
              <h3 class="text-base font-bold truncate transition-colors duration-200" :class="notif.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'">
                {{ notif.title }}
              </h3>
              <span class="text-xs font-medium text-gray-400 dark:text-gray-500 shrink-0">{{ notif.time }}</span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ notif.description }}</p>
          </div>
          
          <!-- Actions au survol -->
          <div class="hidden sm:flex flex-shrink-0 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pl-4">
            <button 
              class="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 bg-white dark:bg-[#20202d] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-900 transition-all focus:outline-none"
              title="Supprimer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </li>
      </ul>
      
      <!-- État vide (Optionnel) -->
      <div v-if="notifications.length === 0" class="p-10 text-center flex flex-col items-center justify-center">
        <div class="w-16 h-16 bg-gray-50 dark:bg-[#242435] rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Aucune notification</h3>
        <p class="text-sm text-gray-500 mt-1">Vous êtes à jour ! Toutes vos alertes apparaîtront ici.</p>
      </div>
    </div>
  </div>
</template>
