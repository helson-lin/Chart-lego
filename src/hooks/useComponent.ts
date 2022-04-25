import { computed, getCurrentInstance, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import Chart from "@/lib/chart/index";
import { ChartOptionsProps, ChartComponentProps } from "@/types/chart";
import { FvComponentBase, StyleOption, DecoratorFactory } from "@/types/editor";
// 图表组件实例Array
export const chartComponentList = ref<ChartComponentProps[] | null>(null);
/**
 * @description: 根据图表列表渲染图表组件
 */
export const renderByList = (
	componentList: FvComponentBase[],
	prefix: string
) => {
	const _chartComponentList: ChartComponentProps[] = [];
	componentList.forEach((component: FvComponentBase) => {
		if (component.type === "chart") {
			const chart = new Chart(component as ChartOptionsProps, true, prefix);
			const chartComponent: ChartComponentProps = { chart, uid: component.uid };
			_chartComponentList.push(chartComponent);
		}
	});
	chartComponentList.value = _chartComponentList;
};
/**
 * @description: 获取组件样式
 * @param {*}
 * @return {*}
 */
export const locationStyle = (
	options: StyleOption<DecoratorFactory>
): { [key: string]: unknown } => {
	const style: { [key: string]: unknown } = {
		width: `${options.width}px`,
		height: `${options.height}px`,
		left: `${options.left}px`,
		top: `${options.top}px`,
		position: "absoulute",
	};
	if (options.color) {
		style.color = options.color;
	}
	if (options.zIndex) {
		style.zIndex = options.zIndex;
	}
	if (options.font) {
		const { fontSize, fontFamily, fontWeight } = options.font;
		if (fontSize) style.fontSize = `${fontSize}px`;
		if (fontSize) style.fontHeight = `${fontSize + 10}px`;
		if (fontFamily) style.fontFamily = fontFamily;
		if (fontWeight) style.fontWeight = fontWeight;
	}
	if (options.textAlign) {
		style.textAlign = options.textAlign;
	}
	return style;
};
