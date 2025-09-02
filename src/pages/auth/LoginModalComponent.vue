<script setup>
import { ref } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonContent } from '@ionic/vue';
import useUser from '../../stores/user.pinia';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const props = defineProps({
    registerModalRef: Object
});

const router = useRouter
const isOpenLogin = ref(false);
const formRef = ref("")
const userStore = useUser()

const loginModel = ref({
    phone: "",
    password: ""
})

function cancel() {
    isOpenLogin.value = false;
}

function open() {
    isOpenLogin.value = true;
}

async function loginAccaount() {
    const success = await userStore.loginUser(loginModel.value);
    if (success) {
        setTimeout(() => {
            isOpenLogin.value = false
            window.location.reload()
        }, 1000)
    }
}

function changePassword() {
    message.success("Botga kirib ma'lumotlarni almashtirishingiz mumkin");
    setTimeout(() => {
        window.open("https://t.me/savdo_x_bot", "_blank");
    }, 2000);
}


defineExpose({ open });
</script>

<template>
    <ion-modal :is-open="isOpenLogin">
        <ion-header>
            <ion-toolbar>
                <p class="text-center text-[18px] font-semibold !text-white">Tizimga kirish</p>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <a-form ref="formRef" :model="loginModel">
                <a-form-item :rules="[{ required: true, message: 'Majburiy maydon!' }]" name="phone"
                    label="Telefon raqamingiz">
                    <a-input size="large" v-model:value="loginModel.phone" placeholder="Telefon Raqamingiz" />
                </a-form-item>
                <a-form-item :rules="[{ required: true, message: 'Majburiy maydon!' }]" name="password"
                    label="Parolingiz">
                    <a-input-password size="large" v-model:value="loginModel.password" placeholder="Parolingiz" />
                </a-form-item>

                <div class="flex justify-between items-center gap-2 !mt-[20px]">
                    <div>
                        <a-button @click="changePassword" type="text">Parolni bilmaysizmi ?</a-button>
                    </div>
                    <div class="flex justify-end items-center gap-2">
                        <ion-buttons>
                            <a-button class="!text-white !font-semibold" type="primary" danger @click="cancel">Bekor
                                qilish</a-button>
                        </ion-buttons>

                        <ion-buttons>
                            <a-button :loading="userStore.loader" type="primary"
                                class="!bg-[#FFD700] !text-gray-900 w-[80px] !m-0 !p-0 !flex !justify-center !items-center !font-semibold"
                                @click="loginAccaount">Kirish</a-button>
                        </ion-buttons>
                    </div>
                </div>
            </a-form>

        </ion-content>
    </ion-modal>
</template>

<style scoped>
ion-toolbar {
    padding: 10px;
    padding-top: 30px !important;
    --background: #04293A;
}

:deep(.ant-form-item-label > label) {
    color: #04293A !important;
    font-weight: 600;
}
</style>