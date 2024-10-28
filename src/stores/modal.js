import { markRaw, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { useCrudStore } from '@/stores/crud.js'

export const useModalStore = defineStore("modal", () => {
    const isOpen = ref(false)
    const view = ref(null)
    const viewEl = ref(null)
    const props = ref({})
    const crudStore = useCrudStore()
    const authStore = useAuthStore()

    const open = async (newView, newProps = {}) => {
        isOpen.value = true
        view.value = markRaw(newView)
        props.value = newProps

        await waitElement()
    }

    const close = async () => {
        if (isOpen.value) {
            viewEl.value = null
            isOpen.value = false
            view.value = null
            props.value = {}
            crudStore.resetErrors()
            authStore.resetErrors()
        }
    }

    const waitElement = async () => {
        let interval = setInterval(() => {
            let element = document.getElementById(props.value.id)
            if (element){
                clearInterval(interval)
                viewEl.value = element
            }
        }, 50)
    }

    const waitClose = async (fn = () => {}) => {
        setTimeout(() => {
            fn()
        }, 200)
    }

    return {
        isOpen,
        view,
        viewEl,
        props,
        open,
        close,
        waitClose,
    }
})

export default useModalStore;
