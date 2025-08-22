<script setup>
import { IonFooter } from '@ionic/vue';

const appVersion = "v1.2.1";
</script>

<template>
    <ion-footer>
        <div class="flex justify-center items-center flex-col !p-2">
            <div class="flex justify-center items-center gap-2">
                <span class="!font-semibold text-[18px] cursor-pointer hover:text-blue-600">
                    Savdo X
                </span>
            </div>
            <span class="text-gray-500 text-[12px]">Versiya: {{ appVersion }}</span>
        </div>
    </ion-footer>
</template>
