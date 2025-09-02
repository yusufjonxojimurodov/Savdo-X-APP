<script setup>
import { onMounted, ref, nextTick } from "vue"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useRoute, useRouter } from "vue-router"
import useUser from "../../../stores/user.pinia"
import useProducts from "../../../stores/products.pinia"
import { IonAlert, IonSpinner } from '@ionic/vue'
import { alert } from "ionicons/icons"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
    iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
    shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
})

const router = useRouter()
const route = useRoute()
const userStore = useUser()
const productStore = useProducts()

const map = ref(null)
const marker = ref(null)
const selectedLat = ref(null)
const selectedLng = ref(null)
const loadingLocation = ref(true)
const showAlert = ref(false)
const alertMessage = ref("")

const productId = route.query.id
const quantity = route.query.quantity || 1

onMounted(async () => {
    await nextTick()

    map.value = L.map("map").setView([41.2995, 69.2401], 12)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map.value)
    map.value.invalidateSize()

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude
                const lng = pos.coords.longitude

                marker.value = L.marker([lat, lng]).addTo(map.value)
                map.value.setView([lat, lng], 14)

                selectedLat.value = lat
                selectedLng.value = lng
                console.log("✅ User koordinatalari:", lat, lng)
                loadingLocation.value = false
            },
            (err) => {
                loadingLocation.value = false
                alertMessage.value = "Joylashuvni olishda xatolik: " + err.message
                showAlert.value = true
                console.error("❌ Joylashuv aniqlanmadi:", err)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        )
    } else {
        loadingLocation.value = false
        alertMessage.value = "Brauzer geolocation qo'llab-quvvatlamaydi."
        showAlert.value = true
    }

    map.value.on("click", (e) => {
        if (marker.value) map.value.removeLayer(marker.value)
        marker.value = L.marker(e.latlng).addTo(map.value)

        selectedLat.value = e.latlng.lat
        selectedLng.value = e.latlng.lng
    })
})

async function buySelected() {
    if (!selectedLat.value || !selectedLng.value) {
        alert("Iltimos, marker tanlang!")
        return
    }

    const orders = [
        { productId: productId, quantity: quantity }
    ]

    const information = {
        orders,
        phone: userStore.user.phone,
        userName: userStore.user.userName,
        buyerChatId: userStore.user.chatId,
        location: {
            lat: selectedLat.value,
            lng: selectedLng.value
        }
    }

    try {
        await productStore.ApiPostPendingProduct(information)
        router.push("/")
    } catch (err) {
        console.error(err)
    }
}

const alertButtons = [
    {
        text: 'Yopish',
        role: 'close',
        handler: () => {
            router.back()
        },
    }
];
</script>

<template>
    <div class="h-[80vh] w-full relative">
        <div id="map"></div>

        <div v-if="loadingLocation"
            class="absolute top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center z-50">
            <ion-spinner name="crescent"></ion-spinner>
        </div>
    </div>

    <div class="container !mt-5 !flex justify-end items-center">
        <a-button :loading="productStore.loader" class="!m-0 !flex !justify-center !items-center" @click="buySelected"
            type="primary" size="middle">
            Tasdiqlash
        </a-button>
    </div>

    <ion-alert mode="ios" header="Internet mavjud emas !" :message="alert" :buttons="alertButtons"
        :is-open="showNoInternet" />
</template>

<style>
#map {
    height: 100%;
    width: 100%;
}
</style>
