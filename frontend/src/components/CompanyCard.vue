<script setup lang="ts">
import ICompany from '../interfaces/ICompany'

interface Props {
  company: ICompany
}

defineProps<Props>()


</script>

<template>
    <div class="flex w-full items-center rounded bg-light-bg-1 dark:bg-dark-bg-1 shadow-sm shadow-light-box-shadow dark:shadow-dark-box-shadow">
        <div class="block w-full max-w-[80px] h-20">
            <img :src="company.image" alt="image.alt" class="rounded h-full w-full object-cover object-center"/>
        </div>
        <span class="mx-5 font-semibold">{{ company.name }}</span>
    </div>
</template>