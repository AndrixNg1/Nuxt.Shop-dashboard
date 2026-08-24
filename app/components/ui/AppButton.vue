<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'ghost'
  size?: 'default' | 'small'
  type?: 'button' | 'submit'
}>(), { variant: 'primary', size: 'default', type: 'button' })
</script>

<template>
  <button class="app-button" :class="[`app-button--${variant}`, `app-button--${size}`]" :type="type"><slot /></button>
</template>
