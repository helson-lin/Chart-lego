import { createApp } from "vue";
import Antd from "ant-design-vue";
import router from "./router";
import store from "./store/index";
import axios from "./lib/axios";
import App from "./App.vue";
import "codemirror/lib/codemirror.css";
import "ant-design-vue/dist/antd.css";
import * as Icons from "@ant-design/icons-vue";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import "@/style/setting/var.scss";
import "@/style/setting/decorator.scss";
import "@/utils/logVersion";
import FvDecorator from "@/components/decorator/install";
import FvChart from "@/components/common/Chart.vue";
const icons: any = Icons;
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.component("chart", FvChart);
app.use(Antd).use(FvDecorator).use(Vue3ColorPicker).use(router).use(store);
for (const i in icons) {
	app.component(i, icons[i]);
}
const vm = app.mount("#app");
window.$vm = vm;
