import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated } from 'vue'
import { VITE_APP_ENABLE_DEBUG_UTILS } from '@/common/appConfig'

export function useLifecycleLogger(payload) {
    if (!VITE_APP_ENABLE_DEBUG_UTILS) {
        return
    }

    onBeforeMount(() => {
        console.log(payload.name, 'onBeforeMount')
    })

    onMounted(() => {
        console.log(payload.name, 'onMounted')
    })

    onBeforeUpdate(() => {
        console.log(payload.name, 'onBeforeUpdate')
    })

    onUpdated(() => {
        console.log(payload.name, 'onUpdated')
    })

    onBeforeUnmount(() => {
        console.log(payload.name, 'onBeforeUnmount')
    })

    onUnmounted(() => {
        console.log(payload.name, 'onUnmounted')
    })
}
