<script setup lang="ts">
import 'primevue/resources/themes/tailwind-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import Column from 'primevue/column'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import IColumn from '../interfaces/IColumn'
import Tooltip from '../components/Tooltip.vue'
import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'
import i18n from '../localization'

interface Props {
    data: Array<object>,
    expandableAttributeName?: string,
    columnNames: Array<IColumn>,
    expandableColumnNames?: Array<IColumn>,
    paginator?: boolean,
    rows?: 10|20|50,
    newButton?: boolean,
    newButtonText?: string,
    deleteButton?: boolean,
    deleteButtonText?: string,
    clickableColumnKeys?: Array<string>,
    selectable?: boolean,
    expandable?: boolean,
    editable?: boolean,
    deletable?: boolean,
    deletableEmit?: boolean,
    confirmEnabled?: boolean,
    groupRowsBy?: string,
    rowGroupMode?: 'subheader' | 'rowspan' | undefined
}

withDefaults(defineProps<Props>(), {
    data: () => [],
    expandableAttributeName: '',
    columnNames: () => [],
    expandableColumnNames: () => [],
    paginator: true,
    rows: 10,
    newButton: true,
    newButtonText: 'custom_table.new_button',
    deleteButton: true,
    deleteButtonText: 'custom_table.delete_button',
    clickableColumnKeys: () => [],
    selectable: true,
    expandable: true,
    editable: true,
    deletable: true,
    deletableEmit: false,
    confirmEnabled: true,
    rowGroupMode: undefined,
    groupRowsBy: ''
})

const selectedItems = ref()

const emit = defineEmits<{
  (e: 'deleteRecord', data: any): void,
  (e: 'newRecord'): void,
  (e: 'editRecord', data: any): void
  (e: 'columnClicked', data: any): void,
  (e: 'deleteSelectedRecords', data: any): void,
  (e: 'deleteRecordEmit', data:any): void
}>()

const confirm = useConfirm()
const expandedRows = ref([])
const deleteRecord = (data: object) => {
    confirm.require({
        message: i18n.global.t('confirm_dialog.single_message'),
        header: i18n.global.t('confirm_dialog.header'),
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: i18n.global.t('confirm_dialog.accept_label'),
        rejectLabel: i18n.global.t('confirm_dialog.reject_label'),
        acceptClass: 'p-button-danger',
        accept: () => {
            emit('deleteRecord', data)
        }
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteRecords = (selectedItems: any) => {
    confirm.require({
        message: i18n.global.t('confirm_dialog.multiple_message'),
        header: i18n.global.t('confirm_dialog.header'),
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: i18n.global.t('confirm_dialog.accept_label'),
        rejectLabel: i18n.global.t('confirm_dialog.reject_label'),
        acceptClass: 'p-button-danger',
        accept: () => {
            emit('deleteSelectedRecords', selectedItems)
        }
    })
}

function clearSelectedItems() {
    selectedItems.value = []
}

</script>

<template>
    <ConfirmDialog v-if="confirmEnabled"></ConfirmDialog>
    <DataTable 
        :value="data"
        class="m-5"
        :paginator="paginator"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="{first} - {last} / {totalRecords}"
        :rowsPerPageOptions="[10,20,50]"
        :rows="rows"
        sortMode="multiple"
        v-model:expandedRows="expandedRows"
        v-model:selection="selectedItems"
    >
        <template #header>
            <slot name="header">
                <div class="flex flex-col sm:flex-row justify-between sm:justify-start">
                    <Button v-if="newButton" :label="$t(newButtonText)" icon="pi pi-plus" @click="$emit('newRecord')" class="my-1 sm:my-0 sm:mx-2 w-28"/>
                    <Button v-if="deleteButton && selectable" :label="$t(deleteButtonText)" icon="pi pi-trash" @click="deleteRecords(selectedItems);clearSelectedItems();" :disabled="!selectedItems || !selectedItems.length" class="my-1 sm:my-0 sm:mx-2 w-28"/>
                </div>
            </slot>
        </template>
        <Column v-if="selectable" selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column v-if="expandable" expander style="width: 5rem" />
        <Column v-for="col of columnNames" :key="col.key" :field="col.key" :header="col.header" :sortable="!col.not_sortable">
            <template #body="{ data, field }">
                <slot :name="'column_'+field" v-bind = "data">
                    <div v-if="clickableColumnKeys.includes(col.key)" class="flex justify-center">
                        <Button class="w-full" :label="data[field]" icon="pi pi-cog" @click="$emit('columnClicked', data)" />
                    </div>
                    <div v-else>
                        {{ data[field] }}
                    </div>
                </slot>
            </template>
        </Column>
            
        <Column v-if="editable || deletable || deletableEmit">
          <template #header>
            <div>
              <i class="pi pi-cog"/>
            </div>
          </template>
          <template #body="slotProps">
            <div>
                <Tooltip v-if="editable" :content="$t('custom_table.tooltip_edit')" placement="bottom">
                    <Button icon="pi pi-pencil" class="p-button-rounded" @click="$emit('editRecord', slotProps.data)" />
                </Tooltip>
                <Tooltip v-if="deletable" :content="$t('custom_table.tooltip_delete')" placement="bottom">
                    <Button icon="pi pi-trash" class="p-button-rounded" @click="deleteRecord(slotProps.data);clearSelectedItems();" />
                </Tooltip>
                <Tooltip v-if="deletableEmit" :content="$t('custom_table.tooltip_delete')" placement="bottom">
                    <Button icon="pi pi-trash" class="p-button-rounded" @click="$emit('deleteRecordEmit', slotProps.data)" />
                </Tooltip>
            </div>
          </template>
        </Column>
        <template v-if="expandable" #expansion="slotProps">
            <div class="p-3">
                <h5>{{ $t('admin_categories.attributes') }}</h5>
                <DataTable 
                    :value="slotProps.data[expandableAttributeName]"
                    :rowGroupMode="rowGroupMode"
                    :groupRowsBy="groupRowsBy"
                >
                    <Column></Column>
                    <Column v-for="col of expandableColumnNames" :key="col.key" :field="col.key" :header="col.header" :sortable="!col.not_sortable"></Column>
                    <template #groupheader="slotProps">
                        <div class="flex items-center w-full">
                            <span class="w-full font-semibold">{{ slotProps.data[groupRowsBy] == true ? $t('admin_categories.inherited') : $t('admin_categories.own') }}</span>
                        </div>
                    </template>
                </DataTable>
            </div>
        </template>
    </DataTable>
</template>
