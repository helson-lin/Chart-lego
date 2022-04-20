import { App } from "vue";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
export default {
	install(Vue: App<Element>) {
		const files = require.context("./", true, /.vue$/);
		files.keys().forEach(async (key: string) => {
			const name = path.dirname(key).slice(2); //返回文件名 不含后缀名
			const componet = files(key).default;
			Vue.component(name, componet);
		});
	},
};
