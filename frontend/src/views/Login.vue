<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import {useUserStore} from '../store'
import { notify } from 'notiwind'
import { useI18n } from 'vue-i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import { Emitter } from 'mitt'

const t = useI18n()
const currentFormKitLanguage = ref('en')
const configFormKit: DefaultConfigOptions = inject(Symbol.for('FormKitConfig')) as DefaultConfigOptions

const router = useRouter()
const store = useUserStore()
const form = ref({
    email: '',
    password: ''
})


async function onLogin() {
    const response = await store.login(form.value)
    if(response)
    {
        router.push({
            name: 'Advertisements'
        })
        notify({
            group: 'notifications',
            type: 'success',
            title: 'Success',
            text: 'Logged in successfully'
        }, 2000)
        //changeLanguage(response.data.data.language)
        changeLanguage('hu')
    }
}

function changeLanguage(langCode: string) {
    t.locale.value = langCode
    currentFormKitLanguage.value = langCode
    configFormKit.locale = langCode
    localStorage.setItem('language', langCode)
}

const emitter= inject('emitter') as any
const theme = ref<string>(localStorage.getItem('theme') as string)

emitter.on('changeTheme', (value: string) => {
  theme.value = value
})

</script>

<template>
  <div class="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="mt-6">
        <img v-if="theme == 'dark'" class="mx-auto h-24 w-auto mb-4" src="../assets/webshop-logo-dark.png" alt="Webshop" />
        <img v-if="theme == 'light'" class="mx-auto h-24 w-auto mb-4" src="../assets/webshop-logo-light.png" alt="Webshop" />
      </div>
      <FormKit type="form" :actions="false" @submit="onLogin">
          <FormKit
              label="E-Mail"
              v-model="form.email"
              validation="required|email"
              validation-visibility="dirty"
          />
          <FormKit
              type="password"
              v-model="form.password"
              autocomplete="off"
              :label="$t('login.password')"
              validation="required"
              validation-visibility="dirty"
          />
          <FormKit
            type="submit"
            :label="$t('login.submit_login')"
          />
      </FormKit>
      <hr class="w-full h-px my-8 bg-red-original border-0 dark:bg-dark-hr">
      <div class="text-center text-light-text dark:text-dark-text lg:text-sm font-medium">
        <span>{{ $t('login.sign_up_question') }}</span> <router-link to="/register" class="text-red-original"> {{ $t('login.sign_up') }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
