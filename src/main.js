import "./assets/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import App from "./App.vue";
import router from "./router";
import config from "./formkit.config.js";


const app = createApp(App).use(
  plugin,
  defaultConfig(config)
);

app.use(createPinia());
app.use(router);

app.mount("#app");
