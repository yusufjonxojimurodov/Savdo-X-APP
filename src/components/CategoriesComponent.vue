<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const images = ref([
    {
        id: 1,
        name: "Smartfonlar",
        src: new URL("../assets/images/phone.png", import.meta.url).href,
        path: "/smartphone"
    },
    {
        id: 2,
        name: "Qo'l soatlari",
        src: new URL("../assets/images/watch.png", import.meta.url).href,
        path: "/watches"
    },
    {
        id: 3,
        name: "Quloqchinlar",
        src: new URL("../assets/images/buds.png", import.meta.url).href,
        path: "/headphones"
    }
])

function routerCategories(img) {
    router.push(img.path)
}
</script>

<template>
    <div class="container flex justify-center items-center gap-6 !mt-4 !mb-4 flex-wrap">
        <div class="!w-[100px] flex justify-center items-center flex-col gap-2" v-for="img in images" :key="img.id">
            <img @click="routerCategories(img)" class="!bg-[#183b74] object-contain !p-2 rounded-xl " width="48px"
                height="48px" :src="img.src" alt="categories-image">
            <p class="text-[#1e293b] !font-semibold text-[16px]">{{ img.name }}</p>
        </div>
    </div>
</template>