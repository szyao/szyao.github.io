<script setup lang="ts">
defineProps<{
  title: string
  link: string
  description: string
  background: string
}>()

defineEmits(['tipsUpdate'])
</script>

<template>
  <a
    :href="link"
    class="group relative inline-block w-full overflow-hidden rounded-lg bg-black sm:w-[300px]"
    target="_blank"
  >
    <img
      class="mask-1/2 w-full transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
      :src="background"
    >
    <div class="absolute top-0 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      {{ description }}
    </div>
    <div class="absolute bottom-0 origin-bottom-left p-2 text-white transition-all duration-300 group-hover:scale-125">
      {{ title }}
    </div>
  </a>
</template>
