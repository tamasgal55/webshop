import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import './style.css'
import { plugin } from '@formkit/vue'
import router from './router'
import { Router } from 'vue-router'
import FormKitConfig from './FormKitConfig'
import i18n from './localization'
import  Notifications  from 'notiwind'
import App from './App.vue'
import PrimeVue from 'primevue/config';

declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router
    }
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
pinia.use(({ store }) => { store.router = markRaw(router) })
createApp(App)
    .use(router)
    .use(pinia)
    .use(i18n)
    .use(plugin, FormKitConfig)
    .use(Notifications)
    .use(PrimeVue)
    .mount('#app')