<script setup lang="ts">
import axios from '../axios'
import { useUserStore } from '../store'
import { onMounted, ref } from 'vue'


const userProfile = ref({
    phone: '',
    private_phone: ''
})
const store = useUserStore()

onMounted(() => {

})

function updateProfile(){
    if(store.user.isLoggedIn)
    {
        axios.put('/user/profile', {userProfile: userProfile.value})
    }
}
</script>

<template>
  <div class="border-b border-light-border dark:border-dark-border p-2">
    <p class="text-2xl font-semibold ml-8">{{$t('profile.profile')}}</p>
  </div>
  <div class="!m-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-base font-semibold leading-6 text-light-text dark:text-dark-text">{{$t('profile.personal_information')}}</h3>
          <p class="mt-1 text-sm text-light-text-muted dark:text-dark-text-muted">{{$t('profile.personal_information_comment')}}</p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0 border border-light-border dark:border-dark-border">
        <FormKit type="form" :actions="false" @submit="updateProfile">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white dark:bg-dark-bg-2 px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.last_name')"
                    type="text"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.first_name')"
                    type="text"
                  />
                </div>
                
                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.email_address')"
                    type="text"
                    disabled
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.phone')"
                    type="text"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.address_country')"
                    type="text"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.address_postal_code')"
                    type="number"
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.address_city')"
                    type="text"
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.address_address_line')"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 px-4 py-3 text-right sm:px-6 flex flex-row-reverse">
              <div class="w-30">
                <FormKit
                  type="submit"
                  label="Save"
                />
              </div>
            </div>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>
  

<style scoped>
</style>
