<script setup lang="ts">
import CustomTable from "../../components/CustomTable.vue"
import { useI18n } from 'vue-i18n'
import axios from '../../axios'
import Dialog from 'primevue/dialog'
import { ref, computed, onMounted } from "vue"
import { IAttribute } from '../../interfaces/IAttribute'
import { notify } from 'notiwind'
import Button from 'primevue/button'

const i18n = useI18n()

const columnNames = computed(() =>  [
    { key: 'id', header: 'ID', not_sortable: false },
    { key: 'name_hu', header: i18n.t('admin_attributes.name_hu'), not_sortable: false },
    { key: 'name_en', header: i18n.t('admin_attributes.name_en'), not_sortable: false },
    { key: 'type', header: i18n.t('admin_attributes.type'), not_sortable: false },
    { key: 'unit', header: i18n.t('admin_attributes.unit'), not_sortable: false }
])

const attributes = ref()

async function getAttributes() {
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

onMounted(() => {
    getAttributes()
})

const showAttributeDialog = ref(false)
const attribute = ref({} as IAttribute)
const attributeDialogHeader = ref()
function newAttribute(){
    attribute.value = {} as IAttribute
    attributeDialogHeader.value = i18n.t('admin_attributes.new_attribute_dialog_header')
    showAttributeDialog.value=true
}

function editAttribute(attributeObject: IAttribute)
{
    attribute.value = {...attributeObject}
    attributeDialogHeader.value = i18n.t('admin_attributes.edit_attribute_dialog_header')
    showAttributeDialog.value=true
}


async function saveAttribute() {
    try{
        if(attribute.value.id)
        {
            const response = await axios.patch(`/api/attribute/${attribute.value.id}`, attribute.value)
            if(response) {
                notify({
                    group: 'notifications',
                    type: 'success',
                    title: i18n.t('Success'),
                    text: i18n.t('admin_attributes.attribute_updated')
                }, 2000)
            }
        } 
        else {
            const response = await axios.post('/api/attribute', attribute.value)
            if(response) {
                notify({
                    group: 'notifications',
                    type: 'success',
                    title: i18n.t('Success'),
                    text: i18n.t('admin_attributes.attribute_created')
                }, 2000)
            }
        }

        showAttributeDialog.value = false
        attribute.value = {} as IAttribute
        getAttributes()
    }
    catch (error) {
        console.log(error)
    }
}

async function deleteAttribute(){
    try{
        const response = await axios.delete(`/api/attribute/${attribute.value.id}`)
        if(response)
        {
            notify({
                group: 'notifications',
                type: 'success',
                title: i18n.t('Success'),
                text: i18n.t('admin_attributes.attribute_deleted')
            }, 2000)
        }
        showDeleteAttributeDialog.value = false
        attribute.value = {} as IAttribute
        getAttributes()
    }
    catch (error) {
        console.log(error)
    }
}

const showDeleteAttributeDialog = ref(false)
function deleteAttributeConfirm(attributeObject: IAttribute)
{
    attribute.value = {...attributeObject}
    showDeleteAttributeDialog.value = true
}
</script>

<template>
    <div>
        <CustomTable 
            :column-names="columnNames"
            :data="attributes"
            :selectable="false"
            :expandable="false"
            :deletable="false"
            :deletableEmit="true"
            @delete-record-emit="deleteAttributeConfirm"
            @edit-record="editAttribute"
            @new-record="newAttribute"
        />
    </div>
    <Dialog v-model:visible="showAttributeDialog" modal :header="attributeDialogHeader" :style="{ width: '50vw' }">
            <FormKit type="form" @submit="saveAttribute" :submit-label="$t('admin_attributes.new_attribute_dialog_submit')">
                    <FormKit 
                        :label="$t('admin_attributes.name_hu')"
                        v-model="attribute.name_hu"
                        type="text"
                        validation="required"
                        validation-visibility="dirty"
                    />
                    <FormKit 
                        :label="$t('admin_attributes.name_en')"
                        v-model="attribute.name_en"
                        type="text"
                        validation="required"
                        validation-visibility="dirty"
                    />
                    <FormKit 
                        :label="$t('admin_attributes.type')"
                        v-model="attribute.type"
                        type="text"
                        validation="required"
                        validation-visibility="dirty"
                    />
                    <FormKit 
                        :label="$t('admin_attributes.unit')"
                        v-model="attribute.unit"
                        type="text"
                        validation="required"
                        validation-visibility="dirty"
                    />
                </FormKit>
        </Dialog>
        <Dialog v-model:visible="showDeleteAttributeDialog" modal :header="$t('admin_attributes.delete_attribute')" :style="{ width: '50vw' }">
            <p class="text-lg font-semibold mb-3">{{ $t('admin_attributes.confrim_dialog_question') }}</p>
            <div class="border p-2" v-if="attribute.categories?.length">
                <p class="mb-3">{{ $t('admin_attributes.affected_categories') }}</p>
                <p v-for="cat in attribute.categories">{{ cat.name_hu + '/' + cat.name_en }}</p>
                <p class="mt-3">{{ $t('admin_attributes.categories_will_lose_this_attribute') }}</p>
            </div>
            <template #footer>
                <Button :label="$t('confirm_dialog.reject_label')" @click="showDeleteAttributeDialog = false" />
                <Button :label="$t('confirm_dialog.accept_label')" @click="deleteAttribute"/>
            </template>
        </Dialog>
</template>