<template>
	<div class="chart-list">
		<div
			class="chart-cop"
			v-for="chart in chartListData"
			:key="chart.id"
			@click="addToEditor(chart)"
		>
			<div class="chart-i" :id="`list-c-${chart.id}`"></div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed, getCurrentInstance, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { ChartOptionsProps, ChartComponentProps } from "@/types/chart";
import formatterChartOption, {
	ApiChartOption,
} from "@/utils/formatterChartOption";
import { renderByList } from "@/hooks/useChart";
import { getAllChart } from "@/interface/chart";
const store = useStore();
const instance = getCurrentInstance();
const chartListData = ref<ChartOptionsProps[]>();
const componentList = computed<ChartOptionsProps[]>(() => {
	return store.state.editor.component;
});
const getChartList = async () => {
	const res = await getAllChart();
	if (res.data && res.data.code === 0) {
		if (!res.data.data || res.data.data === undefined) return;
		chartListData.value = res.data.data.rows.map((Item: ApiChartOption) =>
			formatterChartOption.formatterChartOption(Item)
		);
	}
};
const addToEditor = (chart: ChartOptionsProps) => {
	const newComponetList = componentList.value || [];
	const chartWidthPosition = Object.assign({}, chart);
	chartWidthPosition.id = uuidv4(); // 新的id
	newComponetList.push(chartWidthPosition);
	store.commit("editor/setComponent", newComponetList);
	console.log(chart, "新增编辑器", chartWidthPosition);
};
onMounted(() => {
	getChartList();
});
watchEffect(() => {
	if (chartListData.value && chartListData.value.length) {
		instance?.proxy?.$nextTick(() => {
			if (!chartListData.value) return;
			renderByList(chartListData.value, "list-c-");
		});
	}
});
</script>
<style lang="scss" scoped>
.chart-list {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 20px 20px;
	box-sizing: border-box;
	overflow-y: auto;
}
.chart-cop {
	width: 100%;
	height: 240px;
	margin-bottom: 20px;
	pointer-events: none;
	border: 2px solid #eee;
	border-radius: 10px;
	cursor: pointer;
	pointer-events: all;
	.chart-i {
		width: 100%;
		height: 100%;
		cursor: pointer;
		pointer-events: none;
	}
}
</style>
