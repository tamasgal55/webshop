<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import Menubar from 'primevue/menubar'
import { ICategory } from '../../interfaces/ICategory'
import 'primevue/resources/themes/tailwind-light/theme.css'
import CustomTable from "../../components/CustomTable.vue"
import { useI18n } from 'vue-i18n'
import axios from '../../axios'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import { notify } from 'notiwind'
import PickList from 'primevue/picklist'
import { IAttribute } from "../../interfaces/IAttribute"

const i18n = useI18n()

const columnNames = computed(() =>  [
    { key: 'id', header: 'ID', not_sortable: false },
    { key: 'name_hu', header: i18n.t('admin_categories.name_hu'), not_sortable: false },
    { key: 'name_en', header: i18n.t('admin_categories.name_en'), not_sortable: false },
    { key: 'parent_category_merged', header: i18n.t('admin_categories.parent_category'), not_sortable: false }
])

const expandableColumnNames = computed(() => [
    { key: 'id', header: 'ID', not_sortable: false },
    { key: i18n.locale.value == 'hu' ? 'name_hu' : 'name_en', header: 'Név', not_sortable: false },
    { key: 'type', header: 'Típus', not_sortable: false },
    { key: 'unit', header: 'Mértékegység', not_sortable: false }
])

const categories = ref()
const category = ref({} as ICategory)
async function getCategories()
{
    try{
        const response = await axios.get('/api/category')
        if(response)
        {
            parentAttributesOfCategory.value = []
            categories.value = response.data.data
            categories.value.forEach((category: ICategory) => {
                category.attributes.forEach((attribute: IAttribute) => {
                    attribute.inherited = false
                })

                if(category.parent_category){
                    category['parent_category_merged'] = category.parent_category.name_hu + '/' + category.parent_category.name_en
                        parentAttributesOfCategory.value = []
                        getAllParentAttributes(category.parent_category)
                        parentAttributesOfCategory.value.forEach((attribute: IAttribute) => {
                            attribute.inherited = true 
                            if(category.attributes?.indexOf(attribute) == -1){
                                category.attributes.push(attribute)
                            }
                        })
                }
            });
        }
    }
    catch (error) {
        console.log(error)
    }
}

const categoryTree = ref()
const categoryBarItemsHu = ref()
const categoryBarItemsEn = ref()

async function getCategoryTree()
{
    try{
        const response = await axios.get('/api/category/tree')
        if(response)
        {
            categoryTree.value = response.data.data
            categoryBarItemsHu.value = transformCategories(categoryTree.value, 'hu')
            categoryBarItemsEn.value = transformCategories(categoryTree.value, 'en')
        }
    }
    catch (error) {
        console.log(error)
    }
}

const attributes = ref()
async function getAttributes(){
    try{
        const response = await axios.get('/api/attribute')
        if(response)
        {
            attributes.value = response.data.data
        }
    }
    catch (error) {
        console.log(error)
    }
}

function transformCategories(categories: any[], lang: string): ICategory[] {
  return categories.map(category => {
    const transformedCategory: ICategory = {
      id: category.id,
      label: lang == 'hu' ? category.name_hu : category.name_en,
    };

    if (category.child_categories && category.child_categories.length > 0) {
      transformedCategory.items = transformCategories(category.child_categories, lang);
    }

    return transformedCategory;
  });
}

onMounted(() => {
    getCategories()
    getCategoryTree()
    getAttributes()
})

const showCategoryDialog = ref(false)
const categoryDialogHeader = ref()

function newCategory() {
    parentAttributesOfCategory.value = []
    category.value = {} as ICategory
    category.value.attributes = [attributes.value, []]
    categoryDialogHeader.value = i18n.t('admin_categories.new_category_dialog_header')
    showCategoryDialog.value=true
}

function editCategory(categoryObject: ICategory) {
    category.value = {...categoryObject}

    parentAttributesOfCategory.value = []
    if(category.value.parent_category){
        getAllParentAttributes(category.value.parent_category)
    }

    childAttributesOfCategory.value = []
    if(category.value.child_categories?.length){
        category.value.child_categories.forEach((item: ICategory) => {
            getAllChildAttributes(item)
        })
    }

    const temp = [...category.value.attributes, ...parentAttributesOfCategory.value, ...childAttributesOfCategory.value]
    category.value.attributes = [attributes.value.filter((item: IAttribute) => temp.every((item2: IAttribute) => item2.id != item.id)), category.value.attributes.filter((item: IAttribute) => item.inherited == false)]
    
    categoryDialogHeader.value = i18n.t('admin_categories.edit_category_dialog_header')
    showCategoryDialog.value=true

}

function containsCategory(categoryObject: ICategory, categoryId: number) {
  if (categoryObject.id === categoryId) {
    return true;
  }
  
  if (categoryObject.child_categories) {
    for (let i = 0; i < categoryObject.child_categories.length; i++) {
      if (containsCategory(categoryObject.child_categories[i], categoryId)) {
        return true;
      }
    }
  }
  
  return false;
}

const parentAttributesOfCategory = ref<Array<IAttribute>>([])
const childAttributesOfCategory = ref<Array<IAttribute>>([])
function getAllParentAttributes(categoryObject: ICategory) {

    if (categoryObject.attributes) {
        categoryObject.attributes.forEach((attr: IAttribute) => {
            attr.inherited = true
            parentAttributesOfCategory.value.push(attr) 
        });
    }
    if (categoryObject.parent_category) {
        getAllParentAttributes(categoryObject.parent_category);
    }
}

function getAllChildAttributes(categoryObject: ICategory){
    if (categoryObject.attributes) {
        categoryObject.attributes.forEach((attr: IAttribute) => {
            childAttributesOfCategory.value.push(attr)
        });
    }

    if(categoryObject.child_categories?.length) {
        categoryObject.child_categories?.forEach((child: ICategory) => {
            getAllChildAttributes(child)
        });
    }
    
}

async function deleteCategory(categoryObject: ICategory){
    try{
        const response = await axios.delete(`/api/category/${categoryObject.id}`)
        if(response)
        {
            notify({
                group: 'notifications',
                type: 'success',
                title: i18n.t('Success'),
                text: i18n.t('admin_categories.category_deleted')
            }, 2000)
        }
        showCategoryDialog.value = false
        category.value = {} as ICategory
        getCategories()
        getCategoryTree()
    }
    catch (error) {
        console.log(error)
    }
}

const formkitSelectParentCategories = computed(() => {
    return categories.value.filter((item: ICategory) => !containsCategory(category.value, item.id!)).map(({ name_en, name_hu, id }: any) => ({name: name_hu + '/' + name_en , code: id}))
})

async function saveCategory(){
    try{
        showCategoryDialog.value = false
        category.value.attributes = category.value.attributes[1]
        category.value.attributes = category.value.attributes.map((item: any) => item.id)
        
        if(category.value.id)
        {
            const response = await axios.patch(`/api/category/${category.value.id}`, category.value)
            if(response) {
                notify({
                    group: 'notifications',
                    type: 'success',
                    title: i18n.t('Success'),
                    text: i18n.t('admin_categories.category_updated')
                }, 2000)
            }
        } 
        else {
            const response = await axios.post('/api/category', category.value)
            if(response) {
                notify({
                    group: 'notifications',
                    type: 'success',
                    title: i18n.t('Success'),
                    text: i18n.t('admin_categories.category_created')
                }, 2000)
            }
        }

        category.value = {} as ICategory
        getCategories()
        getAttributes()
        getCategoryTree()
    }
    catch (error) {
        console.log(error)
    }
}

function parentCategoryChanged() {
    category.value.parent_category = categories.value.find((item: ICategory) => item.id == category.value.parent_category_id)
    parentAttributesOfCategory.value = []
    if(category.value.parent_category){
        getAllParentAttributes(category.value.parent_category)
    }

    childAttributesOfCategory.value = []
    if(category.value.child_categories?.length){
        category.value.child_categories.forEach((item: ICategory) => {
            getAllChildAttributes(item)
        })
    }

    const temp = [...category.value.attributes, ...parentAttributesOfCategory.value, ...childAttributesOfCategory.value]
    category.value.attributes = [attributes.value.filter((item: IAttribute) => temp.every((item2: IAttribute) => item2.id != item.id)), category.value.attributes.filter((item: IAttribute) => item.inherited == false)]
    console.log(category.value)
    
}

</script>

<template>
    <div class="grid gap-8 grid-cols-1 mt-10">
        <div class="text-center text-6xl">
            <h1>{{ $t('admin_categories.title') }}</h1>
        </div>
        <div class="card relative z-2">
            <p class="text-lg">{{ $t('admin_categories.navigation_preview') }}</p>
            <Menubar :model="i18n.locale.value == 'hu' ? categoryBarItemsHu : categoryBarItemsEn" />
        </div>
        <div>
            <CustomTable 
                :column-names="columnNames"
                :expandable-column-names="expandableColumnNames"
                expandable-attribute-name="attributes"
                :data="categories"
                :selectable="false"
                row-group-mode="subheader"
                group-rows-by="inherited"
                @edit-record="editCategory"
                @new-record="newCategory"
                @delete-record="deleteCategory"
            />
        </div>
        <Dialog v-model:visible="showCategoryDialog" modal :header="categoryDialogHeader" :style="{ width: '75%' }">
            <FormKit type="form" @submit="saveCategory" :submit-label="$t('admin_categories.category_dialog_submit')">
                    <FormKit 
                        :label="$t('admin_categories.name_hu')"
                        v-model="category.name_hu"
                        type="text"
                        validation="required"
                        validation-visibility="dirty"
                    />
                    <FormKit 
                        :label="$t('admin_categories.name_en')"
                        v-model="category.name_en"
                        type="text"
                        validation="required"
                        validation-visibility="dirty"
                    />
                    <label class="formkit-label mt-1 text-light-text dark:text-dark-text">{{ $t('admin_categories.parent_category') }}</label>
                    <Dropdown v-model="category.parent_category_id" @change="parentCategoryChanged" :options="formkitSelectParentCategories" showClear optionLabel="name" optionValue="code" class="w-full md:w-14rem mb-4 !text-light-text !dark:text-dark-text" />
                    <label class="formkit-label mt-1 text-light-text dark:text-dark-text">{{ $t('admin_categories.attributes')}}</label>
                    <p class="bg-yellow-300 text-lg my-1 rounded">{{ $t('admin_categories.warning') }}</p>
                    <div class="card mb-5 border py-5 rounded border-light-border dark:border-dark-border">
                        <PickList v-model="category.attributes" listStyle="height:342px" dataKey="id">
                            <template #sourceheader> {{ $t('admin_categories.all_attributes') }} </template>
                            <template #targetheader> {{ $t('admin_categories.selected_attributes') }} </template>
                            <template #item="slotProps">
                                <span class="font-bold">{{ slotProps.item.name_hu + '/' + slotProps.item.name_en }}</span>
                            </template>
                        </PickList>
                    </div>
                </FormKit>
        </Dialog>
    </div>
</template>