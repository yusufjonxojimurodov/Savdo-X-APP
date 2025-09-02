<script setup>
import { onMounted } from 'vue';
import useHistory from '../../stores/history.pinia';
import PendingProductsComponent from './components/PendingProductsComponent.vue';
import BuyyedProductsComponent from './components/BuyyedProductsComponent.vue';
import { IonPage, IonContent, IonBackButton, IonHeader, IonToolbar, IonSpinner } from '@ionic/vue';
import FooterComponent from '../../components/FooterComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const historyStore = useHistory()

onMounted(() => {
    historyStore.getPendingProductBuyer()
    historyStore.getDeliveryProducts()
})
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="!pt-3">
                <div class="container !mt-2">
                    <div class="flex justify-between items-center w-full">
                        <ion-back-button @click="router.push('/')" mode="ios" type="dark" text="Orqaga"
                            defaultHref="/"></ion-back-button>

                        <h1 class="!text-[24px] text-[#1e293b] !font-semibold !m-0">Haridlar Tarixi</h1>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <buyyed-products-component />
            <pending-products-component v-if="historyStore.pendingProducts" />
            <a-empty class="!text-white relative top-40 !mb-50 left-1/2 -translate-x-1/2 -translate-y-1/2"
                v-if="!historyStore.loader && historyStore.pendingProducts.length === 0 && historyStore.buyyedProducts.length === 0">
                <template #image>
                    <img width="200px" height="200px" src="/src/assets/images/noDataa.png" alt="no data" />
                </template>
            </a-empty>
        </ion-content>

        <footer-component />
    </ion-page>
</template>