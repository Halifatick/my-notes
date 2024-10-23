import { createPinia } from 'pinia'
const piniaPlugin = createPinia()

export const PiniaPlugin = {
    install(app) {
        app.use(piniaPlugin)
    }
}
