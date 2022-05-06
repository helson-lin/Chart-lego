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
			<component
				v-for="component in componentList"
				:key="component.uid"
				:id="component.uid"
				:class="['h-dragable']"
				v-model:value="component.value"
				:style="locationStyle(component.styleOption)"
				:is="component.type === 'chart' ? 'chart' : component.name"
				@contextmenu.prevent="openMenu"
				@click="chartClick($event, component.type)"
			></component>
		</div>
		<!-- <ContextMenu
			v-if="showContextMenu"
			:style="{
				left: contextMenuPos.offsetX + 'px',
				top: contextMenuPos.offsetY + 'px',
			}"
		/> -->
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
	h,
} from "vue";
import { notification, message } from "ant-design-vue";
import { SmileOutlined } from "@ant-design/icons-vue";
// import ContextMenu from "./ContextMenu.vue";
import Moveable from "moveable";
import { useStore } from "vuex";
import { DragNodeEvent } from "ant-design-vue/lib/vc-tree/interface";
import { decoratorsRender } from "../decorator/index";
import { locationStyle } from "@/hooks/useComponent";
import shortcuts from "@/hooks/useKeyBoard";
import {
	ChartOptionsProps,
	StyleOptionProps,
	ChartComponentProps,
} from "@/types/chart";
import Chart from "@/lib/chart";
import {
	EditorStyleProps,
	FvComponentBase,
	FvComponentList,
	StyleOption,
	DecoratorFactory,
} from "@/types/editor";
import { DecoratorOptionProps } from "@/types/decorator";
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
// 控制菜单显影
const showContextMenu = ref(false);
// 控制菜单定位
const contextMenuPos = ref({
	offsetX: 0,
	offsetY: 0,
});
const componentList = computed<FvComponentList>(() => {
	return store.state.editor.components;
});
const decoratorList = computed<DecoratorOptionProps[]>(() => {
	return store.state.editor.decorators;
});
const openMenu = (e: PointerEvent) => {
	const { offsetX, offsetY } = e;
	contextMenuPos.value.offsetX = offsetX;
	contextMenuPos.value.offsetY = offsetY;
	showContextMenu.value = !showContextMenu.value;
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
	const dragableArray: HTMLElement[] = Array.from(
		document.querySelectorAll(".h-dragable")
	);
	dragableArray.push(editorDom);
	moveable = new Moveable(editorDom, {
		target: targetElement, // 指定拖拽对象
		className: "dragable",
		edgeDraggable: false,
		draggable: true,
		dragArea: true,
		resizable: true,
		scalable: true,
		snappable: true, // 磁吸
		snapContainer: editorDom,
		snapThreshold: 20, // 磁吸效果触发的临界值,即元素与辅助线间距小于x,则自动贴边
		elementGuidelines: dragableArray, // 磁吸效果辅助线的dom列表
		isDisplaySnapDigit: true, // 是否展示与磁吸辅助线的距离,当moveable元素在磁吸参照元素之外时,moveable元素距离磁吸元素辅助线的虚线长度
		isDisplayInnerSnapDigit: true, // 是否展示与磁吸辅助线的距离,当moveable元素内部存在磁吸参照元素时,moveable元素距离磁吸元素辅助线的虚线长度
		renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"], //设置方向以显示控制框
		zoom: 1,
		origin: false,
		snapVertical: true,
		snapHorizontal: true,
		snapElement: true,
		snapGap: true,
		throttleDrag: 1,
		snapGridHeight: 10,
		snapGridWidth: 10,
		snapDistFormat: (v) => `${v}px`, // 修改举例标识
		rotatable: false,
		padding: { left: 0, top: 0, right: 0, bottom: 0 },
	});
	moveable
		.on("dragStart", ({ target, clientX, clientY }) => {
			console.log("onDragStart");
		})
		.on("drag", (el) => {
			const { left, top, transform, target, dist } = el;
			if (!target) return;
			// 这里的left top 需要计算 才可以用来提交数据
			const finalPostition: number[] = Object.assign([], dist);
			// console.log("demo", finalPostition);
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
	console.log(targetElement.id, "chartClick");
	store.commit("editor/setEditingComponent", {
		id: targetElement.id,
		type: type,
	});
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
/**
 * @description: 渲染数据list
 * @param {*}
 * @return {*}
 */
const renderByList = () => {
	const _chartComponentList: ChartComponentProps[] = [];
	componentList.value.forEach((component: FvComponentBase) => {
		if (component.type === "chart") {
			const chart = new Chart(component as ChartOptionsProps, true);
			const chartComponent: ChartComponentProps = { chart, uid: component.uid };
			_chartComponentList.push(chartComponent);
		}
	});
	chartComponentList.value = _chartComponentList;
};
/**
 * @description: 注册键盘事件
 */
const keyBoard = () => {
	// 注册control + 滚轮缩放
	shortcuts.register("control", (type) => {
		if (type === "keydown") {
			draggable.value = true;
		} else {
			draggable.value = false;
		}
	});
	// 注册DEL删除快捷键
	shortcuts.register("ctrl backspace", (type) => {
		if (type === "keyup") {
			store.commit("editor/removeEditingComponent");
			if (moveable) {
				targetElement = null;
				moveable.destroy();
				moveable = null;
			}
		}
	});
	// 注册复制快捷键
	shortcuts.register("ctrl c", (type) => {
		if (type === "keydown") return;
		console.warn("ctrl c", type);
		store.commit("editor/copyComponent");
		const id = store.state.editor.editingComponentId;
		const editingEl = document.getElementById(id);
		if (moveable && editingEl) {
			moveable.target = editingEl;
			// notification.info({
			// 	message: "操作提示",
			// 	description: "您已复制了组件，可以拖拽布局",
			// 	icon: () => h(SmileOutlined, { style: "color: #108ee9" }),
			// });
		}
	});
	// 快速设置层级
	shortcuts.register("ctrl -", (type) => {
		if (type === "keydown") return;
		console.warn("降低层级");
		store.commit("editor/setCompoentZindex", "down");
	});
	shortcuts.register("ctrl =", (type) => {
		if (type === "keydown") return;
		store.commit("editor/setCompoentZindex", "up");
		console.warn("提高层级");
	});
};
const drop = (e: DragEvent) => {
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
	console.log("dragover", e.target, e);
};
onMounted(() => {
	keyBoard();
	//dragListen();
});
// 实时渲染组件列表： 重复渲染问题存在
// 不同类型组件，走不同渲染方法
watchEffect(() => {
	if (componentList.value && componentList.value.length) {
		instance?.proxy?.$nextTick(() => {
			renderByList();
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
	box-sizing: content-box;
	&.drag-over {
		border: 2px dashed rgba(24, 144, 255, 0.7) !important;
	}
	:deep() .moveable-area {
		cursor: grabbing;
	}
	// 重写moveable样式
	:deep() .rCSwtyrwf .moveable-control {
		position: absolute;
		width: 15px;
		height: 15px;
		border-radius: 2px;
		// border: 2px solid #fff;
		box-sizing: border-box;
		background: $color-primary;
		margin-top: -7px;
		margin-left: -7px;
		z-index: 10;
		&.moveable-w {
			margin-left: -5px;
			width: 10px;
			height: 28px;
			border-radius: 7px;
		}
		&.moveable-n {
			margin-top: -5px;
			width: 28px;
			height: 10px;
			border-radius: 7px;
		}
		&.moveable-s {
			margin-top: -5px;
			width: 28px;
			height: 10px;
			border-radius: 7px;
		}
		&.moveable-e {
			margin-left: -5px;
			width: 10px;
			height: 28px;
			border-radius: 7px;
		}
	}
	:deep() .moveable-line {
		position: absolute;
		width: 2px;
		height: 2px;
		background: $color-primary;
		transform-origin: 0px 0.5px;
	}
}
.h-dragable {
	backdrop-filter: blur(12px);
	position: absolute;
	// cursor: pointer;
	box-sizing: content-box;
	&:hover {
		border: 1px solid $color-primary;
	}
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
