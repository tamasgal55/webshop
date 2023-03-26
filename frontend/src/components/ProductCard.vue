<template>
  <div class="group relative">
    <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
      <img v-for="image in product.images" :src="image.image" alt="image.alt" class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-text font-medium">
          <a href="#">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ limitedString(product.name, 8) }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-light-text-muted dark:text-dark-text-muted">{{ limitedString(product.description, 30) }}</p>
      </div>
      <p class="text-sm font-medium text-light-text dark:text-dark-text text-right">{{ product.price }} Ft</p>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { IProduct } from '../interfaces/IProduct'
import Image from 'primevue/image'

interface Props {
  product: IProduct
}

defineProps<Props>()

function limitedString(text: string, length: number) {
  if(text.length > length){
    return text.substring(0, length) + "..."
  } else {
    return text
  }
}
</script>