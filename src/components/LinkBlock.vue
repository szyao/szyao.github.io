<script setup lang="ts">
defineProps<{
  title: string
  link: string
}>()

defineEmits(['tipsUpdate'])
</script>

<template>
  <a
    :href="link"
    class="inline-block break-keep rounded-lg bg-black/30 px-6 py-3 transition-all hover:scale-105 hover:bg-black/50"
    target="_blank"
  >
    {{ title }}
  </a>
</template>
