<script setup>
import {
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonMenuButton,
} from '@ionic/vue';
import useQueryParams from '../utils/helpers/use.query.params';
import ProfileComponent from './ProfileComponent.vue';
import { debounce } from "../utils/helpers/debounce.js"

const { setQueries } = useQueryParams()

const searchProduct = debounce((e) => {
    const value = e.target?.value
    setQueries({
        search: value?.trim() || undefined
    }, { saveHistory: false })
}, 500)
</script>

<template>
    <div class="Test" id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <div class="flex justify-between items-center !w-full">
                    <a-input @input="searchProduct" placeholder="Mahsulot qidiring..." class="input-search !w-[75%]"
                        size="large" />
                    <profile-component />
                </div>
            </ion-toolbar>
        </ion-header>
    </div>
</template>

<style scoped>
ion-searchbar.custom {
    --background: #183b74;
    --color: #fff;
    --placeholder-color: #fff;
    --icon-color: #fff;
    --clear-button-color: #fff;
    --border-radius: 4px;
    --box-shadow: none !important;
}

.input-search {
    color: white !important;
    background-color: #183b74 !important;
    border: none;
}

.input-search::placeholder {
    color: #fff !important;
}

ion-searchbar.md.custom {
    --cancel-button-color: #fff;
}

ion-toolbar {
    --background: #183b74 !important;
    --color: #fdf5e6;
}

ion-content {
    height: 100dvh;
}

ion-avatar {
    margin-right: 10px;
    margin-top: 10px;
    width: 40px;
}
</style>