<script setup lang="ts">
import { IProduct } from '../interfaces/IProduct'
import { ref } from 'vue'

const product = ref<IProduct>({
    name: '',
    price: 0,
    description: '',
    created_at: new Date(),
    updated_at: new Date(),
    user_id: 0,
    images: []
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

function fillProductImages(){
    if(uploadedImages.value){
        uploadedImages.value.forEach(async (fileItem: any) => {
             product.value.images.push(await createBase64Image(fileItem.file) as string)
        })
    }
}

async function createProduct () {

}

</script>

<template>
    <div class="mt-10 flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <FormKit type="form" @submit="createProduct" :submit-label="$t('list_a_product.list_a_product')">
                <FormKit 
                    :label="$t('list_a_product.name')"
                    type="text"
                    v-model="product.name"
                />
                
                <FormKit
                    :label="$t('list_a_product.price')"
                    type="number"
                    v-model="product.price"
                />

                <FormKit 
                    :label="$t('list_a_product.description')"
                    type="textarea"
                    v-model="product.description"
                />

                <FormKit 
                    :label="$t('list_a_product.add_image')"
                    type="file"
                    accept=".png,.jpg"
                    multiple="true"
                    v-model="uploadedImages"
                    @input="fillProductImages"
                />
            </FormKit>
        </div>
    </div>
</template>