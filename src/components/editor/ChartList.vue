<template>
	<div class="chart-list">
		<div class="loading" v-if="loading">
			<a-spin :indicator="indicator" :spinning="loading" tip="Loading...">
			</a-spin>
		</div>
		<div
			class="chart-cop"
			v-for="chart in chartListData"
			:key="chart.uid"
			@click="addToEditor(chart)"
		>
			<img class="chart-i" :src="chart.img || ''" :alt="chart.name" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, h } from "vue";
import lodash from "lodash";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { ChartOptionsProps } from "@/types/chart";
import formatterChartOption, {
	ApiChartOption,
} from "@/utils/formatterChartOption";
import { getAllChart } from "@/interface/chart";
const store = useStore();
const loading = ref(true);
const chartListData = ref<ChartOptionsProps[]>();
/**
 * @description: 设置加载loading
 */
const indicator = h(LoadingOutlined, {
	style: {
		fontSize: "28px",
		color: "#1f94ff",
	},
	spin: true,
});
/**
 * @description: 获取图表列表
 * @param {*}
 * @return {*}
 */
const getChartList = async () => {
	const res = await getAllChart();
	if (res.data && res.data.code === 0) {
		if (!res.data.data || res.data.data === undefined) return;
		chartListData.value = res.data.data.rows.map((Item: ApiChartOption) =>
			formatterChartOption.formatterChartOption(Item)
		);
		loading.value = false;
	}
};
/**
 * @description: 新增图表到编辑器
 * @param {*} chart
 * @return {*}
 */
const addToEditor = (chart: ChartOptionsProps) => {
	const chartWidthPosition = lodash.cloneDeep(chart);
	chartWidthPosition.uid = uuidv4(); // 新的id
	store.commit("editor/addComponent", { ...chartWidthPosition, type: "chart" });
};
onMounted(() => {
	getChartList();
});
</script>
<style lang="scss" scoped>
.chart-list {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 20px 20px;
	box-sizing: border-box;
	overflow-y: scroll;
	user-select: none;
	@include scrollbar(10px, 15px);
	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
.chart-cop {
	width: 100%;
	min-height: 140px;
	overflow-y: hidden;
	margin-bottom: 20px;
	pointer-events: none;
	border: 2px solid #eee;
	box-shadow: 10px 15px 40px 0px rgba(55, 79, 226, 0.1);
	border-radius: 5px;
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
