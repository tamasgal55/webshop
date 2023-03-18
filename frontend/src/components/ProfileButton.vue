<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ArrowLeftOnRectangleIcon, Cog8ToothIcon} from '@heroicons/vue/24/outline'
import { useUserStore } from '../store'
import { ref } from 'vue'

const store = useUserStore()
async function onLogout() {
    await store.logout()
}

</script>

<template>
    <div>
        <Menu as="div" class="relative inline-block text-left">
            <div>
                <MenuButton class="inline-flex justify-center rounded-md text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <span class="inline-block h-7 w-7 overflow-hidden rounded-full bg-gray-100">
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
                <MenuItems class="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-600 border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div v-if="store.user.isLoggedIn">
                        <div>
                            <MenuItem v-slot="{ active }">
                                <router-link to="/profile">
                                    <a @click="$emit('profileNavigation')" :class="['group flex w-full items-center rounded-md text-sm', active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                        <Cog8ToothIcon :active="active" class="mr-2 h-5 w-5" aria-hidden="true" />
                                        {{$t('profile.profile')}}
                                    </a>
                                </router-link>
                            </MenuItem>
                        </div>
                        <div>
                            <MenuItem v-slot="{ active }">
                                <a :class="['group flex w-full items-center rounded-md text-sm', active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" @click="onLogout">
                                    <ArrowLeftOnRectangleIcon :active="active" class="mr-2 h-5 w-5" aria-hidden="true" />
                                    {{$t('profile.logout')}}
                                </a>
                            </MenuItem>
                        </div>
                    </div>
                    <div v-else>
                        <div>
                            <MenuItem v-slot="{ active }">
                                <router-link to="/login">
                                    <a @click="$emit('profileNavigation')" :class="['group flex w-full items-center rounded-md text-sm', active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                        {{$t('profile.login')}}
                                    </a>
                                </router-link>
                            </MenuItem>
                        </div>
                        <div>
                            <MenuItem v-slot="{ active }">
                                <router-link to="/register">
                                    <a @click="$emit('profileNavigation')" :class="['group flex w-full items-center rounded-md text-sm', active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                        {{$t('profile.register')}}
                                    </a>
                                </router-link>
                            </MenuItem>
                        </div>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>
  
