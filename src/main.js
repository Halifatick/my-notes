import { createApp } from 'vue'
import App from '@/App.vue'
import { LoggerPlugin } from '@/plugins/logger.plugin.js'
import router from '@/router'
import { PiniaPlugin } from '@/plugins/pinia.plugin.js'
import { AxiosPlugin } from '@/plugins/axios.plugin.js'

const app = createApp(App)

app.use(LoggerPlugin)
app.use(router)
app.use(PiniaPlugin)
app.use(AxiosPlugin)

app.mount('#app')
