<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal.js'
import { useAuthStore } from '@/stores/auth.js'
import AuthModal from '@/components/modals/AuthModal.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import PasswordInput from '@/components/Inputs/PasswordInput.vue'

const props = defineProps({
  id: {
    type: String,
    default: 'modal'
  },
})

const router = useRouter()

const authStore = useAuthStore()
const modalStore = useModalStore()

const { errors } = storeToRefs(authStore)

const modal = ref(null)

const initialForm = () => {
  return {
    email: "",
    password: "",
    ...(props.id === 'modalRegister' && { confirm_password: "" })
  }
}

const form = reactive(initialForm())

const handleOnClickSwitchModal = () => {
  modalStore.close().then(() => {
    modalStore.waitClose(() => {
      modalStore.open(
          AuthModal,
          {
            id: props.id === 'modalLogin' ? 'modalRegister' : 'modalLogin'
          }
      )
    })
  })
}

const handleOnClickSubmit = async () => {
  const method = props.id === 'modalLogin' ? authStore.login : authStore.register
  const close = props.id === 'modalLogin'
      ? async () => { await authStore.getUser().then(async () => { await router.push('/profile').then(async () => { await modalStore.close() }) }).catch(()=>{}) }
      : async () => { handleOnClickSwitchModal() }

  await method(form).then(async () => { await close() }).catch(()=>{})
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
        <h2>{{ props.id === 'modalLogin' ? 'Вход в ваш аккаунт' : 'Регистрация' }}</h2>
        <div class="flex flex-col gap-4 gap-md-6">
            <div class="flex flex-col gap-2">
              <p class="text-gray lh-1 px-6"><small>Email</small></p>
              <BaseInput
                  v-model="form.email"
                  :id="'email'"
                  :name="'email'"
                  :placeholder="'Введите Email'"
                  :autocomplete="'email'"
              />
              <p v-if="!authStore.isValid('email')"
                 class="text-red lh-1 px-6">
                <small>{{ authStore.errorFeedback('email') }}</small>
              </p>
            </div>
          <div class="flex flex-col gap-2">
            <p class="text-gray lh-1 px-6"><small>Введите пароль</small></p>
            <PasswordInput
                v-model="form.password"
                :isRegister="props.id === 'modalRegister'"
            />
            <p v-if="!authStore.isValid('password')"
               class="text-red lh-1 px-6">
              <small>{{ authStore.errorFeedback('password') }}</small>
            </p>
          </div>
            <template v-if="props.id === 'modalRegister'">
              <div class="flex flex-col gap-2">
                <p class="text-gray lh-1 px-6"><small>Введите пароль ещё раз</small></p>
                <PasswordInput
                    v-model="form.confirm_password"
                />
                <p v-if="!authStore.isValid('confirm_password')"
                   class="text-red lh-1 px-6">
                  <small>{{ authStore.errorFeedback('confirm_password') }}</small>
                </p>
              </div>
            </template>
        </div>
      </div>
      <div class="flex flex-col gap-3 gap-md-5">
        <div class="flex flex-col-reverse flex-md-row gap-3 gap-md-10 justify-between items-center">
          <div class="flex flex-wrap justify-center justify-xl-start justify-xxl-center gap-1"
               :class="[props.id === 'modalLogin' && 'gap-xl-0 gap-xxl-1']">
            <p class="lh-1">
              <small class="small">
                <strong>
                  {{ props.id === 'modalLogin' ? 'У вас нет аккаунта?' : 'У вас есть аккаунт?' }}
                </strong>
              </small>
            </p>
            <a href="javascript:void(0);" @click="handleOnClickSwitchModal">
              <p class="lh-1">
                <small class="small">
                  <strong>
                    {{ props.id === 'modalLogin' ? 'Зарегистрируйтесь' : 'Войдите' }}
                  </strong>
                </small>
              </p>
            </a>
          </div>
          <button type="button" class="btn btn-primary w-full w-md-auto text-center" @click="handleOnClickSubmit">
            Вход
          </button>
        </div>
        <div v-if="[404, 409].includes(errors.status)"
             class="w-100 text-red px-5 py-2 rounded-5 bg-danger bg-opacity-10"
        >
          <p class="lh-1">
            <small>
              {{ authStore.errorFeedback('global') }}
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