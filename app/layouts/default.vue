<script setup lang="ts">
const isSidebarOpen = ref(false)
const closeSidebar = () => { isSidebarOpen.value = false }
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }">
      <div class="brand">
        <div class="brand__mark">S</div><span>Store<span class="brand__accent">flow</span></span>
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
        <div class="help-card">
          <div class="help-card__icon">?</div><strong>Besoin d'aide ?</strong><span>Notre équipe est là pour
            vous.</span><button>Contacter le support</button>
        </div>
        <div class="profile">
          <div class="avatar avatar--small">AM</div>
          <div class="profile__info"><strong>Alex Martin</strong><span>Administrateur</span></div><span
            class="profile__more">•••</span>
        </div>
      </div>
    </aside>
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="closeSidebar" />
    <main class="main-content">
      <header class="topbar"><button class="menu-toggle" aria-label="Ouvrir le menu"
          @click="isSidebarOpen = true">☰</button>
        <div class="breadcrumb"><span>Storeflow</span><b>/</b><strong>Vue d'ensemble</strong></div>
        <div class="topbar__actions"><button class="icon-button" aria-label="Rechercher">⌕</button><ThemeToggle /><button
            class="icon-button notification" aria-label="Notifications">♧<i /></button><UserAvatar initials="AM" />
        </div>
      </header>
      <div class="page-content">
        <slot />
      </div>
    </main>
  </div>
</template>
