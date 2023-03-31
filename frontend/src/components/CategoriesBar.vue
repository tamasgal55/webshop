<template>
    <header class="bg-light-bg-2 dark:bg-dark-bg-2">
      <nav class="mx-auto flex max-w-7xl items-center justify-center min-h-[60px] lg:px-8" aria-label="Global">
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup class="hidden lg:flex lg:w-full lg:min-h-[60px]">
          <div v-for="category in allCategories" :key="category.name_hu" class="flex items-center justify-center min-h-[60px] basis-1/6">
              <Button :label="category.name_hu" class="text-sm font-semibold leading-6 text-light-text dark:text-dark-text w-full h-full hover:bg-light-bg-1 dark:hover:bg-dark-bg-1" />
          </div>
        </PopoverGroup>
      </nav>
      <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-10" />
        <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a href="#" class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
                <a href="#" class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
                <a href="#" class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  PopoverGroup
} from '@headlessui/vue'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import axios from '../axios'
import { onMounted } from 'vue'
import { ICategory } from '../interfaces/ICategory'
import Button from 'primevue/button';
const allCategories = ref<Array<ICategory>>()

async function getCategories(){
    try {
        const response = await axios.get('/api/categories')
        allCategories.value = response.data.data
    } catch(error) {
        console.log(error)
    }
}

onMounted(() => {
  getCategories()
})
  
const mobileMenuOpen = ref(false)
</script>