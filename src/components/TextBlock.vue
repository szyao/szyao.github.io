<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <div
    class="w-fit rounded-lg bg-black/40 px-3 py-2"
    :class="{
      ' text-gray-400 grayscale': disabled,
    }"
  >
    <slot />
  </div>
</template>
