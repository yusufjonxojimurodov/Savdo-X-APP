<script setup>
import LoginModalComponent from './pages/auth/LoginModalComponent.vue';
import { onBeforeMount, ref, watch, onMounted } from 'vue';
import useUser from './stores/user.pinia';
import useSetting from './stores/settings.pinia';
import { IonApp, IonRouterOutlet, IonAlert } from '@ionic/vue';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import FooterComponent from './components/FooterComponent.vue';

const settingStore = useSetting();
const userStore = useUser();

const showHello = ref(false);
const registerModalRef = ref();
const loginModalRef = ref();
const showNoInternet = ref(false);

onBeforeMount(() => {
  userStore.userInfo();
  settingStore.getUserAvatar();
});

function updateOnlineStatus() {
  showNoInternet.value = !navigator.onLine;
}

onMounted(() => {
  updateOnlineStatus();
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

watch(
  () => userStore.user,
  (newVal) => {
    if (newVal) {
      showHello.value = true;
      setTimeout(() => {
        showHello.value = false;
      }, 3000);
    }
  },
  { immediate: true }
);

const alertButtons = [
  {
    text: 'Chiqish',
    role: 'cancel',
    handler: () => {
      App.exitApp();
    },
  },
  {
    text: 'Yoqish',
    handler: async () => {
      await Browser.open({ url: 'app-settings:' });
    },
  },
];
</script>

<template>
  <ion-app>
    <login-modal-component ref="registerModalRef" />

    <ion-alert v-if="showNoInternet" mode="ios" header="Internet mavjud emas !"
      message="Ilovadan foydalanish uchun mobil internetni yoqing 😀" :buttons="alertButtons"
      :is-open="showNoInternet" />

    <div v-if="showHello && userStore.user"
      class="fixed inset-0 z-50 flex justify-center items-center text-white text-4xl font-extrabold hello-bg">
      Salom {{ userStore.user.name }}
    </div>

    <ion-router-outlet />
  </ion-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap');

.hello-bg {
  background: linear-gradient(135deg, #183b74, #2d4f8c);
  background-size: 200% 200%;
  animation: bgFlow 6s ease-in-out infinite alternate, zoomPulse 6s ease-in-out infinite;
  font-family: "Cinzel", serif;
  font-weight: 600;
}

@keyframes bgFlow {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

@keyframes zoomPulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>
