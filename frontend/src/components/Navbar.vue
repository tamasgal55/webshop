<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon} from '@heroicons/vue/24/outline'
import ThemeButton from './ThemeButton.vue'
import LanguageSelector from './LanguageSelector.vue'
import ProfileButton from './ProfileButton.vue'
import { useUserStore } from '../store'
import { useI18n } from 'vue-i18n'
import changeThemeEmitter from '../emitters/changeThemeEmitter'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const t = useI18n().t

const isCompanyManagementPanel = ref(false)
const isAdminPanel = ref(false)

const navigation = [
    { name: 'advertisements', href: '/advertisements', current: true },
    { name: 'our_partners', href: '/our_partners', current: false },
]

const adminNavigation = [
    { name: 'categories', href: '/admin/categories', current: true },
    { name: 'attributes', href: '/admin/attributes', current: false }
]

const companyManagementNavigation = [
    { name: 'start', href: '/management/start', current: false },
    { name: 'categories', href: '/management/categories', current: false },
    { name: 'products', href: '/management/products', current: false }
]

const store = useUserStore()
const userLoggedIn = store.userIsLoggedIn

if(window.location.href.includes('/'))
{
    changeTab('/'+window.location.href.split('/').pop() as string)
}

if(window.location.href.includes('management'))
{
  isCompanyManagementPanel.value = true
}
else if(window.location.href.includes('admin'))
{
  isAdminPanel.value = true
}

changeTab(window.location.pathname)


function changeTab(href: string)
{
    navigation.find(element => element.current = false)
    adminNavigation.find(element => element.current = false)
    companyManagementNavigation.find(element => element.current = false)
    const navigatedTab = ref()
    if(navigation.find(element => element.href == href)) 
    {
      navigatedTab.value = navigation.find(element => element.href == href)
      isAdminPanel.value = false
      isCompanyManagementPanel.value = false
    }
    else if(adminNavigation.find(element => element.href == href)) 
    {
      navigatedTab.value = adminNavigation.find(element => element.href == href)
      isAdminPanel.value = true
      isCompanyManagementPanel.value = false
    }
    else if(companyManagementNavigation.find(element => element.href == href)) 
    {
      navigatedTab.value = companyManagementNavigation.find(element => element.href == href)
      isAdminPanel.value = false
      isCompanyManagementPanel.value = true
    }

    if(navigatedTab.value) navigatedTab.value.current = true
    router.push(href)
}


const theme = ref<string>(localStorage.getItem('theme') as string)

changeThemeEmitter.on('changeTheme', (value: string) => {
  theme.value = value
})

</script>

<template>
  <Disclosure as="nav" class="bg-light-bg-1 dark:bg-dark-bg-1 shadow shadow-light-box-shadow dark:shadow-dark-box-shadow" v-slot="{ open }">
    <div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton v-if="userLoggedIn" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-button dark:hover:bg-gray-600 hover:text-white focus:outline-none">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <!--<div class="flex flex-1 justify-start sm:items-stretch sm:justify-start">-->
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <router-link to="/advertisements" @click="changeTab('/advertisements')">
              <img v-if="theme == 'dark'" class="block h-8 w-auto lg:hidden" src="../assets/webshop-logo-dark.png" alt="Webshop" />
              <img v-if="theme == 'light'" class="block h-8 w-auto lg:hidden" src="../assets/webshop-logo-light.png" alt="Webshop" />
              <img v-if="theme == 'dark'" class="hidden h-8 w-auto lg:block" src="../assets/webshop-logo-dark.png" alt="Webshop" />
              <img v-if="theme == 'light'" class="hidden h-8 w-auto lg:block" src="../assets/webshop-logo-light.png" alt="Webshop" />
            </router-link>
          </div>
          
          <div class="hidden sm:ml-6 sm:block pt-0.5">
            <div class="flex space-x-4 space-y-0">
              <template v-if="isAdminPanel">
                <template v-for="item in adminNavigation" :key="item.name">
                  <router-link :to="item.href">
                      <a @click="changeTab(item.href)" :class="[item.current ? 'bg-button-hover dark:bg-gray-600 dark:text-dark-text text-white' : 'text-light-text dark:text-dark-text  hover:bg-button dark:hover:bg-gray-500 hover:text-white dark:hover:text-gray-100', 'px-3 py-2 rounded-md text-sm font-medium']">
                        {{ $t(`navbar.${item.name}`) }}
                      </a>
                  </router-link>
                </template>
              </template>
              <template v-else-if="isCompanyManagementPanel">
                <template v-for="item in companyManagementNavigation" :key="item.name">
                  <router-link :to="item.href">
                      <a @click="changeTab(item.href)" :class="[item.current ? 'bg-button-hover dark:bg-gray-600 dark:text-dark-text text-white' : 'text-light-text dark:text-dark-text  hover:bg-button dark:hover:bg-gray-500 hover:text-white dark:hover:text-gray-100', 'px-3 py-2 rounded-md text-sm font-medium']">
                        {{ $t(`navbar.${item.name}`) }}
                      </a>
                  </router-link>
                </template>
              </template>
              <template v-else>
                <template v-for="item in navigation" :key="item.name">
                  <router-link :to="item.href">
                      <a @click="changeTab(item.href)" :class="[item.current ? 'bg-button-hover dark:bg-gray-600 dark:text-dark-text text-white' : 'text-light-text dark:text-dark-text  hover:bg-button dark:hover:bg-gray-500 hover:text-white dark:hover:text-gray-100', 'px-3 py-2 rounded-md text-sm font-medium']">
                        {{ $t(`navbar.${item.name}`) }}
                      </a>
                  </router-link>
                </template>
              </template>
            </div>
          </div>
        </div>
        <div class="flex space-x-4">
          <ThemeButton/>
          <LanguageSelector/>
          <ProfileButton class="mt-3.5" @profileNavigation="changeTab"/>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
          <router-link v-for="item in navigation" :key="item.href" :to="item.href">
              <DisclosureButton @click="changeTab(item.href)" as="a" :href="item.href" :class="[item.current ? 'bg-button-hover dark:bg-gray-600 text-white' : 'text-gray-500 dark:text-white hover:bg-button dark:hover:bg-gray-500 hover:text-white dark:hover:text-gray-100', 'block px-3 py-2 rounded-md text-base font-medium']">{{ $t(`navbar.${item.name}`) }}</DisclosureButton>
          </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>