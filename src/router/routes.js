import { RouteNamesEnum } from '@/router/router.types.js'

const HomePage = () => import('@/pages/HomePage.vue')

export default [
    {
        path: '/',
        name: RouteNamesEnum.home,
        component: HomePage
    },
]
