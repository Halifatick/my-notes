<script setup>
import BaseHeader from '@/components/base/BaseHeader.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import { useModalStore } from '@/stores/modal.js'
import { storeToRefs } from 'pinia'

const modalStore = useModalStore()
const { isOpen } = storeToRefs(modalStore)

import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.js'
useLifecycleLogger({ name: 'AppLayoutDefault' })
</script>

<template>
  <BaseHeader/>
  <main class="flex flex-auto">
    <slot />
  </main>

  <template v-show="isOpen">
    <BaseModal/>
  </template>
</template>

<style scoped lang="scss"></style>
