<script setup>
import {computed, onBeforeUnmount, onMounted, reactive, watch} from 'vue'
import { debounce } from '@/common/debounce.js'

const svg = reactive({
  size: 'big',
  width: '56',
  height: '56',
  svgViewBox: '0 0 56 56'
})

const updateViewBox = () => {
  const width = document.documentElement.clientWidth
  const isSmallScreen = width < 768
  svg.height = isSmallScreen ? '36' : '56'
  svg.width = isSmallScreen ? '36' : '56'
  svg.svgViewBox = isSmallScreen ? '0 0 56 56' : '0 0 56 56'
  svg.size = isSmallScreen ? 'little' : 'big'
}

const debouncedUpdateViewBox = debounce(updateViewBox)

onMounted(() => {
  updateViewBox()
  window.addEventListener('resize', debouncedUpdateViewBox)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', debouncedUpdateViewBox)
})
</script>

<template>
  <svg :width="svg.width" :height="svg.height" :viewBox="svg.svgViewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle fill="var(--dark-middle)" cx="28" cy="28" r="28"/>
    <circle stroke="white" stroke-width="2" cx="28" cy="20" r="5"/>
    <path stroke="white" stroke-width="2" d="M38 42V34C38 31.7909 36.2091 30 34 30H22C19.7909 30 18 31.7909 18 34V42"/>
  </svg>
</template>

<style scoped lang="scss">

</style>