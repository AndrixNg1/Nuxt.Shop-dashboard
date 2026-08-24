<script setup lang="ts">
import { ref } from 'vue'
import CatalogPageHeader from '~/components/catalog/CatalogPageHeader.vue'
import AppButton from '~/components/ui/AppButton.vue'
import AppCard from '~/components/ui/AppCard.vue'
import SettingsPlaceholder from '~/components/settings/SettingsPlaceholder.vue'
import SettingsProfileForm from '~/components/settings/SettingsProfileForm.vue'
import SettingsTabs from '~/components/settings/SettingsTabs.vue'
import type { SettingsProfile, SettingsTab, SettingsTabId } from '~/types/settings'

useHead({ title: 'Paramètres — Storeflow', meta: [{ name: 'description', content: 'Gérez la configuration de votre boutique.' }] })
const tabs: SettingsTab[] = [{ id: 'general', label: 'Général', icon: '♙' }, { id: 'store', label: 'Boutique', icon: '▦' }, { id: 'notifications', label: 'Notifications', icon: '♧' }, { id: 'security', label: 'Sécurité', icon: '⌑' }]
const activeTab = ref<SettingsTabId>('general')
const profile = ref<SettingsProfile>({ firstName: 'Andrix', lastName: 'Ng', email: 'andrix@example.com', bio: 'Développeur et créateur de la boutique Storeflow.' })
const saved = ref(false)
const saveChanges = () => { saved.value = true; setTimeout(() => { saved.value = false }, 2500) }
</script>

<template>
  <div class="flex h-full flex-col gap-8">
    <CatalogPageHeader eyebrow="Configuration" title="Paramètres" description="Gérez votre profil, les préférences de votre boutique et la sécurité." action-label="Sauvegarder" @action="saveChanges" />
    <div v-if="saved" class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">Vos paramètres ont été sauvegardés.</div>
    <div class="flex flex-col items-start gap-8 lg:flex-row"><SettingsTabs :tabs="tabs" :active-tab="activeTab" @update:active-tab="activeTab = $event" /><AppCard class="w-full flex-1 overflow-hidden !p-0"><SettingsProfileForm v-if="activeTab === 'general'" :profile="profile" @update:profile="profile = $event" /><SettingsPlaceholder v-else :icon="tabs.find(tab => tab.id === activeTab)?.icon ?? '⚙'" title="Section en construction" :description="`Les paramètres pour « ${tabs.find(tab => tab.id === activeTab)?.label} » seront bientôt disponibles.`" /><div class="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 p-6 dark:border-gray-800/60 dark:bg-[#1b1a26]/50"><button class="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800">Annuler</button><AppButton @click="saveChanges">Sauvegarder les modifications</AppButton></div></AppCard></div>
  </div>
</template>
