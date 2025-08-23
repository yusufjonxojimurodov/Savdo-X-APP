<script setup>
import { useRouter } from 'vue-router';
import SettingFormComponent from './components/SettingFormComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import { IonPage, IonHeader, IonToolbar, IonBackButton, IonContent } from '@ionic/vue';

const router = useRouter()
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="!pt-3">
                <div class="container !mt-2">
                    <div class="flex justify-between items-center w-full">
                        <ion-back-button @click="router.back()" mode="ios" type="dark" text="Orqaga"
                            defaultHref="/"></ion-back-button>

                        <h1 class="title-page text-[#1e293b] !font-semibold !m-0">Sozlamalar</h1>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <setting-form-component />
        </ion-content>

        <footer-component />
    </ion-page>
</template>
