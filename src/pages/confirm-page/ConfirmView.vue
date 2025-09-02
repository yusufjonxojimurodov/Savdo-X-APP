<script setup>
import { ref, onMounted } from "vue";
import { IonPage, IonHeader, IonToolbar, IonBackButton, IonContent, IonAlert } from "@ionic/vue";
import { useRouter } from "vue-router";
import { Geolocation } from "@capacitor/geolocation";
import { App } from "@capacitor/app";
import ConfirmFormComponent from "./components/ConfirmFormComponent.vue";

const router = useRouter();
const showLocationAlert = ref(false);

async function checkLocation() {
    try {
        const perm = await Geolocation.requestPermissions();

        if (perm.location !== "granted") {
            showLocationAlert.value = true;
            return;
        }

        await Geolocation.getCurrentPosition({ timeout: 5000 });
        showLocationAlert.value = false;
    } catch (err) {
 
        if (err.code === 2) {
            showLocationAlert.value = true;
        } else {
            showLocationAlert.value = true;
        }
    }
}

const alertButtons = [
    {
        text: "Bekor qilish",
        role: "cancel",
        handler: () => router.back(),
    },
    {
        text: "Yoqish",
        handler: async () => {
            try {
                await App.openSettings();
            } catch (e) {
                console.error("Cannot open settings:", e);
            }
        },
    },
];

onMounted(() => {
    checkLocation();
});
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="!pt-3">
                <div class="container !mt-2">
                    <div class="flex justify-between items-center w-full">
                        <ion-back-button @click="router.push('/')" mode="ios" type="dark" text="Orqaga"
                            defaultHref="/" />
                        <h1 class="!text-[24px] text-[#1e293b] !font-semibold !m-0">Joylashuvingiz</h1>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-alert mode="ios" header="Joylashuv o‘chirilgan!" message="Bizga joylashuvingiz kerak 😊"
                :buttons="alertButtons" :is-open="showLocationAlert" />

            <confirm-form-component />
        </ion-content>
    </ion-page>
</template>
