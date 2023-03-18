<script setup lang="ts">
import { DefaultConfigOptions } from '@formkit/vue'
import { notify } from 'notiwind'
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore} from '../store'

const t = useI18n()
const currentFormKitLanguage = ref('en')
const configFormKit: DefaultConfigOptions = inject(Symbol.for('FormKitConfig')) as DefaultConfigOptions

const router = useRouter()
const store = useUserStore()
const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    language : t.locale.value
})

async function onRegister() {
    const response = await store.register(form.value)
    if(response)
    {
        router.push({
            name: 'Advertisements'
        })
        notify({
            group: 'notifications',
            type: 'success',
            title: 'Success',
            text: 'Registered successfully'
        }, 2000)
        //changeLanguage(response.data.data.language)
    }
}

function changeLanguage(langCode: string) {
    t.locale.value = langCode
    currentFormKitLanguage.value = langCode
    configFormKit.locale = langCode
    localStorage.setItem('language', langCode)
}

</script>

<template>
    <div class="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <FormKit type="form" :actions="false" @submit="onRegister">
            <FormKit
                v-model="form.name"
                :label="$t('register.name')"
                validation="required"
                validation-visibility="dirty"
            />
            <FormKit
                v-model="form.email"
                label="Email"
                validation="required|email"
                validation-visibility="dirty"
            />
            <FormKit
                type="password"
                v-model="form.password"
                name="password"
                autocomplete="off"
                :label="$t('register.password')"
                validation="required"
                validation-visibility="dirty"
            />
            <FormKit
                type="password"
                v-model="form.password_confirmation"
                name="password_confirm"
                autocomplete="off"
                :label="$t('register.password_confirmation')"
                validation="required|confirm"
                validation-visibility="dirty"
            />
            <FormKit
                type="submit"
                :label="$t('register.submit_registration')"
            />
        </FormKit>
        <hr class="w-full h-px my-8 bg-red-original border-0 dark:bg-dark-hr">
        <div class="text-center text-light-text dark:text-dark-text lg:text-sm font-medium">
            <span class="text-light-text dark:text-dark-text">{{ $t('register.sign_in_question') }}</span> <router-link to="/login" class="text-red-original">{{ $t('register.sign_in') }}</router-link>
        </div>
      </div>
    </div>
  </template>

<style scoped>

</style>
