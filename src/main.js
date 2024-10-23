import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { PiniaPlugin } from '@/plugins/pinia.plugin.js'
import { LoggerPlugin } from '@/plugins/logger.plugin.js'

const app = createApp(App)

app.use(router)
app.use(PiniaPlugin)
app.use(LoggerPlugin)

app.mount('#app')
