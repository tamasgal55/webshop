<script setup lang="ts">
import { DefaultConfigOptions } from '@formkit/vue'
import { inject, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Toast from './components/Toast.vue'
import axios from './axios'
import {useUserStore} from './store'


const store = useUserStore()
const t = useI18n()
const currentFormKitLanguage = ref('en')
const configFormKit: DefaultConfigOptions = inject(Symbol.for('FormKitConfig')) as DefaultConfigOptions

onMounted(async () => {
    // set language from localstorage
    if(localStorage.getItem('language'))
    {
        const langCode = localStorage.getItem('language') as string
        changeLanguage(langCode)
    }

    const response = await axios.get('/api/refresh')
    const userWasLoggedIn = store.user.isLoggedIn

    // user was logged in before, but not anymore (session expired)
    if(userWasLoggedIn && !response.data.data)
    {
        // use user preferred language to show correct error message
        changeLanguage(store.user.language)
        store.logout()
    }
})


async function changeLanguage(langCode: string) {
    t.locale.value = langCode
    currentFormKitLanguage.value = langCode
    configFormKit.locale = langCode
    localStorage.setItem('language', langCode)
}

</script>
<template>
    <Toast/>
    <div id="page" class="text-light-text dark:text-dark-text bg-light-bg-2 dark:bg-dark-bg-2 min-h-screen pb-5">
        <router-view/>
    </div>
</template>

<style scoped>

</style>
