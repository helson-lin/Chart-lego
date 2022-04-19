import { createApp, defineAsyncComponent } from "vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
export function decoratorsRender(
	id: string,
	name: string,
	option: { [key: string]: string }
) {
	const componentWillMount = defineAsyncComponent(
		() => import(`./${name}.vue`)
	);
	const fvComponent = createApp(componentWillMount, option);
	const mountDom = document.getElementById(id);
	if (!mountDom) throw new Error("will mount id dom can't be find");
	fvComponent.mount(mountDom);
}
export const getComponetsName = (): string[] => {
	const files = require.context("./", false, /.vue$/);
	const componets: string[] = [];
	files.keys().forEach((key: string) => {
		const name = path.basename(key, ".vue"); //返回文件名 不含后缀名
		componets.push(name);
	});
	return componets;
};
