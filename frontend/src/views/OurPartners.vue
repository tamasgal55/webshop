<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from '../axios'
import CompanyCard from '../components/CompanyCard.vue'

const companies = ref()

async function getCompanies() {
    try {
        const response = await axios.get('/api/company')
        if(response) {
            companies.value = response.data
        }
    } catch(error) {
        console.log(error)
    }
}

onMounted(() => {
    getCompanies()
})
</script>

<template>
    <div class="grid grid-cols-3 gap-8 justify-items-center mt-10">
        <div v-for="company in companies" class="w-3/4">
            <CompanyCard :company="company" />
        </div>
    </div>
</template>