<script setup lang="ts">
const isSidebarOpen = ref(false);
const closeSidebar = () => {
  isSidebarOpen.value = false;
};
const isNotifOpen = ref(false);
const toggleNotif = () => {
  isNotifOpen.value = !isNotifOpen.value;
};
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }">
      <div class="brand">
        <div class="brand__mark">S</div>
        <span>Store<span class="brand__accent">flow</span></span>
      </div>
      <nav class="sidebar__nav" aria-label="Navigation principale">
        <p class="sidebar__label">Menu</p>
        <NuxtLink to="/" class="nav-link" active-class="nav-link--active" @click="closeSidebar"><span
            class="nav-link__icon">⌂</span>Vue d'ensemble</NuxtLink>
        <NuxtLink to="/orders" class="nav-link" active-class="nav-link--active" @click="closeSidebar"><span
            class="nav-link__icon">▤</span>Commandes<span class="nav-link__count">12</span></NuxtLink>
        <NuxtLink to="/products" class="nav-link" active-class="nav-link--active" @click="closeSidebar"><span
            class="nav-link__icon">◈</span>Produits</NuxtLink>
        <NuxtLink to="/customers" class="nav-link" active-class="nav-link--active" @click="closeSidebar"><span
            class="nav-link__icon">♙</span>Clients</NuxtLink>
        <p class="sidebar__label sidebar__label--spaced">Gestion</p>
        <NuxtLink to="/analytics" class="nav-link" active-class="nav-link--active" @click="closeSidebar"><span
            class="nav-link__icon">◒</span>Analyses</NuxtLink>
        <NuxtLink to="/settings" class="nav-link" active-class="nav-link--active" @click="closeSidebar"><span
            class="nav-link__icon">⚙</span>Paramètres</NuxtLink>
      </nav>
      <div class="sidebar__bottom">
        <div class="sidebar-theme-control">
          <div>
            <span class="sidebar-theme-control__icon">◐</span><span><strong>Thème de l'interface</strong><small>Clair ou
                sombre</small></span>
          </div>
          <ThemeToggle />
        </div>
        <div class="help-card">
          <div class="help-card__icon">?</div>
          <strong>Besoin d'aide ?</strong><span>Notre équipe est là pour vous.</span><button>Contacter le
            support</button>
        </div>
        <div class="profile">
          <div class="avatar avatar--small">AM</div>
          <div class="profile__info">
            <strong>Alex Martin</strong><span>Administrateur</span>
          </div>
          <span class="profile__more">•••</span>
        </div>
      </div>
    </aside>
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="closeSidebar" />
    <main class="main-content">
      <header
        class="h-[76px] px-6 lg:px-10 flex items-center bg-white dark:bg-[#20202d] border-b border-gray-200 dark:border-gray-800 transition-colors duration-250 z-10 w-full shadow-sm">
        <button class="lg:hidden text-gray-500 text-2xl mr-4 bg-transparent border-none focus:outline-none"
          aria-label="Ouvrir le menu" @click="isSidebarOpen = true">
          ☰
        </button>
        <div class="text-sm text-gray-400 dark:text-gray-500 flex items-center">
          <span class="font-medium">Storeflow</span>
          <b class="mx-3 font-normal text-gray-300">/</b>
          <strong class="text-gray-800 dark:text-gray-100 font-bold">Vue d'ensemble</strong>
        </div>
        <div class="flex items-center gap-4 lg:gap-6 ml-auto">
          <!-- Barre de recherche -->
          <div class="relative hidden sm:flex items-center">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <circle cx="11" cy="11" r="8" stroke-width="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2" />
              </svg>
            </div>
            <input type="text" placeholder="Rechercher..."
              class="block w-full lg:w-64 xl:w-80 pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-[#1b1a26] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-200" />
          </div>

          <TopBarThemeToggle />

          <!-- Bouton Notifications & Dropdown -->
          <div class="relative">
            <button @click="toggleNotif"
              class="relative flex items-center justify-center p-2.5 rounded-xl bg-transparent border-none text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-[#2a244c] focus:outline-none transition-all duration-200"
              aria-label="Notifications">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span
                class="absolute top-2 right-2.5 w-2 h-2 bg-purple-600 border-2 border-white dark:border-[#20202d] rounded-full"></span>
            </button>

            <!-- Menu déroulant des notifications -->
            <transition enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <div v-if="isNotifOpen"
                class="absolute right-0 mt-3 w-72 bg-white dark:bg-[#29293a] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden">
                <div
                  class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-transparent">
                  <h3 class="text-sm font-semibold text-gray-800 dark:text-white">
                    Notifications
                  </h3>
                  <span
                    class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full font-medium">2
                    nouvelles</span>
                </div>
                <div class="max-h-60 overflow-y-auto">
                  <a href="#"
                    class="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#20202d] transition-colors border-b border-gray-50 dark:border-gray-800/50">
                    <p class="text-sm text-gray-800 dark:text-gray-200 font-medium">
                      Nouvelle commande #4829
                    </p>
                    <p class="text-xs text-gray-500 mt-1">Il y a 5 minutes</p>
                  </a>
                  <a href="#" class="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#20202d] transition-colors">
                    <p class="text-sm text-gray-800 dark:text-gray-200 font-medium">
                      Mise à jour système terminée
                    </p>
                    <p class="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
                  </a>
                </div>
                <div
                  class="px-4 py-2 text-center border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#20202d] transition-colors cursor-pointer">
                  <span class="text-xs text-purple-600 font-semibold">Tout marquer comme lu</span>
                </div>
              </div>
            </transition>
          </div>

          <UserAvatar initials="AM" class="ml-2" />
        </div>
      </header>
      <div class="page-content">
        <slot />
      </div>
    </main>
  </div>
</template>
