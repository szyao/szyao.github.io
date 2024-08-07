<script setup lang="ts">
import { GithubAlt, TelegramPlane } from '@vicons/fa'

defineProps<{
  avatar: string
  username: string
  github?: string
  telegram?: string
  email?: string
}>()
</script>

<template>
  <div class="w-full md:w-[300px] xl:w-[400px]">
    <div class="flex w-full shrink-0 items-center justify-center bg-black/30 p-8 backdrop-blur-sm md:fixed md:h-screen md:w-[300px] xl:w-[400px]">
      <div class="flex items-center gap-3 md:flex-col">
        <img
          :src="avatar"
          class="size-[96px] transition-transform hover:scale-105 sm:size-[120px]"
          alt="avatar"
        >
        <div class="flex flex-col items-center gap-3">
          <div class="text-3xl font-bold">
            {{ username }}
          </div>
          <div class="flex gap-2">
            <a
              v-if="github"
              :href="github"
              class="group p-1 transition-transform hover:scale-110"
              target="_blank"
            >
              <GithubAlt class="size-8 transition-colors group-hover:text-gray-400" />
            </a>
            <a
              v-if="telegram"
              :href="telegram"
              class="group p-1 transition-transform hover:scale-110"
              target="_blank"
            >
              <TelegramPlane class="size-8 transition-colors group-hover:text-gray-400" />
            </a>
            <a
              v-if="email"
              :href="email"
              class="group p-1 transition-transform hover:scale-110"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-8 transition-colors group-hover:text-gray-400">
                <path fill-rule="evenodd" d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
