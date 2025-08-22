<script setup>
import { onMounted, ref } from 'vue';
import useUser from '../stores/user.pinia';
import IconUser from './icons/IconUser.vue';
import IconSetting from './icons/IconSetting.vue';
import IconSeller from './icons/IconSeller.vue';
import IconLogOut from './icons/IconLogOut.vue';
import IconHistory from './icons/IconHistory.vue';
import IconEnter from './icons/IconEnter.vue';
import { useRoute, useRouter } from 'vue-router';
import LoginModalComponent from '../pages/auth/LoginModalComponent.vue';
import ProfileModalComponent from './ProfileModalComponent.vue';
import { message } from 'ant-design-vue';
import useSetting from '../stores/settings.pinia';

const router = useRouter()
const settingStore = useSetting()
const route = useRoute()
const userStore = useUser()
const openProfileModal = ref(false)

const registerModalRef = ref();

const getPopupContainer = () => document.body;

const handleLogout = () => {
    message.success("Hisobdan muvaffaqiyatli chiqildi !")
    setTimeout(() => {
        localStorage.removeItem("access_token")
        window.location.reload()
    }, 700)
    router.push("/")
}

function openProfile() {
    openProfileModal.value = true
}

function login() {
    registerModalRef.value?.open();
}

function routerBot() {
    window.open("https://t.me/savdo_x_bot", "_blank")
}
</script>

<template>
    <a-dropdown :getPopupContainer="getPopupContainer" placement="bottomRight" :trigger="['click']"">
        <a class="">
            <a-space>
                <a-avatar :size="48" class="!mr-2 " style="background-color: none;">
        <template #icon>
            <img v-if="settingStore.avatar.length === 0" width="48px" height="48px" alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            <img v-else width="48px" height="48px" alt="Silhouette of a person's head" :src="settingStore.avatar" />
        </template>
        </a-avatar>
        </a-space>
        </a>

        <template #overlay>
            <a-menu class="custom-dropdown w-48">
                <template v-if="userStore.user && Object.keys(userStore.user).length > 0">
                    <a-menu-item class="logout-item" key="profil">
                        <div @click="openProfile" class="flex justify-between items-center w-full">
                            Profil
                            <icon-user />
                        </div>
                    </a-menu-item>
                    <a-menu-item class="logout-item" key="settings">
                        <div @click="router.push('/setting')" class="flex justify-between items-center">
                            Sozlamalar
                            <icon-setting />
                        </div>
                    </a-menu-item>
                    <a-menu-item key="telegramBot">
                        <div @click="routerBot" class="flex justify-between items-center w-full">
                            Savdo qilish
                            <icon-seller />
                        </div>
                    </a-menu-item>
                    <a-menu-item key="telegramBot">
                        <div @click="router.push('/pending/products')" class="flex justify-between items-center w-full">
                            Haridlar Tarixi
                            <icon-history />
                        </div>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="logout" class="logout-item">
                        <a-popconfirm title="Akkauntdan chiqmoqchimisiz?" ok-text="Chiqish" cancel-text="Bekor qilish"
                            :overlay-style="{ zIndex: 2000 }" @confirm="handleLogout" @click.stop>
                            <div class="flex justify-between items-center w-full">
                                <span>Chiqish</span>
                                <icon-log-out />
                            </div>
                        </a-popconfirm>
                    </a-menu-item>
                </template>
                <template v-else>
                    <a-menu-item @click="login" class="logout-item" key="profil">
                        <div class="flex justify-between items-center w-full">
                            Tizimga Kirish
                            <icon-enter />
                        </div>
                    </a-menu-item>
                </template>
            </a-menu>
        </template>
    </a-dropdown>

    <profile-modal-component :open="openProfileModal" @close="openProfileModal = false" />
    <login-modal-component ref="registerModalRef" />
</template>