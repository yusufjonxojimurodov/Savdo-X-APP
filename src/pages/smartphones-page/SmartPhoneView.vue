<script setup>
import { IonContent, IonPage } from '@ionic/vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import SmartPhoneProductComponent from './components/SmartPhoneProductComponent.vue';
import { onMounted, watch } from 'vue';
import useFilterProducts from '../../stores/filter.products.pinia';
import FooterComponent from '../../components/FooterComponent.vue';
import { useRoute } from 'vue-router';
import useQueryParams from '../../utils/helpers/use.query.params';

const { getQueries } = useQueryParams()
const route = useRoute()
const filterProductStore = useFilterProducts()

onMounted(() => {
    filterProductStore.getSmartphones()
})

watch(() => route.query, () => {
    filterProductStore.getSmartphones({
        search: getQueries().search || null,
        model: getQueries().model || null
    })
})
</script>

<template>
    <ion-page>
        <header-component />
        <ion-content>
            <smart-phone-product-component />
        </ion-content>
        <footer-component />
    </ion-page>
</template>