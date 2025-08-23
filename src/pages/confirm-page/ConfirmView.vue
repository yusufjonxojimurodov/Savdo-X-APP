<script setup>
import { ref, onMounted } from "vue";
import { IonPage, IonHeader, IonToolbar, IonBackButton, IonContent, IonAlert } from "@ionic/vue";
import { useRouter } from "vue-router";
import { Geolocation } from "@capacitor/geolocation";
import ConfirmFormComponent from "./components/ConfirmFormComponent.vue";
import { Browser } from "@capacitor/browser";

const router = useRouter();

const showLocationAlert = ref(false);

async function checkLocationPermission() {
    try {
        const perm = await Geolocation.checkPermissions();
        console.log("Geo permission:", perm);

        if (perm.location === "denied" || perm.location === "prompt") {
            showLocationAlert.value = true;
        }
    } catch (err) {
        console.error("Location check error:", err);
        showLocationAlert.value = true;
    }
}

onMounted(() => {
    checkLocationPermission();
});

const alertButtons = [
    {
        text: "Bekor qilish",
        role: "cancel",
        handler: () => {
            router.back();
        },
    },
    {
        text: "Yoqish",
        handler: async () => {
            await Browser.open({ url: "app-settings:" });
        },
    },
];
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="!pt-3">
                <div class="container !mt-2">
                    <div class="flex justify-between items-center w-full">
                        <ion-back-button @click="router.push('/')" mode="ios" type="dark" text="Orqaga"
                            defaultHref="/"></ion-back-button>

                        <h1 class="!text-[24px] text-[#1e293b] !font-semibold !m-0">Joylashuvingiz</h1>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-alert mode="ios" header="Joylashuv o‘chirilgan!" message="Bizga joylashuvingiz kerak😊"
                :buttons="alertButtons" :is-open="showLocationAlert" />
            <confirm-form-component />
        </ion-content>
    </ion-page>
</template>
