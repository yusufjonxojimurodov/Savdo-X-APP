<script setup>
import { onMounted, ref, nextTick } from "vue"
import L from "leaflet"
import { useRoute, useRouter } from "vue-router"
import useUser from "../../../stores/user.pinia"
import useProducts from "../../../stores/products.pinia"

const router = useRouter()
const route = useRoute()
const userStore = useUser()
const productStore = useProducts()

const map = ref(null)
const marker = ref(null)
const selectedLat = ref(null)
const selectedLng = ref(null)

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
                console.log("User koordinatalari:", lat, lng)
            },
            (err) => console.error("Joylashuv aniqlanmadi:", err)
        )
    }

    map.value.on("click", (e) => {
        if (marker.value) map.value.removeLayer(marker.value)
        marker.value = L.marker(e.latlng).addTo(map.value)

        selectedLat.value = e.latlng.lat
        selectedLng.value = e.latlng.lng

        console.log("Tanlangan koordinatalari:", selectedLat.value, selectedLng.value)
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
</script>

<template>
    <div class="h-[80vh] w-full">
        <div id="map"></div>
    </div>

    <div class="container !mt-5 !flex justify-end items-center">
        <a-button :loading="productStore.loader" class="!m-0 !flex !justify-center !items-center" @click="buySelected"
            type="primary" size="middle">
            Tasdiqlash
        </a-button>
    </div>
</template>

<style>
@import "leaflet/dist/leaflet.css";

#map {
    height: 100%;
    width: 100%;
}
</style>
