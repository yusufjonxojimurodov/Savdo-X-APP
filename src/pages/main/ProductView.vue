<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import ProductComponent from './components/ProductComponent.vue';
import { IonPage, IonContent } from '@ionic/vue';
import FooterComponent from '../../components/FooterComponent.vue';
</script>

<template>
    <ion-page>
        <header-component />

        <ion-content>
            <product-component/>
        </ion-content>

        <footer-component />
    </ion-page>
</template>
