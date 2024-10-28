<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal.js'
import { useCrudStore } from '@/stores/crud.js'
import BaseInput from '@/components/base/BaseInput.vue'
import LoginModal from "@/components/modals/AuthModal.vue";
import {adjustTextarea} from "@/common/adjustTextarea.js";

defineProps({
  id: {
    type: String,
    default: 'modal'
  },
})

const modalStore = useModalStore()
const crudStore = useCrudStore()
const { errors } = storeToRefs(crudStore)

const modal = ref(null)

const initialForm = () => {
  return {
    title: "",
    content: "",
  }
}

const form = reactive(initialForm())

const handleOnClickSubmit = async () => {
  await crudStore.save('notes', form).then(async () => {
    await crudStore.getData('notes').then(async () => {
      await modalStore.close()
    }).catch(()=>{})
  }).catch(()=>{})
}
</script>

<template>
  <div
      :id="id"
      class="modal relative bg-white rounded-lg text-left overflow-hidden shadow-xl w-full px-4 py-22.5 p-md-14 p-xxl-20"
      role="dialog"
      ref="modal"
      aria-modal="true"
      aria-labelledby="modal-headline"
  >
    <button type="button"
            class="absolute btn-close top-0 right-0 m-3 m-md-5"
            @click="modalStore.close()"
            aria-label="Close"
    />
    <div class="h-full flex flex-col justify-between gap-7 gap-md-10">
      <div class="flex flex-col gap-7 gap-md-10">
        <h2>Добавление заметки</h2>
        <div class="flex flex-col gap-4 gap-md-6">
          <div class="flex flex-col gap-2">
            <p class="text-gray lh-1 px-6"><small>Название заметки</small></p>
            <BaseInput
                v-model="form.title"
                :id="'title'"
                :name="'title'"
                :placeholder="'Введите название'"
                :autocomplete="'title'"
            />
            <div class="flex flex-wrap justify-between gap-2">
              <p v-if="!crudStore.isValid('title')"
                 class="flex-auto text-red lh-1 px-6">
                <small>{{ crudStore.errorFeedback('title') }}</small>
              </p>
              <p class="flex-auto text-end text-gray lh-1 px-6"
                 :class="[form.title.length > 64 && 'text-red']"><small>{{ `${form.title.length}/64` }}</small></p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-gray lh-1 px-6"><small>Текст заметки</small></p>
            <textarea
                :id="'content'"
                :name="'content'"
                v-model="form.content"
                :placeholder="'Введите текст'"
                :autocomplete="'content'"
                class="form-control"
                rows="5"
                @input="adjustTextarea"
            />
            <div class="flex flex-wrap justify-between gap-2">
              <p v-if="!crudStore.isValid('content')"
                 class="flex-auto text-red lh-1 px-6">
                <small>{{ crudStore.errorFeedback('content') }}</small>
              </p>
              <p class="flex-auto text-end text-gray lh-1 px-6"
                 :class="[form.content.length > 255 && 'text-red']"><small>{{ `${form.content.length}/255` }}</small></p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3 gap-md-5">
        <div class="flex flex-col-reverse flex-md-row gap-3 gap-md-10 justify-between items-center">
          <div class="flex flex-wrap justify-center justify-xl-start justify-xxl-center gap-1"></div>
          <button type="button" class="btn btn-primary w-full w-md-auto text-center" @click="handleOnClickSubmit">
            Вход
          </button>
        </div>
        <div v-if="[404, 409].includes(errors.status)"
             class="w-100 text-red px-5 py-2 rounded-5 bg-danger bg-opacity-10"
        >
          <p class="lh-1">
            <small>
              {{ crudStore.errorFeedback('global') }}
            </small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  @media (max-width: 767.98px) {
    height: calc(100dvh - 0.5rem);
    width: calc(100% - 0.5rem);
    margin: 0.25rem;
  }
  @media (min-width: 768px) {
    max-width: 688px;
  }
  @media (min-width: 1200px) {
    max-width: 594px;
  }
  @media (min-width: 1400px) {
    max-width: 780px;
  }
}

h2 {

  @media (max-width: 767.98px) {
    line-height: 1;
    font-size: 2rem;
  }
}
</style>