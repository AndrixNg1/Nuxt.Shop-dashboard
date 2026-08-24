<script setup lang="ts">
const now = ref(new Date());

// Met à jour toutes les minutes
onMounted(() => {
  const interval = setInterval(() => { now.value = new Date(); }, 60_000);
  onUnmounted(() => clearInterval(interval));
});

const greeting = computed(() => {
  const h = now.value.getHours();
  if (h >= 5  && h < 12) return 'Bonjour';
  if (h >= 12 && h < 18) return 'Bon après-midi';
  if (h >= 18 && h < 22) return 'Bonsoir';
  return 'Bonne nuit';
});

const greetingEmoji = computed(() => {
  const h = now.value.getHours();
  if (h >= 5  && h < 12) return '☀️';
  if (h >= 12 && h < 18) return '👋';
  if (h >= 18 && h < 22) return '🌆';
  return '🌙';
});

const formattedDate = computed(() =>
  now.value.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  })
);

const formattedTime = computed(() =>
  now.value.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
);
</script>

<template>
  <section class="flex flex-col gap-1.5">
    <div class="flex items-center gap-2">
      <p class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 capitalize">
        {{ formattedDate }}
      </p>
      <span class="text-xs text-gray-300 dark:text-gray-600">·</span>
      <p class="text-xs font-semibold text-purple-500 dark:text-purple-400">{{ formattedTime }}</p>
    </div>
    <h1 class="m-0 text-3xl font-extrabold text-gray-900 dark:text-white">
      {{ greeting }}, Andrix-ng
      <span class="inline-block">{{ greetingEmoji }}</span>
    </h1>
    <p class="text-sm text-gray-500 dark:text-gray-400">Voici ce qu'il se passe dans votre boutique aujourd'hui.</p>
  </section>
</template>
