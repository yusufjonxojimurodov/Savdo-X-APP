<script setup>
import { ref } from 'vue';
import IconHappy from './icons/IconHappy.vue';
import IconSad from './icons/IconSad.vue';
import useComments from '../stores/comment.pinia';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import IconSend from './icons/IconSend.vue';
import LoginModalComponent from '../pages/auth/LoginModalComponent.vue';
import useUser from '../stores/user.pinia';

const userStore = useUser()
const commentStore = useComments()
const route = useRoute()
const productId = route.query.id
const registerModalRef = ref()

const isFocused = ref(false)
const comment = ref("")
const rating = ref(null)

function selectRating(value) {
    rating.value = value
}

async function createComment() {
    if (!userStore.user) {
        registerModalRef.value?.open();
        return;
    } else {
        if (!comment.value.trim()) return message.warn("Fikringizni yozing !")
        if (!rating.value) return message.warn("Bahoyingizni qo'ying")

        const form = {
            productId: productId,
            text: comment.value,
            rating: rating.value
        }

        await commentStore.createComment(form)
        commentStore.getComments(productId)
        comment.value = "",
            rating.value = null
        isFocused.value = false
    }
}
</script>

<template>
    <login-modal-component ref="registerModalRef" />
    <div :style="{ height: isFocused ? '150px' : '100px' }" class="container_chat_bot">
        <div class="tags">
            <a-button @focus="isFocused = true" @blur="isFocused = false" @click="selectRating('happy')" size="small"
                type="primary" :class="{ 'inactive': rating && rating !== 'happy' }">
                <icon-happy class="like-svg" />
            </a-button>

            <a-button @focus="isFocused = true" @blur="isFocused = false" @click="selectRating('unhappy')" size="small"
                danger type="primary" :class="{ 'inactive': rating && rating !== 'unhappy' }">
                <icon-sad class="sad-svg" />
            </a-button>
        </div>
        <div class="container-chat-options">
            <div class="chat">
                <div class="chat-bot">
                    <textarea @keyup.enter.exact.prevent="createComment" @keyup.shift.enter.stop maxlength="250"
                        :style="{ height: isFocused ? '150px' : '80px' }" v-model="comment" @focus="isFocused = true"
                        @blur="isFocused = false" id="chat_bot" name="chat_bot"
                        placeholder="Fikringizni yozing...✦˚"></textarea>
                </div>

                <a-button @click="createComment" type="primary" class="!absolute right-2 bottom-2 !m-0 !p-0 !flex !justify-center !items-center !rounded-4xl"
                    :loading="commentStore.createLoader" @focus="isFocused = true" @blur="isFocused = false">
                    <template #icon>
                        <icon-send />
                    </template>
                </a-button>
            </div>
        </div>
    </div>
</template>

<style>
.sad-svg {
    path {
        fill: white !important;
    }
}

.like-svg {
    path {
        fill: white !important;
    }
}

.inactive {
    opacity: 0.2 !important;
}
</style>