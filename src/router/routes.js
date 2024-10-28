import { RouteNamesEnum } from '@/router/router.types.js'

const MainPage = () => import('@/pages/MainPage.vue')
const HomePage = () => import('@/pages/HomePage.vue')

export default [
    {
        path: '/',
        name: RouteNamesEnum.main,
        component: MainPage
    },
    {
        path: '/profile',
        name: RouteNamesEnum.profile,
        component: HomePage,
        meta: {
            requiresAuth: true
        },
    },
]
