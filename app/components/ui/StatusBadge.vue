<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'success' | 'warning' | 'danger' | 'neutral' }>(), { variant: 'neutral' })
</script>

<template><span class="status" :class="`status--${variant}`"><slot /></span></template>
