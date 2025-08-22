<script setup>
import { ref } from 'vue';
import useSetting from '../../../stores/settings.pinia';
import useUser from '../../../stores/user.pinia';
import { useRouter } from 'vue-router';
import IconEdit from '../../../components/icons/IconEdit.vue';
import AvatarUploadComponent from '../../../components/AvatarUploadComponent.vue';

const router = useRouter()
const userStore = useUser()
const settingStore = useSetting()
const openAvatarModal = ref(false)

const formRef = ref()

const settingUser = ref({
    name: userStore.user.name,
    surname: userStore.user.surname,
    userName: userStore.user.userName,
    email: userStore.user.email,

})

async function completed() {
    await settingStore.putUserInfo(settingUser.value)
    userStore.userInfo()
}
</script>

<template>
    <div class="container flex justify-center items-start flex-col gap-4 !mt-10 !mb-[20px]">
        <div class="flex justify-start items-center gap-2">
            <div class="relative inline-block">
                <a-avatar :size="64" style="background-color: none;">
                    <template #icon>
                        <a-image v-if="settingStore.avatar.length === 0" alt="Silhouette of a person's head"
                            src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        <a-image v-else alt="Silhouette of a person's head" :src="settingStore.avatar" />
                    </template>
                </a-avatar>

                <icon-edit @click="openAvatarModal = true"
                    class="absolute top-10 left-8 rounded-full !p-1 cursor-pointer" />
            </div>


            <div class="flex justify-center items-start gap-2 flex-col">
                <h2 class="text-[16px] !m-0 text-gray-800 !font-semibold">{{ userStore.user.name }} {{
                    userStore.user.surname
                    }}</h2>
                <p class="text-[12px] text-gray-600">{{ userStore.user.userName }}</p>
            </div>
        </div>

        <a-form ref="formRef" :model="settingUser">
            <a-form-item name="name" label="Ismingiz"
                :rules="[{ required: true, message: 'Ismingizni kiriting', trigger: 'blur' }]">
                <a-input size="large" placeholder="Ismingiz" v-model:value="settingUser.name" />
            </a-form-item>

            <a-form-item name="surname" label="Familyangiz"
                :rules="[{ required: true, message: 'Familyangizni kiriting', trigger: 'blur' }]">
                <a-input size="large" placeholder="Familyangiz" v-model:value="settingUser.surname" />
            </a-form-item>

            <a-form-item name="email" label="Emailingiz">
                <a-input size="large" placeholder="savdo_x@gmail.com" v-model:value="settingUser.email" />
            </a-form-item>

            <a-form-item name="userName" label="Foydalanuvchi nomingiz (telegram)"
                :rules="[{ required: true, message: 'Foydalanuvchi nomingizni kiriting', trigger: 'blur' }]">
                <a-input size="large" placeholder="Foydalanuvchi nomingiz" v-model:value="settingUser.userName" />
            </a-form-item>
        </a-form>


        <div class="flex justify-end items-center gap-2 !p-0 !m-0 w-full">
            <a-button type="primary" @click="completed" :loading="settingStore.loaderButton">Saqlash</a-button>
        </div>
    </div>

    <avatar-upload-component :open="openAvatarModal" @close="openAvatarModal = false" />
</template>