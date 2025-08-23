<script setup>
import LoginModalComponent from '../../auth/LoginModalComponent.vue';
import { IonBackButton, IonButtons, IonCard, IonSpinner } from '@ionic/vue';
import useFilterProducts from '../../../stores/filter.products.pinia';
import IconHappy from '../../../components/icons/IconHappy.vue';
import IconSad from '../../../components/icons/IconSad.vue';
import { ref } from 'vue';
import useUser from '../../../stores/user.pinia';
import useProducts from '../../../stores/products.pinia';
import { useRouter } from 'vue-router';
import BannerComponent from '../../../components/BannerComponent.vue';
import SmartPhoneFilterComponent from './SmartPhoneFilterComponent.vue';

const router = useRouter()
const productStore = useProducts()
const userStore = useUser()
const filterProductStore = useFilterProducts()
const registerModalRef = ref()

const buttonLoaders = ref({})

async function basket(id) {
    if (!userStore.user) {
        registerModalRef.value?.open();
        return;
    } else {
        buttonLoaders.value[id] = true
        try {
            await productStore.basketProduct({
                productId: id,
                quantity: 1
            })
        } finally {
            buttonLoaders.value[id] = false
        }
    }
}

function setProductId(id) {
    router.push({
        path: "/product/information",
        query: { id: id }
    })
}
</script>

<template>
    <login-modal-component ref="registerModalRef" />
    <div v-if="filterProductStore.loader" class="fixed !bg-black/30 inset-0 flex items-center justify-center z-50">
        <ion-spinner name="crescent"></ion-spinner>
    </div>

    <div class="container !p-4">
        <div class="flex justify-between items-center w-full">
            <ion-back-button @click="router.push('/')" mode="ios" type="dark" text="Orqaga"
                defaultHref="/"></ion-back-button>

            <h1 class="title-page text-[#1e293b] !font-semibold !m-0">Smartfonlar</h1>
        </div>
    </div>
    <banner-component />
    <smart-phone-filter-component />
    <div class="container flex justify-between items-center flex-wrap !mb-[20px]">
        <ion-card @click="setProductId(product._id)" v-for="product in filterProductStore.smartPhones"
            :key="product._id">
            <a-image :src="product.image" alt="Mahsulot rasmi"
                class="w-full !h-[100px] transition duration-500 object-contain" />
            <div class="flex justify-start items-start flex-col gap-2">
                <p class="text-[14px] text-[#3e3e3e]">{{ product.name.slice(0, 20) }}</p>
                <p class="text-[12px] text-[#3e3e3e]">{{ product.createdBy.userName }}</p>
                <div class="flex justify-center items-center gap-2">
                    <div class="flex justify-center items-center gap-1">
                        <icon-happy />
                        <p class="!text-[#3e3e3e] !font-semibold">{{ product.rating.happy }}%</p>
                    </div>

                    <div class="flex justify-center items-center gap-1">
                        <icon-sad />
                        <p class="!text-[#3e3e3e] font-semibold">{{ product.rating.unhappy }}%</p>
                    </div>
                </div>

                <div class="!flex justify-start items-center gap-2">
                    <p :class="[
                        'text-[14px] sm:text-[16px] md:text-[18px] rounded-[10px] font-semibold',
                        product.discountPrice ? '!line-through !opacity-80 text-[#3e3e3e]' : 'text-[#1e293b]'
                    ]">
                        {{ product.price }}$
                    </p>
                    <p v-if="product.discountPrice"
                        class="text-[14px] sm:text-[16px] md:text-[18px] text-[#1e293b] font-semibold">
                        {{ product.discountPrice }}$
                    </p>
                </div>

                <p class="text-[#3e3e3e] text-[12px] sm:text-[13px] md:text-[14px]">
                    {{ product.description.slice(0, 80) }}
                    <router-link to=""
                        class="!text-[#3e3e3e] text-medium text-[12px] sm:text-[13px] md:text-[14px]">Batafsil...</router-link>
                </p>

                <div class="!flex !justify-between items-center w-full">
                    <p class="left-text text-[#3e3e3e]">{{ product.left }} ta qoldi</p>

                    <a-popover v-if="product.left === 0" content="Mahsulot qolmagan" trigger="click">
                        <a-button @click.stop class="!bg-[#183b74] !w-[80px] !text-white !m-0 !p-0 !font-semibold"
                            type="primary" size="middle">
                            <template #icon>Savatga</template>
                        </a-button>
                    </a-popover>

                    <a-button v-else :loading="buttonLoaders[product._id]" @click.stop="basket(product._id)"
                        class="!bg-[#183b74] !w-[80px] !text-white !m-0 !p-0 !font-semibold" type="primary"
                        size="middle">
                        <template #icon>Savatga</template>
                    </a-button>
                </div>
            </div>
        </ion-card>

        <a-empty class="!text-white relative top-40 !mb-50 left-1/2 -translate-x-1/2 -translate-y-1/2"
            v-if="!filterProductStore.loader && filterProductStore.smartPhones.length === 0">
            <template #image>
                <img width="200px" height="200px" src="/src/assets/images/noDataa.png" alt="no data" />
            </template>
        </a-empty>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap');

.title-page {
    font-family: "Google Sans Code", monospace;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
}
</style>