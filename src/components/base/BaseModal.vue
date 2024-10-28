<script setup>
import {ref, Transition} from 'vue'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal.js'
import useClickOutside from '@/common/useClickOutside'

const modalStore = useModalStore()
const { isOpen, view, props } = storeToRefs(modalStore)
const modal = ref(null)
const { onClickOutside } = useClickOutside()

onClickOutside(modal, () => {
  if (isOpen.value === true) {
    modalStore.close()
  }
})
</script>

<template>
  <teleport to="body">
    <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200 transform"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          ref="modal-backdrop"
          class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
          v-show="isOpen"
      >
        <div
            class="flex items-center justify-center min-h-dvh text-center"
        >
          <transition
              enter-active-class="transition ease-out duration-300 transform"
              enter-from-class="opacity-0 translate-y-10 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="ease-in duration-200"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
          >
            <component :is="view" v-bind="props" ref="modal" v-if="isOpen"></component>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">

</style>