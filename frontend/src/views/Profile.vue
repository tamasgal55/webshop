<script setup lang="ts">
import axios from '../axios'
import { useUserStore } from '../store'
import { onMounted, ref } from 'vue'
import { IUserProfile } from '../interfaces/IUserProfile'

const store = useUserStore()
const userProfile = ref<IUserProfile>({} as IUserProfile)


onMounted(() => {
  getUserProfile()
})

async function getUserProfile() {
  try {
      const response = await axios.get('/api/user/profile')
      if(response) {
          userProfile.value = {...response.data.data}
      }
  } catch(error) {
      console.log(error)
  }
}

async function updateProfile(){
  try{
    const response = await axios.put('/api/user/profile', {userProfile: userProfile.value})
    if(response){
      getUserProfile()
    }
  } catch(error) {
      console.log(error)
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
      <div class="mt-5 md:col-span-2 md:mt-0 border rounded border-light-border dark:border-dark-border bg-light-bg-1 dark:bg-dark-bg-1  shadow shadow-light-box-shadow dark:shadow-dark-box-shadow">
        <FormKit type="form" :actions="false" @submit="updateProfile">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.name')"
                    type="text"
                    v-model="userProfile.name"
                    validation-visibility="dirty"
                  />
                </div>
                
                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.email_address')"
                    type="text"
                    v-model="userProfile.email"
                    disabled
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('profile.phone')"
                    type="text"
                    v-model="userProfile.phone"
                    validation-visibility="dirty"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('address.country')"
                    type="text"
                    v-model="userProfile.country"
                    validation-visibility="dirty"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('address.postal_code')"
                    type="number"
                    v-model="userProfile.postal_code"
                    validation-visibility="dirty"
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('address.city')"
                    type="text"
                    v-model="userProfile.city"
                    validation-visibility="dirty"
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('address.address_line_one')"
                    type="text"
                    v-model="userProfile.address_line_one"
                    validation-visibility="dirty"
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <FormKit 
                    :label="$t('address.address_line_two')"
                    type="text"
                    v-model="userProfile.address_line_two"
                    validation-visibility="dirty"
                  />
                </div>
              </div>
            </div>
            <div class="bg-[#f4f5fb] dark:bg-[#191f48] px-4 text-right sm:px-6 flex flex-row-reverse">
              <FormKit
                type="submit"
                label="Save"
                outer-class="!mt-5"
              />
            </div>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>
  

<style scoped>
</style>
