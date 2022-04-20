/* eslint-disable @typescript-eslint/camelcase */
<template>
	<div class="editor-canvas">
		<div
			class="editor-core"
			id="h-ed"
			:draggable="draggable"
			:style="editorStyle"
			@click="canvasClick"
			@contextmenu.prevent
			@drop="drop"
			@dragover="dragover"
			@dragenter="dragenter"
			@dragleave="dragleave"
		>
			<div
				v-for="component in componentList"
				:class="['h-dragable', 'h-chart']"
				:key="component.uid"
				:id="component.uid"
				:style="locationStyle(component.styleOption)"
				@contextmenu.prevent="openMenu($event, item)"
				@click="chartClick"
			></div>
			<component
				v-for="decorator in decoratorList"
				:key="decorator.uid"
				:id="decorator.uid"
				:class="['h-dragable']"
				v-model:value="decorator.value"
				:style="decoratorStyle(decorator.styleOption)"
				:is="decorator.name"
				@contextmenu.prevent="openMenu($event, decorator.uid)"
				@click="chartClick($event, 'decorator')"
			></component>
		</div>
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
import ContextMenu from "./ContextMenu.vue";
import Moveable from "moveable";
import { useStore } from "vuex";
import { DragNodeEvent } from "ant-design-vue/lib/vc-tree/interface";
import { decoratorsRender } from "../decorator/index";
import {
	ChartOptionsProps,
	StyleOptionProps,
	ChartComponentProps,
} from "@/types/chart";
import Chart from "@/lib/chart";
import { EditorStyleProps } from "@/types/editor";
import { DecoratorOptionProps, DecoratorStyleOptions } from "@/types/decorator";
export interface ListItemProps {
	id: string;
	url: string;
}
const instance = getCurrentInstance();
const store = useStore();
// 正在执行编辑的对象
let targetElement: HTMLElement | null, moveable: Moveable | null;
// 画布是否可以拖拽
const draggable = ref(false);
// 编辑器图表组件
const chartComponentList = ref<ChartComponentProps[] | null>(null);
// 编辑器样式
const editorSettingStyle = computed<EditorStyleProps>(() => {
	return store.state.editor.style;
});
const menuTo = ref("#h-ed");
const componentList = computed<ChartOptionsProps[]>(() => {
	return store.state.editor.component;
});
const decoratorList = computed<DecoratorOptionProps[]>(() => {
	return store.state.editor.decorators;
});
const openMenu = (e: Event, id: string) => {
	menuTo.value = "#" + id;
};
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
	console.log(style);
	return {
		width: `${style.width}px`,
		height: `${style.height}px`,
		left: `${style.left}px`,
		top: `${style.top}px`,
		position: "absoulute",
	};
};
const decoratorStyle = (options: DecoratorStyleOptions) => {
	if (!options) return {};
	const style: { [key: string]: string | number } = {
		// width: `${options.width}px`,
		// height: `${options.height}px`,
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
		if (fontFamily) style.fontFamily = fontFamily;
		if (fontWeight) style.fontWeight = fontWeight;
	}
	return style;
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
const componentResize = (uid: string) => {
	console.log("chartComponentList", chartComponentList.value);
	if (!chartComponentList.value) return;
	const currentCharts = chartComponentList.value.filter(
		(item) => item.uid === uid
	);
	if (currentCharts.length === 1) {
		currentCharts[0].chart.resize();
		console.log("resizeId", uid, currentCharts[0].chart);
	}
};
// 初始化拖拽插件
const init = () => {
	const editorDom = document.getElementById("h-ed");
	if (!editorDom) return;
	moveable = new Moveable(editorDom, {
		target: targetElement, // 指定拖拽对象
		className: "dragable",
		snapContainer: editorDom,
		snapThreshold: 20,
		draggable: true,
		dragArea: true,
		resizable: true,
		scalable: true,
		snappable: true,
		snapVertical: true,
		zoom: 1,
		snapHorizontal: true,
		snapElement: true,
		snapGap: true,
		snapGridHeight: 10,
		snapGridWidth: 10,
		snapDistFormat: (v) => `${v}px`, // 修改举例标识
		rotatable: false,
		warpable: false,
		pinchable: true, // ["resizable", "scalable", "rotatable"]
		origin: false,
		keepRatio: true,
		edge: true,
		padding: { left: 0, top: 0, right: 0, bottom: 0 },
		// bounds: editorDom.getBoundingClientRect(),
		// innerBounds: editorDom.getBoundingClientRect(),
		throttleDrag: 0,
		throttleResize: 0,
		throttleScale: 0,
		throttleRotate: 0,
	});
	moveable.edgeDraggable = true;
	const dragableArray: HTMLElement[] = Array.from(
		document.querySelectorAll(".h-dragable")
	);
	dragableArray.push(editorDom);
	moveable.elementGuidelines = dragableArray;
	moveable.horizontalGuidelines = [100, 200, 300, 400, 500];
	moveable.verticalGuidelines = [100, 200, 300, 400, 500];
	moveable.isDisplayInnerSnapDigit = true;
	moveable.isDisplaySnapDigit = true;
	moveable
		.on("dragStart", ({ target, clientX, clientY }) => {
			console.log("onDragStart");
		})
		.on("drag", (el) => {
			const { left, top, transform, target, dist } = el;
			console.log("onDrag left, top", left, top, el);
			if (!target) return;
			// 这里的left top 需要计算 才可以用来提交数据
			const finalPostition: number[] = Object.assign([], dist);
			console.log("demo", finalPostition);
			store.commit("editor/setComponentTl", {
				uid: target.id,
				left: left,
				top,
				distLt: finalPostition,
			});
			(target as HTMLElement).style.left = `${left}px`;
			(target as HTMLElement).style.top = `${top}px`;
		})
		.on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
			console.log("onDragEnd", target, isDrag);
		});

	moveable
		.on("resizeStart", ({ target, clientX, clientY }) => {
			console.log("onResizeStart", target.id);
		})
		.on("resize", (e) => {
			const { target, width, height, delta } = e;
			console.log("onResize", target.id, width, height);
			// 图表缩放
			componentResize(target.id);
			store.commit("editor/setCompoentWh", { uid: target.id, width, height });
			delta[0] && ((target as HTMLElement).style.width = `${width}px`);
			delta[1] && ((target as HTMLElement).style.height = `${height}px`);
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
const judegNodeIsDragable = (e: HTMLElement): HTMLElement => {
	if (e.classList.value.indexOf("h-dragable") != -1) {
		return e;
	} else {
		if (!e.parentElement) throw new DOMException("No parent element");
		return judegNodeIsDragable(e.parentElement);
	}
};
const chartClick = (e: Event, type = "chart") => {
	const el = e.target as HTMLElement;
	const targetDom = judegNodeIsDragable(el);
	if ((targetElement && targetElement === targetDom) || !targetDom) return;
	targetElement = targetDom;
	console.warn("chartClick", targetElement.id, type);
	store.commit("editor/setEditingComponent", { id: targetElement.id, type });
	if (moveable) {
		moveable.destroy();
	}
	init();
};
const canvasClick = (e: Event) => {
	const el = e.target as HTMLElement;
	if (el.classList.value.indexOf("editor-core") !== -1) {
		if (moveable) {
			store.commit("editor/setEditingComponent", { id: null, type: null });
			targetElement = null;
			moveable.destroy();
			moveable = null;
		}
	}
};
// 给图表组件增加点击事件实现切换拖拽对象
const dragDivListener = () => {
	const editorDiv = document.getElementById("h-ed");
	if (!editorDiv) return;
	editorDiv.addEventListener("click", (event) => {
		const el = event.target as HTMLElement;
		console.warn(el.classList, "/n", event.target);
		const targetDom = judegNodeIsDragable(el);
		console.log(targetDom, "targetDom");
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
		console.warn("渲染", component);
		const chart = new Chart(component, true);
		const chartComponent: ChartComponentProps = { chart, uid: component.uid };
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
const drop = (e: DropEvent) => {
	const el = e.target;
	(el as HTMLElement).className = (el as HTMLElement).className.replace(
		" drag-over",
		""
	);
};
const dragenter = (e: DragEvent) => {
	e.preventDefault();
	const el = e.target;
	(el as HTMLElement).className += " drag-over";
	// this.className += " drag-over";
	console.log("dragenter", el);
};
const dragleave = (e: DragEvent) => {
	const el = e.target;
	(el as HTMLElement).className = (el as HTMLElement).className.replace(
		" drag-over",
		""
	);
	console.log("dragleave");
};
const dragover = (e: DragEvent) => {
	e.preventDefault();
	console.log("dragover", e.target);
};
onMounted(() => {
	keyBoard();
	dragListen();
});
// 实时渲染组件列表： 重复渲染问题存在
// 不同类型组件，走不同渲染方法
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
.editor-canvas {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	height: 100%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
}
.editor-core {
	width: 100%;
	height: 100%;
	background: #333;
	position: relative;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	transform-origin: 50% 20%;
	overflow: hidden;
	&.drag-over {
		border: 2px dashed rgba(24, 144, 255, 0.7) !important;
	}
	:deep() .moveable-area {
		cursor: grabbing;
	}
}
.h-dragable {
	backdrop-filter: blur(12px);
	position: absolute;
	cursor: pointer;
	&.h-chart {
		width: 400px;
		height: 300px;
	}
	:deep() div {
		pointer-events: none !important;
	}
	div,
	:deep() canvas {
		pointer-events: none !important;
		cursor: pointer;
	}
}
.class2 {
	top: 420px;
	left: 20px;
}
</style>
