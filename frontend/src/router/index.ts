import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import { useUserStore } from '../store'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Advertisements from '../views/Advertisements.vue'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'
import GuestLayout from '../layouts/GuestLayout.vue'
import Profile from '../views/Profile.vue'
import AllAvailableLayout from '../layouts/AllAvailableLayout.vue'
import ListAProduct from '../views/ListAProduct.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/advertisements',
        component: AuthenticatedLayout,
        name: 'Authenticated',
        meta: { requiresAuth: true },
        children: [
            {
                path: '/profile',
                name: 'Profile',
                component: Profile
            },
            {
                path: '/list_a_product',
                name: 'ListAProduct',
                component: ListAProduct
            }
        ]
    },
    {
        path: '/guest',
        redirect: '/login',
        name: 'Guest',
        component: GuestLayout,
        meta: { isGuest: true },
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]
    },
    {
        path: '/',
        redirect: '/advertisements',
        name: 'AllAvailable',
        component: AllAvailableLayout,
        children: [
            {
                path: '/advertisements',
                name: 'Advertisements',
                component: Advertisements
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const store = useUserStore()
    if(to.meta.requiresAuth && !store.user.isLoggedIn) {
        next({ name: 'Login' })
    } else if(store.user.isLoggedIn && to.meta.isGuest) {
        next({ name: 'Advertisements' })
    } else {
        next()
    }
})

export default router