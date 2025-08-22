<script setup>
import { IonContent, IonPage } from '@ionic/vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import WatchesProductComponent from './components/WatchesProductComponent.vue';
import { onMounted, watch } from 'vue';
import useFilterProducts from '../../stores/filter.products.pinia';
import { useRoute } from 'vue-router';
import useQueryParams from '../../utils/helpers/use.query.params';
import FooterComponent from '../../components/FooterComponent.vue';

const { getQueries } = useQueryParams()
const route = useRoute()
const filterProductStore = useFilterProducts()

onMounted(() => {
    filterProductStore.getWatches()
})

watch(() => route.query, () => {
    filterProductStore.getWatches({
        search: getQueries().search || null,
        model: getQueries().model || null
    })
})
</script>

<template>
    <ion-page>
        <header-component />

        <ion-content>
            <watches-product-component />
        </ion-content>

        <footer-component />
    </ion-page>
</template>