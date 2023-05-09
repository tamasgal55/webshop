<script setup lang="ts">
import i18n from '../../localization'
import { ref,onMounted } from 'vue'
import { notify } from 'notiwind'
import PickList from 'primevue/picklist'
import axios from '../../axios'
import Button from 'primevue/button'
import { ICategory } from '../../interfaces/ICategory'

const globalCategories = ref()
const companyCategories = ref()
const categoryPickList = ref()
async function getGlobalCategories()
{
    try{
        const response = await axios.get('/api/category')
        if(response)
        {
            globalCategories.value = response.data.data
        }
    }
    catch (error) {
        console.log(error)
    }
}

async function getCompanyCategories()
{
    try{
        const response = await axios.get('/api/company/category')
        if(response)
        {
            companyCategories.value = response.data.data
        }
    }
    catch (error) {
        console.log(error)
    }
}

onMounted(async () => { 
    await getGlobalCategories()
    await getCompanyCategories()

    categoryPickList.value = [globalCategories.value.filter((item: ICategory) => companyCategories.value.every((item2: ICategory) => item2.id != item.id)), companyCategories.value]
})

async function saveCategories()
{
    try{
        const categories = categoryPickList.value[1].map((item: any) => item.id)
        const response = await axios.post('/api/company/category', {categories: categories})
        if(response) {
            notify({
                group: 'notifications',
                type: 'success',
                title: i18n.global.t('Success'),
                text: i18n.global.t('company_management_categories.categories_saved')
            }, 2000)
        }
    }
    catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div class="grid gap-8 grid-cols-1 mt-10">
        <div class="text-center text-6xl">
            <h1>{{ $t('admin_categories.title') }}</h1>
        </div>
        <PickList v-model="categoryPickList" listStyle="height:342px" dataKey="id">
            <template #sourceheader> {{ $t('company_management_categories.all_categories') }} </template>
            <template #targetheader> {{ $t('company_management_categories.selected_categories') }} </template>
            <template #item="slotProps">
                <span class="font-bold">{{ i18n.global.locale.value == 'hu' ? slotProps.item.name_hu : slotProps.item.name_en }}</span>
            </template>
        </PickList>
        <Button @click="saveCategories" :label="$t('company_management_categories.save_changes')" class="w-11/12 justify-self-center"/>
    </div>
</template>