import "./assets/main.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import route from "./index";

const app = createApp(App);
app.use(route);
app.use(ElementPlus);
app.mount("#app");
