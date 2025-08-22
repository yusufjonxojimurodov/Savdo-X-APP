<script setup>
import useProducts from '../../../stores/products.pinia';
import IconHappy from '../../../components/icons/IconHappy.vue';
import { IonSpinner } from '@ionic/vue';
import LoginModalComponent from '../../auth/LoginModalComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useUser from '../../../stores/user.pinia';
import CommentComponent from '../../../components/CommentComponent.vue';

const userStore = useUser()
const route = useRoute()
const productStore = useProducts()
const registerModalRef = ref()

const productId = route.query.id
const buttonLoaders = ref(false)

async function basket() {
    if (!userStore.user) {
        registerModalRef.value?.open();
        return;
    } else {
        buttonLoaders.value = true
        try {
            await productStore.basketProduct({
                productId: productId,
                quantity: 1
            })
        } finally {
            buttonLoaders.value = false
        }
    }
}
</script>

<template>
    <login-modal-component ref="registerModalRef" />

    <div v-if="!productStore.loader" class="w-[100%] shadow-md !flex justify-center flex-col gap-2 items-center !p-1">
        <div class="flex justify-center items-start gap-2">
            <div class="flex justify-start items-start flex-col gap-2">
                <a-image class="object-cover !h-[200px]" :src="productStore.product.image" alt="image" />
            </div>

            <div class="!flex justify-center items-start gap-2 flex-col !mt-3">
                <p class="text-[20px] !font-semibold ">{{ productStore.product.name }}</p>
                <div class="flex justify-center items-center gap-2">
                    <icon-happy />
                    <p>{{ productStore.product.rating?.happy ?? 0 }}%</p>
                </div>
                <div class="!flex justify-start items-center gap-2">
                    <p :class="[
                        'text-[16px] rounded-[10px] !font-semibold',
                        productStore.product.discountPrice ? '!line-through !opacity-80 text-[#3e3e3e]' : 'text-[#1e293b]'
                    ]">
                        {{ productStore.product.price }}$
                    </p>
                    <p v-if="productStore.product.discountPrice" class="text-[16px] text-[#1e293b] !font-semibold">
                        {{ productStore.product.discountPrice }}$
                    </p>
                </div>
                <p class="text-[14px] text-[#3e3e3e] !w-[170px]">{{ productStore.product.description }}</p>
            </div>
        </div>
        <a-popover v-if="productStore.product.left === 0" content="Mahsulot qolmagan" trigger="click">
            <a-button @click.stop class="!bg-[#183b74] !w-full !text-white !m-0 !p-0 !font-semibold" type="primary"
                size="large">
                <template #icon>Savatga</template>
            </a-button>
        </a-popover>

        <a-button v-else :loading="buttonLoaders" @click.stop="basket"
            class="!bg-[#183b74] !w-full !text-white !m-0 !p-0 !font-semibold" type="primary" size="large">
            <template #icon>Savatga</template>
        </a-button>
    </div>

    <comment-component v-if="!productStore.loader" />
</template>