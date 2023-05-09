<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ArrowLeftOnRectangleIcon, Cog8ToothIcon, BuildingOfficeIcon} from '@heroicons/vue/24/outline'
import { useUserStore } from '../store'
import { onMounted, ref } from 'vue'
import axios from '../axios'
import ICompany from '../interfaces/ICompany'
import companyCreatedEmitter from '../emitters/companyCreatedEmitter'
const emit = defineEmits<{
  (e: 'profileNavigation', href: string): void
}>()

const store = useUserStore()
async function onLogout() {
    await store.logout()
}

companyCreatedEmitter.on('companyCreated', () => {
  setCompanyName()
})

const company = ref<ICompany>({} as ICompany)
onMounted(async () => {
    setCompanyName()
})

async function setCompanyName()
{
    try{
        if(store.user.company_id) {
            const response = await axios.get(`/api/company/${store.user.company_id}`)
            if(response) {
                company.value = response.data.data
            }
        }
    } catch(error) {
        console.log(error)
    }
}
</script>

<template>
    <div>
        <Menu as="div" class="relative inline-block text-left">
            <div>
                <MenuButton class="inline-flex justify-center rounded-md text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <span class="inline-block h-7 w-7 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-bg-2">
                        <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                </MenuButton>
            </div>

            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <MenuItems class="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-dark-bg-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div v-if="store.userIsLoggedIn">
                        <div>
                            <MenuItem as="div" v-slot="{ active }">
                                <!--<router-link to="/profile">-->
                                    <a @click="$emit('profileNavigation', '/profile')" :class="['group flex w-full items-center rounded-md text-sm px-4 py-2 text-light-text dark:text-dark-text', active ? 'bg-gray-100 dark:bg-dark-bg-2' : '']">
                                        <Cog8ToothIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                                        {{$t('profile.profile')}}
                                    </a>
                                <!--</router-link>-->
                            </MenuItem>
                        </div>
                        <div>
                            <MenuItem as="div" v-slot="{ active }">
                                <!--<router-link to="/admin/categories">-->
                                    <a @click="$emit('profileNavigation', '/admin/categories')" :class="['group flex w-full items-center rounded-md text-sm px-4 py-2 text-light-text dark:text-dark-text', active ? 'bg-gray-100 dark:bg-dark-bg-2' : '']">
                                        <Cog8ToothIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                                        {{$t('profile.admin')}}
                                    </a>
                                <!--</router-link>-->
                            </MenuItem>
                        </div>
                        <div :key="store.user.company_id">
                        <div v-if="!store.user.company_id">
                            <MenuItem as="div" v-slot="{ active }">
                                <!--<router-link to="/create_company">-->
                                    <a @click="$emit('profileNavigation', '/create_company')" :class="['group flex w-full items-center rounded-md text-sm px-4 py-2 text-light-text dark:text-dark-text', active ? 'bg-gray-100 dark:bg-dark-bg-2' : '']">
                                        <BuildingOfficeIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                                        {{$t('profile.create_company')}}
                                    </a>
                                <!--</router-link>-->
                            </MenuItem>
                        </div>
                        <div v-else>
                            <MenuItem as="div" v-slot="{ active }">
                                <!--<router-link :to="`/management/${company.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '')}`">-->
                                <!--<router-link to="/management/start">-->
                                    <a @click="$emit('profileNavigation', '/management/start')" :class="['group flex w-full items-center rounded-md text-sm px-4 py-2 text-light-text dark:text-dark-text', active ? 'bg-gray-100 dark:bg-dark-bg-2' : '']">
                                        <BuildingOfficeIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                                        {{ company.name }}
                                    </a>
                                <!--</router-link>-->
                            </MenuItem>
                        </div>
                        </div>
                        <div>
                            <MenuItem as="div" v-slot="{ active }">
                                <a :class="['group flex w-full items-center rounded-md text-sm px-4 py-2 text-light-text dark:text-dark-text', active ? 'bg-gray-100 dark:bg-dark-bg-2' : '']" @click="onLogout">
                                    <ArrowLeftOnRectangleIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                                    {{$t('profile.logout')}}
                                </a>
                            </MenuItem>
                        </div>
                    </div>
                    <div v-else>
                        <div>
                            <MenuItem as="div" v-slot="{ active }">
                                <!--<router-link to="/login">-->
                                    <a @click="$emit('profileNavigation', '/login')" :class="['group flex w-full items-center rounded-md text-sm px-4 py-2 text-light-text dark:text-dark-text', active ? 'bg-gray-100 dark:bg-dark-bg-2' : '']">
                                        {{$t('profile.login')}}
                                    </a>
                                <!--</router-link>-->
                            </MenuItem>
                        </div>
                        <div>
                            <MenuItem as="div" v-slot="{ active }">
                                <!--<router-link to="/register">-->
                                    <a @click="$emit('profileNavigation', '/register')" :class="['group flex w-full items-center rounded-md text-sm px-4 py-2 text-light-text dark:text-dark-text', active ? 'bg-gray-100 dark:bg-dark-bg-2' : '']">
                                        {{$t('profile.register')}}
                                    </a>
                                <!--</router-link>-->
                            </MenuItem>
                        </div>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>
  
