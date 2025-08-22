<script setup>
import useComments from '../stores/comment.pinia';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ref } from 'vue';
import SendMessageComponent from './SendMessageComponent.vue';

dayjs.extend(utc);
dayjs.extend(timezone);

const commentStore = useComments();
const text = ref('');

const formatUzbTime = (isoTime) => {
    return dayjs(isoTime).tz('Asia/Tashkent').format('DD-MMMM HH:mm');
};
</script>

<template>
    <div class="container">
        <div class="flex flex-col items-center gap-4 !mb-15">
            <div v-if="!commentStore.comments.length == ''"
                class="w-full !max-w-4xl max-h-[350px] overflow-y-auto shadow-lg !rounded-2xl !p-4 flex flex-col gap-4">
                <div v-for="comment in commentStore.comments" :key="comment._id"
                    class="flex flex-col gap-2 !p-4 !rounded-xl border border-gray-200">
                    <div class="flex justify-between items-center">
                        <p class="text-sm font-semibold text-gray-700">
                            {{ comment.userId.name }} {{ comment.userId.surname }}
                        </p>
                        <p class="text-xs text-gray-500">
                            {{ formatUzbTime(comment.createdAt) }}
                        </p>
                    </div>

                    <p class="text-gray-800 text-base mt-2">{{ comment.text }}</p>

                    <p class="text-right mt-2 text-sm font-medium"
                        :class="comment.rating === 'happy' ? 'text-green-600' : 'text-red-600'">
                        {{ comment.rating === 'happy' ? 'Mijoz mahsulotdan xursand' : 'Mijoz mahsulotdan xafa' }}
                    </p>
                </div>
            </div>

            <send-message-component />
        </div>

        <a-empty v-if="!commentStore.loader && commentStore.comments.length === 0" description=""
            class="relative top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 !mb-12">
            <template #image>
                <img class="!w-[100%] !h-[250px]" src="/src/assets/images/noComment.png" alt="no data" />
            </template>
        </a-empty>
    </div>
</template>
