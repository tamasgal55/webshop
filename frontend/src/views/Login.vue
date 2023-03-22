<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import {useUserStore} from '../store'
import { notify } from 'notiwind'
import { useI18n } from 'vue-i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import { FormKitNode } from '@formkit/core'

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
              <span class="flex-shrink mx-4 text-4xl font-semibold text-light-text dark:text-dark-text">{{$t('login.login')}}</span>
              <div class="flex-grow border-t border-light-border dark:border-dark-border"></div>
          </div>
          <p class="text-center text-light-text-muted dark:text-dark-text-muted mb-10">{{ $t('login.login_comment') }}</p>
          <FormKit type="form" :actions="false" @submit="onLogin">
              <FormKit
                  name="E-mail"
                  prefix-icon="email"
                  v-model="form.email"
                  placeholder="email@example.com"
                  validation="required|email"
                  validation-visibility="dirty"
              />
              <FormKit
                  :name="$t('login.password')"
                  type="password"
                  v-model="form.password"
                  :placeholder="$t('login.password')"
                  autocomplete="off"
                  validation="required"
                  validation-visibility="dirty"
                  prefix-icon="password"
                  suffix-icon="eyeClosed"
                  @suffix-icon-click="showPassword"
              />
              <FormKit
                type="submit"
                :label="$t('login.submit_login')"
              />
          </FormKit>
          <p class="text-link">{{ $t('login.forgot_password') }}</p>
        </div>
      </div>
      <div class="text-center lg:text-sm font-medium">
        <span class="text-light-text dark:text-dark-text">{{ $t('login.register_question') }}</span> <router-link to="/register" class="text-link"> {{ $t('login.register') }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
