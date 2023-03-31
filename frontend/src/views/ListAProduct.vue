<script setup lang="ts">
import { IProduct } from '../interfaces/IProduct'
import { IImage } from '../interfaces/IImage';
import { ref } from 'vue'
import axios from '../axios'
import { notify } from 'notiwind'
import ImagesPreviewer from '../components/ImagesPreviewer.vue'
import i18n from '../localization';

const product = ref<IProduct>({} as IProduct)

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

function fillProductImages(){
    product.value.images = []
    if(uploadedImages.value){
        uploadedImages.value.forEach(async (fileItem: any) => {
             product.value.images.push(await createBase64Image(fileItem.file) as IImage)
        })
    }
}

const refreshForm = ref(0)
async function createProduct () {
    try {
        const response = await axios.post('/api/products', product.value)
        if(response) {
            notify({
                group: 'notifications',
                type: 'success',
                title: 'Success',
                text: i18n.global.t(response.data.message)
            }, 2000)
            product.value = {} as IProduct
            uploadedImages.value = []
            refreshForm.value = refreshForm.value == 0 ? 1: 0
        }
    } catch(error) {
        console.log(error)
    }
}

</script>

<template>
    <div class="mt-10 flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl mb-10">{{ $t('list_a_product.new_advertisement') }}</h1>
        <div class="bg-light-bg-1 dark:bg-dark-bg-1 rounded w-full max-w-xl flex items-center justify-center p-5">
            <div class="w-full max-w-lg space-y-8">
                <FormKit type="form" @submit="createProduct" :submit-label="$t('list_a_product.list_a_product')" :key="refreshForm" >
                    <FormKit 
                        :label="$t('list_a_product.name')"
                        type="text"
                        v-model="product.name"
                        validation="required"
                        validation-visibility="submit"
                    />
                    
                    <FormKit
                        :label="$t('list_a_product.price')"
                        type="number"
                        :help="$t('list_a_product.price_help')"
                        v-model="product.price"
                        validation="required"
                        validation-visibility="submit"
                    />

                    <FormKit 
                        :label="$t('list_a_product.description')"
                        type="textarea"
                        v-model="product.description"
                        validation="required"
                        validation-visibility="submit"
                    />

                    <FormKit 
                        :label="$t('list_a_product.add_image')"
                        type="file"
                        accept=".jpg"
                        multiple="true"
                        :help="$t('list_a_product.add_image_help')"
                        v-model="uploadedImages"
                        @input="fillProductImages"
                    />

                    <ImagesPreviewer :images="product.images" />
                </FormKit>
            </div>
        </div>
    </div>
</template>