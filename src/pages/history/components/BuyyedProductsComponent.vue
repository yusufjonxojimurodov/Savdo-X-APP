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
    <div class="container flex justify-between items-center flex-wrap">
        <template v-if="historyStore.loader">
            <ion-card v-for="n in 6" :key="n" class="!h-[220px]">
                <a-skeleton active :title="false" :paragraph="false" class="w-full h-full !rounded-[12px]" />
            </ion-card>
        </template>

        <template v-else>
            <ion-card @click="setProductId(buyyedProduct.productId._id)"
                v-for="buyyedProduct in historyStore.buyyedProducts" :key="buyyedProduct._id">
                <a-image @click.stop :src="buyyedProduct.productId.image" alt="Mahsulot rasmi"
                    class="w-full !h-[100px] transition duration-500 object-contain" />

                <div class="flex justify-start items-start flex-col gap-2">
                    <p class="text-[16px] text-[#3e3e3e]">{{ buyyedProduct.productId.name }}</p>
                    <a href="tel:"
                        class="!text-[12px] !text-[#3e3e3e] !font-semibold border-b border-[#3e3e3e]">Sotuvchi:
                        {{ buyyedProduct.sellerId.phone }}</a>

                    <div class="!flex justify-start items-center gap-2">
                        <p :class="[
                            'text-[14px] sm:text-[16px] md:text-[18px] rounded-[10px] font-semibold',
                            buyyedProduct.productId.discountPrice ? '!line-through !opacity-80 text-[#3e3e3e]' : 'text-[#1e293b]'
                        ]">
                            {{ buyyedProduct.productId.price }}$
                        </p>
                        <p v-if="!buyyedProduct.discountPrice"
                            class="text-[14px] sm:text-[16px] md:text-[18px] text-[#1e293b] font-semibold">
                            {{ buyyedProduct.productId.discountPrice }}$
                        </p>
                    </div>

                    <p class="text-[#3e3e3e] text-[12px] sm:text-[13px] md:text-[14px]">
                        {{ buyyedProduct.productId.description.slice(0, 80) }}
                        <router-link to=""
                            class="!text-[#3e3e3e] text-medium text-[12px] sm:text-[13px] md:text-[14px]">Batafsil...</router-link>
                    </p>

                    <div class="!flex !justify-between items-center w-full">
                        <p class="left-text text-[#3e3e3e]">Olindi: {{ buyyedProduct.quantity }} ta</p>
                    </div>
                    <a-button class="!bg-[#183b74] !w-full !text-white !m-0 !p-0 !font-semibold" type="primary"
                        size="middle">{{ buyyedProduct.status === "pending" ? "Yetkazilmoqda" : buyyedProduct.status ===
                            "incompleted" ? "Yetkazilmadi" : "Yetkazilgan" }}</a-button>
                </div>
            </ion-card>
        </template>
    </div>
</template>