<script setup>
import { IonHeader, IonPage, IonToolbar, IonBackButton, IonContent, IonSpinner } from '@ionic/vue';
import ProductInfoComponent from './components/ProductInfoComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
import useProducts from '../../stores/products.pinia';
import useComments from '../../stores/comment.pinia';

const route = useRoute()
const router = useRouter()
const commentStore = useComments()
const productStore = useProducts()

watch(() => route.query.id, async (newId) => {
    if (newId) {
        productStore.product = {}
        await Promise.all([
            productStore.getProductInfo(newId),
            commentStore.getComments(newId)
        ])
    }
}, { immediate: true })

function goBack() {
    router.back()
}
</script>

<template>
    <ion-page>
        <div v-if="productStore.loader || commentStore.loader"
            class="fixed !bg-black/40 inset-0 flex items-center justify-center z-50">
            <ion-spinner name="crescent"></ion-spinner>
        </div>
        <ion-header>
            <ion-toolbar>
                <div class="container !mt-2">
                    <div class="flex justify-between items-center w-full">
                        <ion-back-button @click="goBack" mode="ios" type="dark" text="Orqaga"
                            defaultHref="/"></ion-back-button>

                        <h1 class="!text-[24px] text-[#1e293b] !font-semibold !m-0">{{ productStore.product.name }}</h1>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <product-info-component />
        </ion-content>
    </ion-page>
</template>