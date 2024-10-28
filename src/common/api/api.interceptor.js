import router from '@/router/index.js'

const setup = (api, store = null) => {

    const interceptorRequest = api.interceptors.request.use(
        (config) => {
            if(store !== null && store.tokens.accessToken)
                config.headers['Authorization'] = `Bearer ${store.tokens.accessToken}`
            return config
        },
        Promise.reject
    )
    const createAxiosResponseInterceptor = () => {
        const interceptorResponse = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalConfig = error.config

                if (error.response.status !== 401 || originalConfig._retry || store === null)
                    return Promise.reject(error)

                api.interceptors.response.eject(interceptorResponse)
                originalConfig._retry = true

                try {
                    // Закомментированный блок рефреша токена
                    /*
                    const { refreshToken } = JSON.parse(localStorage.getItem('tokens'))
                    const res = await api.post("/admin/refresh-token", { refreshToken })
                    const { accessToken } = res.data
                    await store.setTokens(accessToken, refreshToken)
                    originalConfig.headers['Authorization'] = `Bearer ${accessToken}`
                    return api(originalConfig)
                    */

                    // если рефреш токена не используется, просто разлогинить
                    await store.logout(true)
                } catch (err) {
                    return Promise.reject(err)
                } finally {
                    createAxiosResponseInterceptor()
                }
            }
        )
    }

    createAxiosResponseInterceptor()
}

export default setup
