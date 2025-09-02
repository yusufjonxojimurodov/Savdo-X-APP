<script setup>
import { IonCard } from '@ionic/vue';
import useHistory from '../../../stores/history.pinia';
import { useRouter } from 'vue-router';

const router = useRouter()
const historyStore = useHistory()

function setProductId(id) {
    router.push({
        path: "/product/information",
        query: { id: id }
    })
}
</script>

<template>
    <div class="container flex justify-between items-center flex-wrap !mb-[20px]">
        <template v-if="filterProductStore.loader && segmentValue === 'all'">
            <ion-card class="!h-[230px]" v-for="n in 6" :key="n">
                <a-skeleton active>
                    <a-skeleton-image style="width: 100%; height: 100px;" />
                    <a-skeleton-paragraph :rows="6" />
                </a-skeleton>
            </ion-card>
        </template>

        <template v-else>
            <ion-card @click="setProductId(pendingProduct.product._id)"
                v-for="pendingProduct in historyStore.pendingProducts" :key="pendingProduct._id">
                <a-image @click.stop :src="pendingProduct.product.image" alt="Mahsulot rasmi"
                    class="w-full !h-[100px] transition duration-500 object-contain" />

                <div class="flex justify-start items-start flex-col gap-2">
                    <p class="text-[16px] text-[#3e3e3e]">{{ pendingProduct.product.name }}</p>
                    <p class="text-[12px] text-[#3e3e3e]">{{ pendingProduct.createdBy.userName }}</p>

                    <div class="!flex justify-start items-center gap-2">
                        <p :class="[
                            'text-[14px] sm:text-[16px] md:text-[18px] rounded-[10px] font-semibold',
                            pendingProduct.product.discountPrice ? '!line-through !opacity-80 text-[#3e3e3e]' : 'text-[#1e293b]'
                        ]">
                            {{ pendingProduct.price }}$
                        </p>
                        <p v-if="!pendingProduct.discountPrice"
                            class="text-[14px] sm:text-[16px] md:text-[18px] text-[#1e293b] font-semibold">
                            {{ pendingProduct.product.discountPrice }}$
                        </p>
                    </div>

                    <p class="text-[#3e3e3e] text-[12px] sm:text-[13px] md:text-[14px]">
                        {{ pendingProduct.product.description.slice(0, 80) }}
                        <router-link to=""
                            class="!text-[#3e3e3e] text-medium text-[12px] sm:text-[13px] md:text-[14px]">Batafsil...</router-link>
                    </p>

                    <div class="!flex !justify-between items-center w-full">
                        <p class="left-text text-[#3e3e3e]">Olinmoqda: {{ pendingProduct.quantity }} ta</p>
                    </div>
                    <a-button class="!bg-[#183b74] !w-full !text-white !m-0 !p-0 !font-semibold" type="primary"
                        size="middle">Kutilmoqda</a-button>
                </div>
            </ion-card>
        </template>
    </div>
</template>