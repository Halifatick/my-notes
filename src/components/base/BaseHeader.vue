<script setup>
import {nextTick, ref} from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { useModalStore } from '@/stores/modal'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import EntranceIcon from '@/components/icons/EntranceIcon.vue'
import LoginModal from '@/components/modals/AuthModal.vue'
import AvatarIcon from '@/components/icons/AvatarIcon.vue'
import useDetectOutsideClick from '@/common/hooks/useDetectOutsideClick.js'

const authStore = useAuthStore()
const modalStore = useModalStore()

const { user } = storeToRefs(authStore)

const menu = ref(null)
const isOpen = ref(false)
const outsideClick = ref(false)

const handleOnClickOpenLoginModal = async () => {
  await modalStore.open(
      LoginModal,
      {
        id: 'modalLogin'
      }
  )
}

const handleOnClickOpenMenu = async () => {
  isOpen.value = !isOpen.value
}

const logout = async () => {
  await authStore.logout().then(() => handleOnClickOpenMenu()).catch(()=>{})
}

useDetectOutsideClick(menu, () => {
  if (outsideClick.value) {
    outsideClick.value = false
    if (isOpen.value)
      handleOnClickOpenMenu()
  } else {
    if(isOpen.value) {
      outsideClick.value = true
    }
  }
})
</script>

<template>
  <header class="flex-none my-5 my-xl-5 my-xxl-10">
    <div class="flex gap-5 items-center justify-between">
      <router-link :to="{path: '/'}" class="flex my-2.5 my-md-1" aria-label="My Notes">
        <LogoIcon/>
      </router-link>
      <BaseButton
          v-if="!authStore.isAuth()"
          class="flex gap-3"
          @click="handleOnClickOpenLoginModal">
        <EntranceIcon/>
        <p>Вход</p>
      </BaseButton>
      <div v-if="authStore.isAuth() && user !== null && user.email" class="relative grid">
        <div class="flex gap-3 items-center text-truncate cursor-pointer"  @click="handleOnClickOpenMenu">
          <p class="lh-1 text-truncate">
            <small class="small">{{ user.email }}</small>
          </p>
          <AvatarIcon class="flex-none"/>
        </div>
        <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
        >
          <div v-if="isOpen"
               ref="menu"
               id="menu"
               class="absolute right-0 top-100 z-10 mt-3 origin-top-right rounded-8 bg-dark-middle box-shadow focus:outline-none">
            <div class="flex flex-col gap-3 p-6 p-md-10">
              <router-link :to="{ path: '/profile' }" @click="handleOnClickOpenMenu">
                <small><strong>Профиль</strong></small>
              </router-link>
              <a href="javascript:void(0)" @click="logout">
                <small><strong>Выйти</strong></small>
              </a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.box-shadow {
  --ring-color: rgba(0,0,0,.6);
  box-shadow: 0 15px 46px -10px var(--ring-color);
}

#menu:before{
  content:'';
  display:block;
  width:0;
  height:0;
  position:absolute;

  border-bottom: 9px solid var(--dark-middle);
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  top:-9px;
  right:20px;

  @media (max-width: 767.98px) {
    right:9px;
  }
}
</style>