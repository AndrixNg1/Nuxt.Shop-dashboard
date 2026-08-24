<script setup lang="ts">
const isSidebarOpen = ref(false);
const closeSidebar = () => { isSidebarOpen.value = false; };
const isNotifOpen = ref(false);
const toggleNotif = () => { isNotifOpen.value = !isNotifOpen.value; };

const route = useRoute();

const pageNames: Record<string, string> = {
  '/': 'Vue d\'ensemble',
  '/orders': 'Commandes',
  '/products': 'Produits',
  '/customers': 'Clients',
  '/analytics': 'Analyses',
  '/settings': 'Paramètres',
  '/notifications': 'Notifications',
};

const currentPageName = computed(() => pageNames[route.path] ?? route.path.replace('/', ''));
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
        <NuxtLink to="/" class="nav-link" active-class="nav-link--active" @click="closeSidebar">
          <span class="nav-link__icon"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg></span>
          Vue d'ensemble
        </NuxtLink>
        <NuxtLink to="/orders" class="nav-link" active-class="nav-link--active" @click="closeSidebar">
          <span class="nav-link__icon"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></span>
          Commandes<span class="nav-link__count">12</span>
        </NuxtLink>
        <NuxtLink to="/products" class="nav-link" active-class="nav-link--active" @click="closeSidebar">
          <span class="nav-link__icon"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg></span>
          Produits
        </NuxtLink>
        <NuxtLink to="/customers" class="nav-link" active-class="nav-link--active" @click="closeSidebar">
          <span class="nav-link__icon"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg></span>
          Clients
        </NuxtLink>
        <p class="sidebar__label sidebar__label--spaced">Gestion</p>
        <NuxtLink to="/analytics" class="nav-link" active-class="nav-link--active" @click="closeSidebar">
          <span class="nav-link__icon"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg></span>
          Analyses
        </NuxtLink>
        <NuxtLink to="/settings" class="nav-link" active-class="nav-link--active" @click="closeSidebar">
          <span class="nav-link__icon"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg></span>
          Paramètres
        </NuxtLink>
      </nav>
      <div class="sidebar__bottom">
        <div class="help-card">
          <div class="help-card__icon"><svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
          <strong>Besoin d'aide ?</strong><span>Notre équipe est là pour vous.</span><button>Contacter le
            support</button>
        </div>
        <div class="profile mt-2">
          <div class="avatar avatar--small">AN</div>
          <div class="profile__info">
            <strong>Andrix-ng</strong><span>Administrateur</span>
          </div>
          <button class="text-red-500 hover:text-red-600 ml-auto transition-colors focus:outline-none p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" title="Déconnexion">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </div>
    </aside>
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="closeSidebar" />
    <main class="main-content">
      <header
        class="sticky top-0 z-30 h-[76px] px-6 lg:px-10 flex items-center bg-white dark:bg-[#20202d] border-b border-gray-200 dark:border-gray-800 transition-colors duration-250 w-full shadow-sm flex-shrink-0">
        <button class="lg:hidden text-gray-500 text-2xl mr-4 bg-transparent border-none focus:outline-none"
          aria-label="Ouvrir le menu" @click="isSidebarOpen = true">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div class="text-sm text-gray-400 dark:text-gray-500 flex items-center">
          <span class="font-medium text-gray-400 dark:text-gray-500">Storeflow</span>
          <b class="mx-3 font-normal text-gray-300 dark:text-gray-700">/</b>
          <strong class="text-gray-800 dark:text-gray-100 font-bold">{{ currentPageName }}</strong>
        </div>
        <div class="flex items-center gap-4 lg:gap-6 ml-auto">
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

          <NuxtLink to="/settings" class="flex items-center gap-3 ml-2 hover:bg-gray-50 dark:hover:bg-white/5 p-1.5 pr-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50">
            <UserAvatar initials="AN" />
            <span class="text-sm font-bold text-gray-800 dark:text-gray-200 hidden md:block">Andrix-ng</span>
          </NuxtLink>
        </div>
      </header>
      <div class="page-content">
        <slot />
      </div>
    </main>
  </div>
</template>
