/* eslint-disable @typescript-eslint/camelcase */
<template>
	<div class="editor-core" id="h-ed" :style="editorStyle">
		<div
			v-for="component in componentList"
			:class="['h-dragable']"
			:key="component.id"
			:id="component.id"
			:style="locationStyle(component.styleOption)"
		></div>
		<!-- <div
			:class="['h-dragable']"
			:style="chart.style"
			id="dragable"
			v-for="chart in list"
			:key="chart.id"
		>
			<iframe :src="chart.url" frameborder="0"></iframe>
		</div> -->
	</div>
</template>
<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	onMounted,
	computed,
	getCurrentInstance,
	ScriptHTMLAttributes,
	watchEffect,
} from "vue";
import Moveable from "moveable";
import Chart, { ChartOptionsProps, StyleOptionProps } from "@/lib/chart";
import { useStore } from "vuex";
import { ref } from "vue";
export interface ListItemProps {
	id: string;
	url: string;
}
export interface EditorStyleProps {
	width: number;
	height: number;
	background?: string;
	imgUrl?: string;
	customImgBack: boolean;
}
export interface ChartComponentProps {
	id: string;
	chart: Chart;
}
const instance = getCurrentInstance();
let targetElement: HTMLElement, moveable: Moveable;
const store = useStore();
const chartComponentList = ref<ChartComponentProps[] | null>(null);
const editorSettingStyle = computed<EditorStyleProps>(() => {
	return store.state.editor.style;
});
const editorStyle = computed(() => {
	const baseStyle = {
		width: `${editorSettingStyle.value.width}px`,
		height: `${editorSettingStyle.value.height}px`,
		background: editorSettingStyle.value.customImgBack
			? `url(${editorSettingStyle.value.imgUrl})`
			: editorSettingStyle.value.background,
	};
	return baseStyle;
});
const locationStyle = (style: StyleOptionProps) => {
	return {
		width: `${style.width}px`,
		height: `${style.height}px`,
		left: `${style.left}px`,
		top: `${style.top}px`,
		position: "absoulute",
	};
};
const componentList = computed<ChartOptionsProps[]>(() => {
	return store.state.editor.component;
});
const componentResize = (id: string) => {
	console.log("chartComponentList", chartComponentList.value);
	if (!chartComponentList.value) return;
	const currentCharts = chartComponentList.value.filter(
		(item) => item.id === id
	);
	if (currentCharts.length === 1) {
		currentCharts[0].chart.resize();
		console.log("resizeId", id, currentCharts[0].chart);
	}
};
const init = () => {
	const editorDom = document.getElementById("h-ed");
	if (!editorDom) return;
	moveable = new Moveable(editorDom, {
		target: targetElement,
		className: "dragable",
		draggable: true,
		dragArea: true,
		resizable: true,
		scalable: true,
		snappable: true,
		snapVertical: true,
		snapHorizontal: true,
		snapElement: true,
		snapGap: true,
		snapGridHeight: 5,
		snapGridWidth: 5,
		snapDistFormat: (v) => `${v}px`, // 修改举例标识
		rotatable: false,
		warpable: false,
		pinchable: true, // ["resizable", "scalable", "rotatable"]
		origin: false,
		keepRatio: true,
		edge: true,
		throttleDrag: 0,
		throttleResize: 0,
		throttleScale: 0,
		throttleRotate: 0,
	});
	moveable.edgeDraggable = true;
	const dragableArray = Array.from(document.querySelectorAll(".h-dragable"));
	dragableArray.push(editorDom);
	moveable.elementGuidelines = dragableArray;
	moveable.horizontalGuidelines = [100, 200, 500];
	moveable.verticalGuidelines = [100, 200, 500];
	moveable.isDisplayInnerSnapDigit = true;
	moveable.isDisplaySnapDigit = true;
	moveable
		.on("dragStart", ({ target, clientX, clientY }) => {
			console.log("onDragStart");
		})
		.on("drag", (el) => {
			const { left, top, transform, target } = el;
			console.log("onDrag left, top", left, top);
			if (!target) return;
			target!.style.left = `${left}px`;
			target!.style.top = `${top}px`;
			target!.style.transform = transform;
		})
		.on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
			console.log("onDragEnd", target, isDrag);
		});

	moveable
		.on("resizeStart", ({ target, clientX, clientY }) => {
			console.log("onResizeStart", target.id);
		})
		.on(
			"resize",
			({ target, width, height, dist, delta, clientX, clientY }) => {
				console.log("onResize", target.id);
				componentResize(target.id);
				delta[0] && (target!.style.width = `${width}px`);
				delta[1] && (target!.style.height = `${height}px`);
			}
		)
		.on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
			console.log("onResizeEnd", target, isDrag);
		});

	moveable
		.on("scaleStart", ({ target, clientX, clientY }) => {
			console.log("onScaleStart", target);
		})
		.on(
			"scale",
			({
				target,
				scale,
				dist,
				delta,
				transform,
				clientX,
				clientY,
			}: DragEventProps) => {
				console.log("onScale scale", transform);
				target!.style.transform = transform;
			}
		)
		.on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
			console.log("onScaleEnd", target, isDrag);
		});
};
const dragDivListener = () => {
	const dragDivs = document.getElementsByClassName("h-dragable");
	const dragLen = dragDivs.length;
	let i = 0;
	do {
		dragDivs[i].addEventListener("mouseenter", (event) => {
			const el = event.target as HTMLElement;
			let targetDom;
			if (el.classList.value.indexOf("h-dragable") === -1) {
				targetDom = el.parentElement;
			} else {
				targetDom = el;
			}
			if ((targetElement && targetElement === targetDom) || !targetDom) return;
			targetElement = targetDom;
			if (moveable) {
				moveable.destroy();
			}
			init();
		});
		i += 1;
	} while (i < dragLen);
};
const renderByList = () => {
	const _chartComponentList: ChartComponentProps[] = [];
	componentList.value.forEach((component) => {
		const chart = new Chart(component, true);
		const chartComponent: ChartComponentProps = { chart, id: component.id };
		_chartComponentList.push(chartComponent);
	});
	chartComponentList.value = _chartComponentList;
};
watchEffect(() => {
	if (componentList.value && componentList.value.length) {
		instance?.proxy?.$nextTick(() => {
			renderByList();
			dragDivListener();
		});
	}
});
</script>
<style lang="scss" scoped>
.editor-core {
	width: 100%;
	height: 100%;
	background: #333;
	position: relative;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	overflow: hidden;
}
.h-dragable {
	position: absolute;
	width: 400px;
	height: 300px;
}
.class2 {
	top: 420px;
	left: 20px;
}
.h-dragable {
	iframe {
		width: 100%;
		height: 100%;
	}
}
</style>
