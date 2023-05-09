<script setup lang="ts">
import i18n from '../localization'
import { computed, onUpdated, ref } from 'vue'
import { getNode } from '@formkit/core'
import axios from '../axios'
import ICompany from '../interfaces/ICompany'
import { notify } from 'notiwind'
import { useUserStore } from '../store'

const store = useUserStore()
const first_step_name = computed(() => i18n.global.t('create_company.basics'))
const second_step_name = computed(() => i18n.global.t('create_company.contact'))
const third_step_name = computed(() => i18n.global.t('create_company.headquarters'))

const company = ref<ICompany>({} as ICompany)

async function createCompany() {
    try {
        const response = await axios.post('/api/company', company.value)
        if(response) {
            notify({
                group: 'notifications',
                type: 'success',
                title: 'Success',
                text: response.data.message
            }, 2000)
            company.value = {} as ICompany
            uploadedImages.value = []
            store.getUserData()
        }
    } catch (error) {
        console.log(error)
    }
}

function changeFormKitStepNames() {
    const first_step_node = getNode('first_step')
    first_step_node!.props.stepName = first_step_name.value

    const second_step_node = getNode('second_step')
    second_step_node!.props.stepName = second_step_name.value

    const third_step_node = getNode('third_step')
    third_step_node!.props.stepName = third_step_name.value
    }

onUpdated(() => {
    changeFormKitStepNames()
})

const uploadedImages = ref<Array<File>>()
function createBase64Image(image: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const result = reader.result
      return resolve(result);
    };
  
    reader.onerror = function (error) {
      return reject(error);
    };

    reader.readAsDataURL(image)
  })
}

function fillCompanyImage(){
    if(uploadedImages.value){
        uploadedImages.value.forEach(async (fileItem: any) => {
             company.value.image = await createBase64Image(fileItem.file) as string
        })
    }
}
</script>

<template>
<div class="mt-16 flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
    <p class="text-6xl">{{ $t('create_company.title') }}</p>
    <div class="mt-10  rounded w-full max-w-xl flex items-center justify-center p-5">
        <div class="w-full bg-light-bg-1 dark:bg-dark-bg-1 rounded-lg max-w-lg space-y-8">
            <FormKit type="form" @submit="createCompany" :actions="false">
                <FormKit type="multi-step" tab-style="tab" :allow-incomplete="false">
                    <FormKit type="step" id="first_step" :label="first_step_name" :name="first_step_name">
                        <FormKit
                            type="text"
                            :label="$t('create_company.company_name')"
                            v-model="company.name"
                            validation="required"
                        />
                        <FormKit 
                            :label="$t('create_company.logo')"
                            type="file"
                            accept=".jpg"
                            multiple="false"
                            v-model="uploadedImages"
                            validation="required"
                            @input="fillCompanyImage"
                        />
                    </FormKit>
                    <FormKit type="step" id="second_step" :label="second_step_name" :name="second_step_name">
                        <FormKit
                            type="email"
                            :label="$t('create_company.contact_email')"
                            v-model="company.contact_email"
                            validation="required|email"
                        />
                        <FormKit
                            type="text"
                            :label="$t('create_company.contact_phone')"
                            v-model="company.contact_phone"
                            validation="required"
                        />
                    </FormKit>
                    <FormKit type="step" id="third_step" :name="third_step_name" :label="third_step_name">
                        <FormKit 
                            :label="$t('address.country')"
                            type="text"
                            v-model="company.headquarters_country"
                            validation-visibility="dirty"
                        />
                        <FormKit 
                            :label="$t('address.postal_code')"
                            type="number"
                            v-model="company.headquarters_postal_code"
                            validation-visibility="dirty"
                        />
                        <FormKit 
                            :label="$t('address.city')"
                            type="text"
                            v-model="company.headquarters_city"
                            validation-visibility="dirty"
                        />
                        <FormKit 
                            :label="$t('address.address_line_one')"
                            type="text"
                            v-model="company.headquarters_address_line_one"
                            validation-visibility="dirty"
                        />
                        <FormKit 
                            :label="$t('address.address_line_two')"
                            type="text"
                            v-model="company.headquarters_address_line_two"
                            validation-visibility="dirty"
                        />
                        <template #stepNext>
                            <FormKit type="submit" :label="$t('create_company.submit_label')"/>
                        </template>
                    </FormKit>
                </FormKit>
            </FormKit>
        </div>
    </div>
</div>
</template>