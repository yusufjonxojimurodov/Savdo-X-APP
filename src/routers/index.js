import { createRouter, createWebHistory } from "@ionic/vue-router";
import ProductView from "../pages/main/ProductView.vue";
import SmartPhoneView from "../pages/smartphones-page/SmartPhoneView.vue";
import WatchesView from "../pages/watches-page/WatchesView.vue";
import HeadphonesView from "../pages/headphones-page/HeadphonesView.vue";
import SettingView from "../pages/settings/SettingView.vue";
import ProductInfoView from "../pages/product-info/ProductInfoView.vue";
import ConfirmView from "../pages/confirm-page/ConfirmView.vue";
import HistoryProductView from "../pages/history/HistoryProductView.vue";

const routes = [
  {
    path: "/",
    name: "Mahsulotlar",
    component: ProductView,
  },
  {
    path: "/smartphone",
    name: "Telefonlar",
    component: SmartPhoneView,
  },
  {
    path: "/watches",
    name: "Soatlar",
    component: WatchesView,
  },
  {
    path: "/headphones",
    name: "Quloqchinlar",
    component: HeadphonesView,
  },
  {
    path: "/setting",
    name: "Sozlamalar",
    component: SettingView,
  },
  {
    path: "/product/information",
    name: "Mahsulot",
    component: ProductInfoView,
  },
  {
    path: "/confirm",
    name: "Mahsulotni Sotib olish",
    component: ConfirmView,
  },
  {
    path: "/pending/products",
    name: "Kutilayotgan Mahsulotlar",
    component: HistoryProductView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
