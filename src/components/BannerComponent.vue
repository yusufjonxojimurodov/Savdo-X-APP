<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import useProducts from '../stores/products.pinia';
import { onMounted } from 'vue';

const productStore = useProducts()

onMounted(() => {
    productStore.getBanenrs()
})
</script>

<template>
    <Swiper :modules="[Pagination, Autoplay]" :slides-per-view="1" :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true, dynamicBullets: true }"
        :observer="true" :observe-parents="true" class="mySwiper w-full h-[280px]">
        <SwiperSlide v-for="banner in productStore.banners" :key="banner.id">
            <div class="flex justify-center items-center !mt-[20px]">
                <img :src="banner.image" class="!w-[95%] !h-[220px] rounded-lg" />
            </div>
        </SwiperSlide>
    </Swiper>
</template>