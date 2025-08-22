import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/main.css";
import App from "./App.vue";
import router from "./routers";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import "@ionic/vue/css/core.css";
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

import { IonicVue } from "@ionic/vue";

const app = createApp(App);

app.use(createPinia());
app.use(IonicVue);
app.use(router);
app.use(Antd);
app.mount("#app");
