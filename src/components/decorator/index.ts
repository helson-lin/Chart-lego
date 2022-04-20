import { createApp, defineAsyncComponent } from "vue";
import { DecoratorStyleOptions, DecoratorOptionProps } from "@/types/decorator";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
export function decoratorsRender(
	id: string,
	name: string,
	option?: { [key: string]: string }
) {
	const componentWillMount = defineAsyncComponent(
		() => import(`./${name}/index.vue`)
	);
	let fvComponent;
	if (!option) {
		fvComponent = createApp(componentWillMount);
	} else {
		fvComponent = createApp(componentWillMount, option);
	}
	const mountDom = document.getElementById(id);
	if (!mountDom) throw new Error("will mount id dom can't be find");
	fvComponent.mount(mountDom);
}
/**
 * @description: 获取所有的装饰器组件的组件名称和默认配置
 */
export const getComponetsName = () => {
	const files = require.context("./", true, /.vue$/);
	const componets: DecoratorOptionProps[] = [];
	files.keys().forEach(async (key: string) => {
		const name = path.dirname(key).slice(2); //返回文件名 不含后缀名
		const defaultOption = await import(`${path.dirname(key)}/option`);
		const { value, styleOption, type } = defaultOption.default;
		componets.push({
			uid: uuidv4(),
			name: name,
			type: type,
			value: value as string | number | boolean,
			styleOption: styleOption as DecoratorStyleOptions,
		});
	});
	return componets;
};
