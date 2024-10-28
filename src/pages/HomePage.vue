<script setup>
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCrudStore } from '@/stores/crud.js'
import { useModalStore } from '@/stores/modal.js'
import NoteModal from '@/components/modals/NoteModal.vue'

const modalStore = useModalStore()
const crudStore = useCrudStore()
const { data, isLoading } = storeToRefs(crudStore)

const deleteNote = async (id) => {
  await crudStore.destroy(`notes/${id}`, false).then(async () => {
    await crudStore.getData('notes')
  }).catch(()=>{})
}

const handleOnClickOpenNoteModal = async () => {
  await modalStore.open(
      NoteModal,
      {
        id: 'modalNote'
      }
  )
}

onMounted(async () => {
  await crudStore.getData('notes')
})

onUnmounted(() => {
  crudStore.setDefaultStore()
})

import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.js'
useLifecycleLogger({ name: 'HomePage' })
</script>

<template>
  <div v-if="!isLoading && data.length > 0" class="w-full flex flex-wrap gap-5 gap-xxl-10 mb-5 mb-md-10">
    <div v-for="item in data" class="card-container w-full w-xl-1/3">
      <div class="card flex flex-col box-shadow">
        <div class="card-title relative py-5 pl-7 pr-17">
          <h4>{{ item.title }}</h4>
        </div>
        <div class="card-body pt-5 pb-7 px-7">
          <p class="text-truncate-multiline">{{ item.content }}</p>
        </div>
        <div class="card-footer flex justify-end p-2">
          <button type="button" class="btn btn-link flex gap-5 items-center px-6 py-3" @click="deleteNote(item.id)">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66699 1L17.667 17M17.667 1L1.66699 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>

  <button type="button"
          class="absolute btn-plus bottom-0 right-0 mb-10 mr-2 mr-xl-3 mr-xxl-10 z-5"
          aria-label="Create note"
          @click="handleOnClickOpenNoteModal"
  />
</template>

<style scoped lang="scss">
.card {
  &-title, &-body, &-footer {
    background-color: var(--green-light);
  }

  &-title {
    $size: 40px;
    position: relative;
    border-top-left-radius: 0.75rem;
    border-bottom: 1px solid var(--green);

    &:before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      top: 0;
      right: 0;
      border-bottom: $size solid var(--green);
      border-right: $size solid transparent;
      border-bottom-left-radius: 0.75rem;
    }

    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      top: 0;
      right: 0;
      border-top: $size solid var(--body-bg);
      border-left: $size solid transparent;
    }
  }

  &-body {
    & p {
      @media (max-width: 767.98px) {
        font-size: 1rem;
        line-height: 1.5;
      }
    }
  }

  &-footer {
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
  }

  &.box-shadow {
    --ring-color: rgba(0,0,0,.4);
    box-shadow: 0 15px 15px -10px var(--ring-color);
  }

  &-container {
    //max-height: 480px;

    &.w-xl-1\/3 {
      @media (min-width: 1200px) {
        width: calc(33.333333% - calc(1.25rem * 2 / 3));
      }

      @media (min-width: 1400px) {
        width: calc(33.333333% - calc(2.5rem * 2 / 3));
      }
    }
  }
}
</style>
