<template>
	<div class="fv-canvas">
		<div class="canvas-view" :style="editorStyle">
			<component
				class="chart"
				v-for="component in componentList"
				:key="component.uid"
				:id="`canvas${component.uid}`"
				:is="component.type === 'chart' ? 'chart' : component.name"
				:style="getComputedStyle(component.styleOption)"
			></component>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref, computed, watchEffect } from "vue";
import { getCanvasById } from "../interface/canvas";
import { renderByList } from "../hooks/useComponent";
import { ChartOptionsProps } from "@/types/chart";
import { StyleOption, DecoratorFactory } from "@/types/editor";
import formatterChartOption from "@/utils/formatterChartOption";
import { EditorStyleProps, FvComponentBase } from "@/types/editor";
import { message } from "ant-design-vue";
import { useRoute } from "vue-router";
const componentList = ref<FvComponentBase[]>();
const canvasStyle = ref<EditorStyleProps>();
const instance = getCurrentInstance();
const route = useRoute();
const getComputedStyle = (
	styleOption: StyleOption<DecoratorFactory | undefined>
) => {
	const style = {
		width: `${styleOption.width}px`,
		height: `${styleOption.height}px`,
		left: `${styleOption.left}px`,
		top: `${styleOption.top}px`,
		position: "absoulute",
	};
	if (styleOption.color) {
		style.color = styleOption.color;
	}
	return style;
};
const editorStyle = computed(() => {
	if (!canvasStyle.value) return "";
	const baseStyle = {
		width: `100%`,
		height: `${canvasStyle.value.height}px`,
		background: canvasStyle.value.customImgBack
			? `url(${canvasStyle.value.imgUrl})`
			: canvasStyle.value.background,
	};
	return baseStyle;
});
const getCanvas = async (uid: string) => {
	const res = await getCanvasById(uid);
	if (res.data.code === 0) {
		const { style, component, name } = res.data.data;
		const components = JSON.parse(component);
		(componentList.value as unknown) = components.map((item: any) => {
			const items = item;
			items.styleOption = JSON.parse(items.styleOption);
			if (item.type === "chart") {
				items.apiOption = JSON.parse(items.apiOption);
				items.renderFuc = formatterChartOption.execData(items.renderFuc);
			}
			return items;
		});
		canvasStyle.value = JSON.parse(style) as EditorStyleProps;
		document.title = "Fano View-视图：" + name;
		instance?.proxy?.$nextTick(() => {
			renderByList(componentList.value as ChartOptionsProps[], "canvas");
		});
		console.log("res", componentList.value);
	} else {
		message.warn(res.data.msg);
	}
};
watchEffect(() => {
	console.warn("route", route.query, route.params);
});
onMounted(() => {
	const params = route.params;
	console.log("query", params);
	if (params.uid) {
		getCanvas(params.uid);
	}
});
</script>
<style lang="scss" scoped>
.fv-canvas {
	width: 100%;
	height: 100vh;
	overflow: auto;
	@include scrollbar(10px, 10px);
	.canvas-view {
		position: relative;
	}
	.chart {
		position: absolute;
	}
}
</style>
