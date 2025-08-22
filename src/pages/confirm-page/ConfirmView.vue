<script setup>
import { useRouter } from 'vue-router';
import ConfirmFormComponent from './components/ConfirmFormComponent.vue';
import { IonPage, IonHeader, IonToolbar, IonBackButton, IonContent } from '@ionic/vue';

const router = useRouter()
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <div class="container !mt-2">
                    <div class="flex justify-between items-center w-full">
                        <ion-back-button @click="router.push('/')" mode="ios" type="dark" text="Orqaga"
                            defaultHref="/"></ion-back-button>

                        <h1 class="!text-[16px] text-[#1e293b] !font-semibold !m-0">Ma'lumotlarni kiriting</h1>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <confirm-form-component />
        </ion-content>
    </ion-page>
</template>