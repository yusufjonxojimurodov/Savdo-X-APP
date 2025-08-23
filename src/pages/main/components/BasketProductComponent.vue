<script setup>
import { IonCard, IonSpinner } from '@ionic/vue';
import { ref } from 'vue';
import useProducts from '../../../stores/products.pinia';
import QuantitiyComponent from '../../../components/QuantitiyComponent.vue';
import IconCansel from '../../../components/icons/IconCansel.vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const productStore = useProducts();
const buttonLoaders = ref({})
const quantities = ref({})

async function deleteProduct(id) {
    try {
        await productStore.deleteBasketProduct(id);
        message.success("Savatchadan mahsulot o'chirildi")
    } catch (error) {
        message.error(error)
    }
}

function buyProduct(id) {
    const quantityForProduct = quantities.value[id] || 1;
    router.push({
        path: "/confirm",
        query: {
            id: id,
            quantity: quantityForProduct
        }
    })
}

function setProductId(id) {
    router.push({
        path: "/product/information",
        query: { id: id }
    })
}
</script>

<template>
    <div v-if="productStore.loader" class="fixed inset-0 flex items-center justify-center z-50 !bg-black/30">
        <ion-spinner name="crescent"></ion-spinner>
    </div>
    <div class="!flex !justify-between !oductSitems-center !flex-wrap w-full">
        <ion-card @click="setProductId(product.product._id)" v-for="product in productStore.basketProducts"
            :key="product.product._id">
            <a-image @click.stop :src="product.product.image" alt="Mahsulot rasmi"
                class="w-full !h-[100px] transition duration-500 object-contain" />

            <a-popconfirm @click.stop ok-text="Ha" cancel-text="Yo'q" @confirm="deleteProduct(product._id)"
                title="Savatchadan o'chirmoqchimisiz ?">
                <icon-cansel class="absolute right-2 top-2 border-none outline-none" />
            </a-popconfirm>

            <div class="flex justify-start items-start flex-col gap-2">
                <p class="text-[14px] text-[#3e3e3e]">{{ product.product.name }}</p>
                <div class="flex justify-center items-center gap-2">
                    <div class="flex justify-center items-center gap-1">
                        <quantitiy-component @click.stop v-model="quantities[product._id]"
                            :model-value="product.quantity" :max="product.product.left" />
                    </div>
                </div>

                <div class="!flex justify-start items-center gap-2">
                    <p :class="[
                        'text-[14px] sm:text-[16px] md:text-[18px] rounded-[10px] font-semibold',
                        product.product.discountPrice ? '!line-through !opacity-80 text-[#3e3e3e]' : 'text-[#3e3e3e]'
                    ]">
                        {{ product.product.price }}$
                    </p>
                    <p v-if="product.product.discountPrice"
                        class="text-[14px] sm:text-[16px] md:text-[18px] text-[#3e3e3e] font-semibold">
                        {{ product.product.discountPrice }}$
                    </p>
                </div>

                <p class="text-[#3e3e3e] text-[12px] sm:text-[13px] md:text-[14px]">
                    {{ product.product.description.slice(0, 80) }}
                    <router-link to=""
                        class="!text-[#3e3e3e] text-medium text-[12px] sm:text-[13px] md:text-[14px]">Batafsil...</router-link>
                </p>

                <div class="!flex !justify-between items-center w-full">
                    <p class="text-[14px] text-[#3e3e3e]">{{ product.product.left }} ta qoldi</p>

                    <a-popover v-if="product.product.left === 0" content="Mahsulot qolmagan" trigger="click">
                        <a-button @click.stop class="!bg-[#183b74] !w-[80px] !text-white !m-0 !p-0 !font-semibold"
                            type="primary" size="middle">
                            <template #icon>Sotib olish</template>
                        </a-button>
                    </a-popover>

                    <a-button v-else :loading="buttonLoaders[product._id]" @click.stop="buyProduct(product._id)"
                        class="!bg-[#183b74] !w-[80px] !text-white !m-0 !p-0 !font-semibold" type="primary"
                        size="middle">
                        <template #icon>Sotib olish</template>
                    </a-button>
                </div>
            </div>
        </ion-card>
    </div>

    <a-empty class="!text-white relative top-40 !mb-50 left-1/2 -translate-x-1/2 -translate-y-1/2"
        v-if="!productStore.loader && productStore.basketProducts.length === 0">
        <template #image>
            <img width="200px" height="200px" src="/src/assets/images/noDataa.png" alt="no data" />
        </template>
    </a-empty>

</template>