<script setup>
import { ref } from "vue";
import useSetting from "../stores/settings.pinia";
import IconPlus from "./icons/IconPlus.vue";

const props = defineProps({
    open: Boolean
})

const emit = defineEmits(["close"])

const settingStore = useSetting();
const fileList = ref([]);

const handleUpload = async ({ file, onError }) => {
    try {
        await settingStore.postUserAvatar(file);
        fileList.value = []
        emit("close")
    } catch (err) {
        console.error("Upload error:", err);
        onError(err);
    }
};
</script>

<template>
    <a-modal title="Profile yuklash" :open="props.open" @cancel="emit('close')" footer="">
        <a-upload v-model:file-list="fileList" :custom-request="handleUpload" list-type="picture-card">
            <div v-if="fileList.length < 1" class="!flex justify-center items-center gap-1 flex-col">
                <icon-plus />
                <p>Rasm yuklash</p>
            </div>
        </a-upload>
    </a-modal>
</template>
