<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Toast from './components/Toast.vue'
import axios from './axios'
import {useUserStore} from './store'
import changeLanguageEmitter from './emitters/changeLanguageEmitter'
import languageSelectedMountedEmitter from './emitters/languageSelectorMountedEmitter'

const store = useUserStore()
const t = useI18n()
const langCode = ref<string>('hu')

const onMountedEventAlreadyTriggered = ref(false)

onMounted(async () => {
    // set language from localstorage
    if(localStorage.getItem('language'))
    {
        langCode.value = localStorage.getItem('language') as string
    } else {
        langCode.value = 'hu'
    }

    const response = await axios.get('/api/refresh')
    const userWasLoggedIn = store.userIsLoggedIn

    // user was logged in before, but not anymore (session expired)
    if(userWasLoggedIn && !response.data.data)
    {
        // use user preferred language to show correct error message
        langCode.value = store.user.language_id == 1 ? 'hu' : 'en'
        store.logout()
    }
})

languageSelectedMountedEmitter.on('languageSelectorMounted', (value: boolean) => {
    if(!onMountedEventAlreadyTriggered.value) {
        changeLanguageEmitter.emit('changeLanguage', langCode.value)
        onMountedEventAlreadyTriggered.value = true
    }
})

</script>
<template>
    <Toast/>
    <div id="page" class="text-light-text dark:text-dark-text bg-light-bg-2 dark:bg-dark-bg-2 min-h-screen pb-5">
        <router-view/>
    </div>
</template>

<style scoped>

</style>
