<script setup lang="ts">
const backgroundLoaded = ref(false)
const backgroundImage = 'https://api.amarea.cn/getbg/hp'

watch(backgroundLoaded, () => {
  if (backgroundLoaded.value) {
    document.querySelector('#loading')?.classList.add('loaded')
    setTimeout(() => {
      document.querySelector('#loading')?.remove()
    }, 1000)
  }
})

onMounted(() => {
  setTimeout(() => {
    backgroundLoaded.value = true
  }, 5000)
  const imgEl = new Image()
  imgEl.onload = () => {
    backgroundLoaded.value = true
    imgEl.remove()
  }
  imgEl.src = backgroundImage
  document.body.style.setProperty(
    '--o-bg',
      `url(${backgroundImage})`,
  )
})
</script>

<template>
  <Transition name="bg-show">
    <div v-show="backgroundLoaded" class="bg fixed left-0 top-0 z-[-1] h-screen w-screen" />
  </Transition>
  <div class="z-10 flex min-h-screen w-full flex-col items-center justify-center text-white">
    <div v-show="backgroundLoaded" class="min-h-screen w-full overflow-hidden bg-black/40 transition-all duration-300 md:flex">
      <UserProfile
        avatar="/favicon.ico"
        username="牧之"
        github="https://github.com/szyao"
        telegram="https://t.me/OriLight"
        email="mailto:i@hk4e.com"
      />
      <div class="flex flex-1 items-center p-4 sm:px-10 sm:py-16">
        <div class="flex flex-col gap-4">
          <div>
            <Title title="站点" subtitle="Site" />
            <div class="flex flex-wrap gap-3">
              <WithStatus text="知识库">
                <LinkBlock
                  title="自留地"
                  link="https://www.yuque.com/szyao/note"
                />
              </WithStatus>
              <LinkBlock
                title="个人项目"
                link="https://github.com/szyao"
              />
              <LinkBlock
                title="阿里云盘"
                link="https://www.aliyundrive.com/"
              />
            </div>
          </div>
          <div>
            <Title title="在玩的游戏" subtitle="Playing" />
            <div class="flex flex-wrap gap-3">
              <WithStatus text="等纳塔">
                <TextBlock>
                  <img src="/icon/game/genshin.png" class="inline-block w-5 rounded">
                  原神
                </TextBlock>
              </WithStatus>
              <WithStatus text="已退坑">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/starrail.png" class="inline-block w-5 rounded">
                  星穹铁道
                </TextBlock>
              </WithStatus>
              <WithStatus text="已退坑">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/zzz.png" class="inline-block w-5 rounded">
                  绝区零
                </TextBlock>
              </WithStatus>
              <WithStatus text="已退坑">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/arknights.png" class="inline-block w-5 rounded">
                  明日方舟
                </TextBlock>
              </WithStatus>
              <WithStatus text="已退坑">
                <TextBlock class="flex items-center gap-2" :disabled="true">
                  <img src="/icon/game/bluearchive.png" class="inline-block w-5 rounded">
                  蔚蓝档案
                </TextBlock>
              </WithStatus>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
