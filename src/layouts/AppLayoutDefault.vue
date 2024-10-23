<script setup>
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.js'

useLifecycleLogger({ name: 'AppLayoutDefault' })
</script>

<template>
  <slot />
</template>

<style scoped lang="scss"></style>
