<script setup lang="ts">
import { DefaultConfigOptions } from '@formkit/vue'
import { notify } from 'notiwind'
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore} from '../store'
import { FormKitNode } from '@formkit/core'

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

const emitter= inject('emitter') as any
const theme = ref<string>(localStorage.getItem('theme') as string)

emitter.on('changeTheme', (value: string) => {
  theme.value = value
})

const showPassword = (node: FormKitNode, e: Event) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
  <div class="flex min-h-full items-center justify-center ">
    <div class="w-full max-w-lg">
      <div class="mt-6">
        <img v-if="theme == 'dark'" class="mx-auto h-24 w-auto mb-4" src="../assets/webshop-logo-dark.png" alt="Webshop" />
        <img v-if="theme == 'light'" class="mx-auto h-24 w-auto mb-4" src="../assets/webshop-logo-light.png" alt="Webshop" />
      </div>
      <div class="mx-10 mt-10 mb-3 py-2 rounded bg-light-bg-1 dark:bg-dark-bg-1 shadow-xl shadow-light-box-shadow dark:shadow-dark-box-shadow">
        <div class="m-10">
          <div class="relative flex py-5 items-center">
              <div class="flex-grow border-t border-light-border dark:border-dark-border"></div>
              <span class="flex-shrink mx-4 text-4xl font-semibold text-light-text dark:text-dark-text">{{$t('register.register')}}</span>
              <div class="flex-grow border-t border-light-border dark:border-dark-border"></div>
          </div>
          <p class="text-center text-light-text-muted dark:text-dark-text-muted mb-10">{{ $t('register.register_comment') }}</p>
        <FormKit type="form" :actions="false" @submit="onRegister">
            <FormKit
                :name="$t('register.name')"
                v-model="form.name"
                prefix-icon='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>'
                validation="required"
                validation-visibility="dirty"
                placeholder="Your Name"
            />
            <FormKit
                name="E-mail"
                prefix-icon="email"
                v-model="form.email"
                placeholder="email@example.com"
                validation="required|email"
                validation-visibility="dirty"
            />
            <FormKit
                :name="$t('register.password')"
                type="password"
                v-model="form.password"
                :placeholder="$t('register.password')"
                autocomplete="off"
                validation="required"
                validation-visibility="dirty"
                prefix-icon="password"
                suffix-icon="eyeClosed"
                @suffix-icon-click="showPassword"
            />
            <FormKit
                type="password"
                v-model="form.password_confirmation"
                :name="$t('register.password_confirmation')"
                :placeholder="$t('register.password_confirmation')"
                autocomplete="off"
                validation="required|confirm"
                validation-visibility="dirty"
                prefix-icon="password"
                suffix-icon="eyeClosed"
                @suffix-icon-click="showPassword"
            />
            <FormKit
                type="submit"
                :label="$t('register.submit_registration')"
            />
        </FormKit>
        </div>
      </div>
      <div class="text-center lg:text-sm font-medium">
        <span class="text-light-text dark:text-dark-text">{{ $t('register.login_question') }}</span> <router-link to="/login" class="text-link"> {{ $t('register.login') }}</router-link>
      </div>
    </div>
  </div>
  </template>

<style scoped>

</style>
