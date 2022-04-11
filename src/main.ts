import { createApp } from "vue"
import Antd from "ant-design-vue"
import router from "./router"
import store from "./store/index"
import axios from "./lib/axios"
import App from "./App.vue"
import "codemirror/lib/codemirror.css"
import "ant-design-vue/dist/antd.css"
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$axios = axios
app.use(Antd).use(router).use(store)
const vm = app.mount("#app")
window.$vm = vm
