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
import CreateCompany from '../views/CreateCompany.vue'
import OurPartners from '../views/OurPartners.vue'
import CompanyManagementStart from '../views/CompanyManagement/Start.vue'
import CompanyManagementCategories from '../views/CompanyManagement/Categories.vue'
import CompanyManagementProducts from '../views/CompanyManagement/Products.vue'
import AdminCategories from '../views/Admin/Categories.vue'
import AdminAttributes from '../views/Admin/Attributes.vue'

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
            },
            {
                path: '/create_company',
                name: 'CreateCompany',
                component: CreateCompany
            },
            {
                path: '/management/start',
                name: 'CompanyManagementStart',
                component: CompanyManagementStart
            },
            {
                path: '/management/categories',
                name: 'CompanyManagementCategories',
                component: CompanyManagementCategories
            },
            {
                path: '/management/products',
                name: 'CompanyManagementProducts',
                component: CompanyManagementProducts
            },
            {
                path: '/admin/attributes',
                name: 'AdminAttributes',
                component: AdminAttributes
            },
            {
                path: '/admin/categories',
                name: 'AdminCategories',
                component: AdminCategories
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
            },
            {
                path: '/our_partners',
                name: 'OurPartners',
                component: OurPartners
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
    if(to.meta.requiresAuth && !store.userIsLoggedIn) {
        next({ name: 'Login' })
    } else if(store.userIsLoggedIn && to.meta.isGuest) {
        next({ name: 'Advertisements' })
    } else {
        next()
    }
})

export default router