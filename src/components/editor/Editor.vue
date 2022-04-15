/* eslint-disable @typescript-eslint/camelcase */
<template>
	<div
		class="editor-core"
		id="h-ed"
		:draggable="draggable"
		:style="editorStyle"
	>
		<div
			v-for="component in componentList"
			:class="['h-dragable']"
			:key="component.id"
			:id="component.id"
			:style="locationStyle(component.styleOption)"
			@click="chartClick"
		></div>
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
	ref,
} from "vue";
import Moveable from "moveable";
import Chart from "@/lib/chart";
import {
	ChartOptionsProps,
	StyleOptionProps,
	ChartComponentProps,
} from "@/types/chart";
import { EditorStyleProps } from "@/types/editor";
import { useStore } from "vuex";
import { DragNodeEvent } from "ant-design-vue/lib/vc-tree/interface";
export interface ListItemProps {
	id: string;
	url: string;
}
const instance = getCurrentInstance();
const store = useStore();
// 正在执行编辑的对象
let targetElement: HTMLElement, moveable: Moveable | null;
// 画布是否可以拖拽
const draggable = ref(false);
// 编辑器图表组件
const chartComponentList = ref<ChartComponentProps[] | null>(null);
// 编辑器样式
const editorSettingStyle = computed<EditorStyleProps>(() => {
	return store.state.editor.style;
});
const componentList = computed<ChartOptionsProps[]>(() => {
	return store.state.editor.component;
});
// 编辑器style 实时修改
const editorStyle = computed(() => {
	const baseStyle = {
		width: `${editorSettingStyle.value.width}px`,
		height: `${editorSettingStyle.value.height}px`,
		background: editorSettingStyle.value.customImgBack
			? `url(${editorSettingStyle.value.imgUrl})`
			: editorSettingStyle.value.background,
		transform: `scale(${editorSettingStyle.value.resize / 100},${
			editorSettingStyle.value.resize / 100
		})`,
		border: !draggable.value ? "none" : "2px solid rgba(24, 144, 255, 0.7)",
		cursor: !draggable.value ? "auto" : "move",
	};
	return baseStyle;
});
// 图表组件的位置的大小样式信息
const locationStyle = (style: StyleOptionProps): { [key: string]: string } => {
	return {
		width: `${style.width}px`,
		height: `${style.height}px`,
		left: `${style.left}px`,
		top: `${style.top}px`,
		position: "absoulute",
	};
};
// 监听编辑器拖拽
const dragListen = () => {
	const editorDiv = document.getElementById("h-ed");
	if (!editorDiv) return;
	/* 拖动目标元素时触发drag事件 */
	editorDiv.addEventListener(
		"drag",
		function (event) {
			const { clientY, clientX, target } = event;
			if (!target) return;
			const { offsetLeft, offsetTop } = target as HTMLElement;
			const deltaLeft = clientX - offsetLeft;
			const deltaTop = clientY - offsetTop;
			console.log(
				" offsetX, offsetY",
				event,
				deltaLeft,
				deltaLeft,
				"---",
				offsetLeft,
				offsetTop
			);
		},
		false
	);

	editorDiv.addEventListener(
		"dragstart",
		function (event) {
			// 保存拖动元素的引用(ref.)
			if (!event.target) return;
			const dragge = event.target;
			//  (dragged as HTMLElement).style.opacity = 0.8;
			// // 使其半透明
			// event.target.style.opacity = 0.5;
		},
		false
	);

	editorDiv.addEventListener(
		"dragend",
		function (event) {
			// 重置透明度
			// event.target.style.opacity = "";
		},
		false
	);

	/* 放置目标元素时触发事件 */
	editorDiv.addEventListener(
		"dragover",
		function (event) {
			// 阻止默认动作以启用drop
			event.preventDefault();
		},
		false
	);
};
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
// 初始化拖拽插件
const init = () => {
	const editorDom = document.getElementById("h-ed");
	if (!editorDom) return;
	moveable = new Moveable(editorDom, {
		target: targetElement, // 指定拖拽对象
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
		.on("resize", (e) => {
			const { target, width, height, dist, delta, clientX, clientY } = e;
			console.log("onResize", target, e);
			componentResize(target.id);
			delta[0] && (target!.style.width = `${width}px`);
			delta[1] && (target!.style.height = `${height}px`);
		})
		.on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
			console.log("onResizeEnd", target, isDrag);
		});

	moveable
		.on("scaleStart", ({ target, clientX, clientY }) => {
			console.log("onScaleStart", target);
		})
		.on(
			"scale",
			({ target, scale, dist, delta, transform, clientX, clientY }) => {
				console.log("onScale scale", transform);
				target!.style.transform = transform;
			}
		)
		.on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
			console.log("onScaleEnd", target, isDrag);
		});
};
const judegNodeIsDragable = (e: HTMLElement) => {
	if (e.classList.value.indexOf("h-dragable") != -1) {
		return e;
	} else {
		if (!e.parentElement) throw new DOMException("No parent element");
		return judegNodeIsDragable(e.parentElement);
	}
};
const chartClick = (e) => {
	console.warn("e", e.target);
};
// 给图表组件增加点击事件实现切换拖拽对象
const dragDivListener = () => {
	const editorDiv = document.getElementById("h-ed");
	if (!editorDiv) return;
	editorDiv.addEventListener("click", (event) => {
		const el = event.target as HTMLElement;
		console.warn(el.classList, "/n", event.target);
		console.log("event", event);
		// const targetDom = judegNodeIsDragable(el);
		// console.log(targetDom);
		// if ((targetElement && targetElement === targetDom) || !targetDom) return;
		// targetElement = targetDom;
		// if (moveable) {
		// 	moveable.destroy();
		// }
		// init();
	});
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
/**
 * @description: 键盘keydown事件监听
 * @param: e: KeyboardEvent
 * @return: null
 */
const keydown = (e: KeyboardEvent) => {
	if (e.key === "Control") {
		draggable.value = true;
	}
};
/**
 * @description: 键盘keyup事件监听
 * @param: e: KeyboardEvent
 * @return: null
 */
const keyup = (e: KeyboardEvent) => {
	if (e.key === "Control") {
		draggable.value = false;
	}
};
// 监听键盘事件
const keyBoard = () => {
	window.addEventListener("keydown", keydown, false);
	window.addEventListener("keyup", keyup, false);
};
onMounted(() => {
	keyBoard();
	dragListen();
});
// 实时渲染组件列表： 重复渲染问题存在
watchEffect(() => {
	if (componentList.value && componentList.value.length) {
		instance?.proxy?.$nextTick(() => {
			renderByList();
			// dragDivListener();
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
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
	transform-origin: 50% 20%;
}
.h-dragable {
	width: 400px;
	height: 300px;
	background: #c6a6f3;
	background: rgba(106, 106, 106, 0.05);
	backdrop-filter: blur(12px);
	div,
	canvas {
		pointer-events: none !important;
	}
}
.class2 {
	top: 420px;
	left: 20px;
}
</style>
