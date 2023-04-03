<script setup lang="ts">

function createCompany() {
    console.log('Created')
}
</script>

<template>
<div class="mt-16 flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
    <p class="text-4xl">{{ $t('create_company.title') }}</p>
    <div class="mt-10 bg-light-bg-1 dark:bg-dark-bg-1 rounded w-full min-h-screenflex items-center justify-center p-5">
        <FormKit type="form" :actions="false">
            <FormKit type="multi-step" tab-style="tab">
                <FormKit type="step" name="First step">
                    <FormKit
                        type="text"
                        label="Label"
                        validation="required"
                    />
                </FormKit>
                <FormKit type="step" name="Final step">
                    <FormKit
                        type="text"
                        label="Label"
                        validation="required"
                    />
                    <template #stepNext>
                        <FormKit type="submit" @click="createCompany" :label="$t('create_company.submit_label')"/>
                    </template>
                </FormKit>
            </FormKit>
        </FormKit>
    </div>
</div>
</template>