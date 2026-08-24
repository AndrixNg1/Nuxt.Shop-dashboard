<script setup lang="ts">
defineProps<{ label: string; value: string; change: string; detail: string; icon: string; tone: string }>()
</script>

<template>
  <AppCard>
    <div class="stat-card__top"><span>{{ label }}</span><span class="stat-card__icon" :class="`tone-${tone}`">{{ icon
    }}</span></div><strong>{{ value }}</strong>
    <div class="stat-card__footer"><b>{{ change }}</b><span>{{ detail }}</span></div>
  </AppCard>
</template>
