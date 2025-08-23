<script setup>
import { IonCard, IonSegment, IonSegmentButton, IonSpinner, IonAlert, IonButton } from '@ionic/vue';
import IconHappy from '../../../components/icons/IconHappy.vue';
import IconSad from '../../../components/icons/IconSad.vue';
import { ref, watch } from 'vue';
import useProducts from '../../../stores/products.pinia';
import { useRoute, useRouter } from 'vue-router';
import useQueryParams from '../../../utils/helpers/use.query.params';
import useUser from '../../../stores/user.pinia';
import LoginModalComponent from '../../auth/LoginModalComponent.vue';
import BasketProductComponent from './BasketProductComponent.vue';
import CategoriesComponent from '../../../components/CategoriesComponent.vue';
import BannerComponent from '../../../components/BannerComponent.vue';

const userStore = useUser()
const router = useRouter()
const route = useRoute()
const { setQueries, getQueries } = useQueryParams()
const productStore = useProducts();
const buttonLoaders = ref({})
const registerModalRef = ref();

const segmentValue = ref("all")

function segmentChanged() {
    loadProducts()
}

function loadProducts() {
    if (segmentValue.value === "all") productStore.getProducts()
    else productStore.basketProductGet()
}

watch(() => route.query, () => {
    if (segmentValue.value === "all") {
        productStore.getProducts({
            search: getQueries().search || null,
        })
    } else {
        productStore.basketProductGet({
            search: getQueries().search || null,
        })
    }
}, { immediate: true })

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
    <banner-component />
    <categories-component />

    <login-modal-component ref="registerModalRef" />
    <ion-segment color="dark" v-model="segmentValue" @ionChange="segmentChanged">
        <ion-segment-button value="all">Mahsulotlar</ion-segment-button>
        <ion-segment-button :disabled="!userStore.user" value="basket">Savatdagilar</ion-segment-button>
    </ion-segment>

    <div v-if="productStore.loader" class="fixed !bg-black/40 inset-0 flex items-center justify-center z-50">
        <ion-spinner name="crescent"></ion-spinner>
    </div>
    <div class="container flex justify-between items-center flex-wrap !mb-[20px]">
        <ion-card @click="setProductId(product._id)" v-if="segmentValue === 'all'"
            v-for="product in productStore.products" :key="product._id">
            <a-image @click.stop :src="product.image" alt="Mahsulot rasmi"
                class="w-full !h-[100px] transition duration-500 object-contain" />
            <div class="flex justify-start items-start flex-col gap-2">
                <p class="text-[14px] text-[#3e3e3e]">{{ product.name}}</p>
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

        <basket-product-component v-if="segmentValue === 'basket'" />

        <a-empty class="!text-white relative top-40 !mb-50 left-1/2 -translate-x-1/2 -translate-y-1/2"
            v-if="!productStore.loader && productStore.products.length === 0">
            <template #image>
                <img width="200px" height="200px" src="/src/assets/images/noDataa.png" alt="no data" />
            </template>
        </a-empty>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

ion-card {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
    padding: 10px;
    width: 200px;
    height: 350px;
    margin-top: 20px;
    background: #F8F9FA;
    box-shadow: 0 8px 30px rgba(30, 41, 59, 0.3);
    border-radius: 16px;

    p,
    span {
        font-family: "Space Grotesk", sans-serif !important;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: normal;
    }
}

ion-spinner {
    --color: #ffff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

ion-segment-button {
    color: #1e293b !important;
}

.left-text {
    font-size: 16px;
}

@media (max-width: 430px) {
    ion-card {
        width: 185px;
    }

    .left-text {
        font-size: 14px;
    }
}

@media (max-width: 395px) {
    ion-card {
        width: 175px;
    }

    .left-text {
        font-size: 12px;
    }
}
</style>
