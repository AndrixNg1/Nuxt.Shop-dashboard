<script setup lang="ts">
withDefaults(
  defineProps<{ initials: string; size?: "small" | "tiny" | "default" }>(),
  { size: "default" },
);
</script>

<template>
  <span class="avatar" :class="`avatar--${size}`">{{ initials }}</span>
</template>
