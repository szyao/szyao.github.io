<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="relative">
    <slot />
    <div class="absolute right-0 top-[-6px] text-xs">
      {{ text }}
    </div>
  </div>
</template>
