<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import OnPasswordIcon from '@/components/icons/OnPasswordIcon.vue'
import OffPasswordIcon from '@/components/icons/OffPasswordIcon.vue'

const props = defineProps({
  isRegister: {
    type: Boolean,
    default: true
  },
  isConfirm: {
    type: Boolean,
    default: false
  },
})

const model = defineModel({})

const randomValuePass = ref(`pass__${Math.round(Number(Math.random() * (999999999 - 1) + 999999999))}`)
const passwordHidden = ref(true)

const changePasswordVisibility = () => {
  passwordHidden.value = !passwordHidden.value;
  document.getElementById(props.isRegister ? randomValuePass.value : 'current-password').setAttribute('type', passwordHidden.value ? 'password' : 'text')
}
</script>

<template>
  <div class="relative">
    <BaseInput
        v-model="model"
        :id="isRegister ? randomValuePass : 'current-password'"
        :name="isRegister ? randomValuePass : 'current-password'"
        :autocomplete="isRegister ? 'new-password' : 'current-password'"
        :placeholder="'Введите пароль'"
        :type="'password'"
    />
    <OnPasswordIcon v-if="passwordHidden" class="password-icon" @click="changePasswordVisibility"/>
    <OffPasswordIcon v-else class="password-icon" @click="changePasswordVisibility"/>
  </div>
</template>

<style scoped lang="scss">

</style>