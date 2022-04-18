import { computed, getCurrentInstance, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import Chart from "@/lib/chart/index";
import { ChartOptionsProps, ChartComponentProps } from "@/types/chart";

const store = useStore();
// 图表组件实例Array
export const chartComponentList = ref<ChartComponentProps[] | null>(null);
/**
 * @description: 根据图表列表渲染图表组件
 */
export const renderByList = (
	componentList: ChartOptionsProps[],
	prefix: string
) => {
	const _chartComponentList: ChartComponentProps[] = [];
	componentList.forEach((component) => {
		const chart = new Chart(component, true, prefix);
		const chartComponent: ChartComponentProps = { chart, uid: component.uid };
		_chartComponentList.push(chartComponent);
	});
	chartComponentList.value = _chartComponentList;
};
