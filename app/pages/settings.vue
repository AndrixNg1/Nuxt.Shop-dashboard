<script setup lang="ts">
import { ref } from 'vue';
import CatalogPageHeader from '~/components/catalog/CatalogPageHeader.vue';
import UserAvatar from '~/components/ui/UserAvatar.vue';

useHead({
  title: 'Paramètres — Storeflow',
  meta: [{ name: 'description', content: 'Gérez la configuration de votre boutique.' }]
});

const tabs = [
  { id: 'general', label: 'Général', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>' },
  { id: 'store', label: 'Boutique', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>' },
  { id: 'notifications', label: 'Notifications', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>' },
  { id: 'security', label: 'Sécurité', icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>' },
];

const activeTab = ref('general');

// Form data (mock)
const profileForm = ref({
  firstName: 'Andrix',
  lastName: 'Ng',
  email: 'andrix@example.com',
  bio: 'Développeur et créateur de la boutique Storeflow.',
});

const saveChanges = () => {
  console.log('Paramètres sauvegardés');
  // Logic to save
};
</script>

<template>
  <div class="flex h-full flex-col gap-8">
    <CatalogPageHeader
      eyebrow="Configuration"
      title="Paramètres"
      description="Gérez votre profil, les préférences de votre boutique et la sécurité."
      action-label="Sauvegarder"
      @action="saveChanges"
    />

    <div class="flex flex-col lg:flex-row gap-8 items-start">
      <!-- Sidebar / Tabs -->
      <aside class="w-full lg:w-64 shrink-0 flex flex-col gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left"
          :class="activeTab === tab.id 
            ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25' 
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'"
        >
          <span v-html="tab.icon" :class="activeTab === tab.id ? 'opacity-100' : 'opacity-70'"></span>
          {{ tab.label }}
        </button>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 w-full bg-white dark:bg-[#20202d] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <!-- Tab: Général -->
        <div v-if="activeTab === 'general'" class="p-6 sm:p-8 flex flex-col gap-8">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Profil Public</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Ces informations seront visibles par les membres de votre équipe.</p>
          </div>

          <div class="flex items-center gap-6">
            <UserAvatar initials="AN" class="!w-20 !h-20 text-xl" />
            <div class="flex gap-3">
              <button class="px-4 py-2 text-sm font-bold rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors focus:outline-none">Changer l'avatar</button>
              <button class="px-4 py-2 text-sm font-semibold rounded-xl bg-gray-100 dark:bg-[#1b1a26] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors focus:outline-none">Supprimer</button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label for="firstName" class="text-sm font-bold text-gray-700 dark:text-gray-300">Prénom</label>
              <input id="firstName" v-model="profileForm.firstName" type="text" class="px-4 py-2.5 bg-gray-50 dark:bg-[#1b1a26] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors w-full">
            </div>
            <div class="flex flex-col gap-2">
              <label for="lastName" class="text-sm font-bold text-gray-700 dark:text-gray-300">Nom</label>
              <input id="lastName" v-model="profileForm.lastName" type="text" class="px-4 py-2.5 bg-gray-50 dark:bg-[#1b1a26] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors w-full">
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="email" class="text-sm font-bold text-gray-700 dark:text-gray-300">Adresse Email</label>
            <input id="email" v-model="profileForm.email" type="email" class="px-4 py-2.5 bg-gray-50 dark:bg-[#1b1a26] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors w-full">
          </div>

          <div class="flex flex-col gap-2">
            <label for="bio" class="text-sm font-bold text-gray-700 dark:text-gray-300">Biographie</label>
            <textarea id="bio" v-model="profileForm.bio" rows="4" class="px-4 py-2.5 bg-gray-50 dark:bg-[#1b1a26] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors w-full resize-none"></textarea>
            <p class="text-xs text-gray-500 dark:text-gray-400">Brève description pour votre profil. Maximum 200 caractères.</p>
          </div>
        </div>

        <!-- Placeholder for other tabs -->
        <div v-else class="p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div class="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 text-gray-400" v-html="tabs.find(t => t.id === activeTab)?.icon"></div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Section en construction</h3>
          <p class="text-sm text-gray-400">Les paramètres pour "{{ tabs.find(t => t.id === activeTab)?.label }}" seront bientôt disponibles.</p>
        </div>

        <!-- Footer actions -->
        <div class="p-6 bg-gray-50 dark:bg-[#1b1a26]/50 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-end gap-3">
          <button class="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors">Annuler</button>
          <button @click="saveChanges" class="px-5 py-2.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20 rounded-xl transition-all duration-200 hover:-translate-y-0.5">Sauvegarder les modifications</button>
        </div>
      </div>
    </div>
  </div>
</template>
