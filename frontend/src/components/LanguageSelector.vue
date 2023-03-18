<script setup lang="ts">
import { DefaultConfigOptions } from '@formkit/vue'
import CountryFlag from 'vue-country-flag-next'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import axios from '../axios'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../store'
import { computed, WritableComputedRef, ref, inject } from 'vue'

const t = useI18n()
const currentFormKitLanguage = ref('en')
const configFormKit: DefaultConfigOptions = inject(Symbol.for('FormKitConfig')) as DefaultConfigOptions
const store = useUserStore()

function changeLanguage(langCode: string) {
    t.locale.value = langCode
    currentFormKitLanguage.value = langCode
    configFormKit.locale = langCode
    if(store.user.isLoggedIn)
    {
        store.user.language = langCode
        axios.put('/api/user/language', {langCode: langCode})
    }
    localStorage.setItem('language', langCode)
}

const countryFlagCode: WritableComputedRef<string> = computed({
    get(): string {
        return t.locale.value == 'en' ? 'gb' : t.locale.value
    },
    set(newValue: string): void {
        countryFlagCode.value = newValue
    },
})

</script>
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-gray-700">
        <country-flag :country='countryFlagCode' size='normal'/>
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 w-15 origin-top-right rounded-md bg-light-bg-2 dark:bg-dark-bg-2 border dark:border-slate-600 ">
        <div v-for="lang in ['hu', 'en'].filter(l => l!= $i18n.locale)" :key="lang">
            <MenuItem>
              <a class="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" @click="changeLanguage(lang == 'gb' ? 'en' : lang)"><country-flag :country="lang == 'en' ? 'gb' : lang" size='normal'/></a>
            </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
