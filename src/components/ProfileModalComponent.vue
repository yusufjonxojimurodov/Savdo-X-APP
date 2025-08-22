<script setup>
import useUser from '../stores/user.pinia';
import { IonItem, IonLabel, IonList, IonReorder, IonReorderGroup } from '@ionic/vue';
import IconProfile from './icons/IconProfile.vue';
import IconPhone from './icons/IconPhone.vue';
import IconRole from './icons/IconRole.vue';
import IconGmail from './icons/IconGmail.vue';

const props = defineProps({
    open: Boolean
})

const emit = defineEmits(["close"])

const userStore = useUser()

const handleReorder = (CustomEvent) => {
    event.detail.complete();
}

function closeProfileModal() {
    emit("close")
}
</script>

<template>
    <a-modal @close="closeProfileModal" :open="props.open">
        <ion-list>
            <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
                <ion-item class="custom-item">
                    <div class="flex justify-center items-center gap-2">
                        <icon-profile />
                        <ion-label>{{ userStore.user.name }} {{ userStore.user.surname }}</ion-label>
                    </div>
                    <ion-reorder slot="end"></ion-reorder>
                </ion-item>

                <ion-item class="custom-item">
                    <div class="flex justify-center items-center gap-2">
                        <icon-phone />
                        <ion-label> {{ userStore.user.phone }} </ion-label>
                    </div>
                    <ion-reorder slot="end"></ion-reorder>
                </ion-item>

                <ion-item class="custom-item">
                    <div class="!flex justify-center items-center gap-2">
                        <icon-role />
                        <ion-label>{{ userStore.user.role }} </ion-label>
                    </div>
                    <ion-reorder slot="end"></ion-reorder>
                </ion-item>

                <ion-item class="custom-item">
                    <div class="flex justify-center items-center gap-2">
                        <icon-gmail />
                        <ion-label>{{ userStore.user.email || "" }}</ion-label>
                    </div>
                    <ion-reorder slot="end"></ion-reorder>
                </ion-item>
            </ion-reorder-group>
        </ion-list>

        <template #footer>
            <a-button class="!bg-[#183b74]" @click="closeProfileModal" type="primary" size="middle">Yopish</a-button>
        </template>
    </a-modal>
</template>

<style>
.custom-item {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>