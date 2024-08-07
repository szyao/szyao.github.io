<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="pb-4 font-bold">
    <span class="text-3xl">{{ title }}</span>
    <span v-if="subtitle" class="pl-1">{{ subtitle }}</span>
  </div>
</template>
