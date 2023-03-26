<script setup lang="ts">
import { IImage } from '../interfaces/IImage'
import Image from 'primevue/image'
import Paginator from 'primevue/paginator'
import { ref } from 'vue'
import 'primeicons/primeicons.css';

export interface Props {
  images?: IImage[]
}

const props = withDefaults(defineProps<Props>(), {
  images: () => []
})


const first = ref(0)
</script>

<template>
    <div v-if="images.length" class="card flex flex-col items-center first-letter">
        <Paginator v-model:first="first" :rows="1" :totalRecords="images.length" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate="{first}"/>

        <div class="pt-3 text-center justify-self-center">
            <Image :src="images[first]" alt="Image" class="shadow-2 border-round w-full sm:w-30rem"/>
        </div>
    </div>
</template>
