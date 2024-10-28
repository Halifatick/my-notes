<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import TaskBoardIcon from '@/components/icons/TaskBoardIcon.vue'
import { debounce } from '@/common/debounce.js'

const updateHeight = () => {
  const textContainer = document.getElementById('textContainer')
  const svgContainer = document.getElementById('svgContainer')

  if (!textContainer || !svgContainer) return

  if (window.innerWidth > 991.98) {
    const svgHeight = svgContainer.offsetHeight + 'px';
    textContainer.style.height !== svgHeight && (textContainer.style.height = svgHeight)
  } else {
    textContainer.style.height !== 'initial' && (textContainer.style.height = 'initial');
  }
}

const debouncedUpdateHeight = debounce(updateHeight);

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', debouncedUpdateHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', debouncedUpdateHeight)
})

import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.js'
useLifecycleLogger({ name: 'MainPage' })
</script>

<template>
  <div class="w-full flex flex-wrap pt-5 pt-md-10 pt-lg-0 gap-4 gap-md-0">
    <div id="textContainer" class="w-full w-lg-1/2 w-xl-5.5/12 w-2xxl-5/12 flex-none flex flex-col items-center justify-lg-center text-center text-lg-start gap-5 gap-xl-10 pr-0 pr-2xxl-15">
      <h1>Мои заметки</h1>
      <h3 class="text-gray">Не забывай о важном, храни его в облаке.</h3>
    </div>
    <div class="w-full w-lg-1/2 w-xl-6.5/12 w-2xxl-7/12 flex-none flex justify-center items-end items-lg-start">
      <div id="svgContainer" class="flex w-full h-auto svg-container">
        <TaskBoardIcon/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>