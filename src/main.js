import "./assets/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import App from "./App.vue";
import router from "./router";
import config from "./formkit.config.js";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";


const app = createApp(App).use(
  plugin,
  defaultConfig(config)
);

app.use(Toast, {
  // Setting the global default position
  position: POSITION.BOTTOM_LEFT
})
app.use(createPinia());
app.use(router);

app.mount("#app");
