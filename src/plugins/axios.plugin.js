import axiosInterceptor from '@/common/api/api.interceptor.js'
import api from '@/common/api/api.js'
import { useAuthStore } from '@/stores/auth.js'
import VueAxios from 'vue-axios'

export const AxiosPlugin = {
    install(app) {
        axiosInterceptor(api, useAuthStore())
        app.use(VueAxios, api)
        app.provide('axios', app.config.globalProperties.axios)
    }
}
