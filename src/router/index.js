import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from '@/router/routes.js'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware.js'

import { VITE_APP_ENABLE_DEBUG_UTILS } from '@/common/appConfig.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...userRoutes,
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404'
        }
    ]
})

router.beforeEach(loadLayoutMiddleware)

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && localStorage.getItem('tokens') === null)
        next({path: '/', params: { nextUrl: to.fullPath }})
    else
        next()
})

if (window && VITE_APP_ENABLE_DEBUG_UTILS) {
    window.$router = router
}

export default router
