<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue';
import axios from '../axios'
import { onMounted, ref } from 'vue';
import CategoriesBar from '../components/CategoriesBar.vue';
import { IProduct } from '../interfaces/IProduct';

const products = ref<Array<IProduct>>()
async function getProducts(){
    try {
        const response = await axios.get('/api/products')
        products.value = response.data.data
    } catch(error) {
        console.log(error)
    }
}

onMounted(() => {
    getProducts()
})
</script>

<template>
    <CategoriesBar />
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">  
        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div v-for="product in products">
                <ProductCard
                    :product="product"
                />
            </div>
        </div>
    </div>
</template>