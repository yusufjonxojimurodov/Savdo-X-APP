<script setup>
import { ref } from 'vue';
import useQueryParams from '../../../utils/helpers/use.query.params';

const { setQueries, getQueries } = useQueryParams()

const filterModelValue = ref(getQueries().model)
const smartphones = ref([
    {
        label: "Samsung",
        value: "Samsung"
    },
    {
        label: "Apple",
        value: "Apple"
    },
    {
        label: "Xiaomi",
        value: "Xiaomi"
    },
    {
        label: "Google",
        value: "Google"
    },
    {
        label: "Huawei",
        value: "Huawei"
    },
    {
        label: "Oppo",
        value: "Oppo"
    },
    {
        label: "Vivo",
        value: "Vivo"
    },
    {
        label: "Honor",
        value: "Honor"
    },
])

function filterModel(value) {
    setQueries({
        model: value || null
    })
}
</script>

<template>
    <div class="!flex justify-end items-center !pr-3 !mt-4 !mb-4">
        <a-select v-model:value="filterModelValue" @change="filterModel" allow-clear class="brand-select"
            placeholder="Brandni tanlang" style="width: 200px;" size="large" :options="smartphones" />
    </div>
</template>

<style scoped>
.brand-select :deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
    border-color: #1e293b !important;
}

.brand-select :deep(.ant-select-focused .ant-select-selector),
.brand-select :deep(.ant-select-selector:focus),
.brand-select :deep(.ant-select-selector:active) {
    border-color: #1e293b !important;
    box-shadow: 0 0 0 2px rgba(30, 41, 59, 0.2) !important;
}

.brand-select :deep(.ant-select-open .ant-select-selector) {
    border-color: #1e293b !important;
    box-shadow: 0 0 0 2px rgba(30, 41, 59, 0.2) !important;
}

.brand-select :deep(.ant-select-selection-placeholder) {
    color: #b0b0b0 !important;
}

.brand-select :deep(.ant-select-arrow) {
    color: #b0b0b0;
}
</style>