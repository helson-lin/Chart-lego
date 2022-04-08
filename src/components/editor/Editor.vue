<template>
	<div class="editor-core" id="h-ed" :style="editorStyle">
		<div
			:class="['h-dragable']"
			:style="chart.style"
			id="dragable"
			v-for="chart in list"
			:key="chart.id"
		>
			<iframe :src="chart.url" frameborder="0"></iframe>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, computed } from "vue"
import Moveable from "moveable"
import { useStore } from "vuex"
export interface ListItemProps {
	id: string
	url: string
}
export interface EditorStyleProps {
	width: number
	height: number
	background?: string
	imgUrl?: string
	customImgBack: boolean
}
let targetElement: HTMLElement, moveable: Moveable
const store = useStore()
const editorSettingStyle = computed<EditorStyleProps>(() => {
	return store.state.editor.style
})
const editorStyle = computed(() => {
	const baseStyle = {
		width: `${editorSettingStyle.value.width}px`,
		height: `${editorSettingStyle.value.height}px`,
		background: editorSettingStyle.value.customImgBack
			? `url(${editorSettingStyle.value.imgUrl})`
			: editorSettingStyle.value.background,
	}
	return baseStyle
})
const list = computed(() => {
	return store.state.editor.component
})
const init = () => {
	const editorDom = document.getElementById("h-ed")
	if (!editorDom) return
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
	})
	moveable.edgeDraggable = true
	const dragableArray = Array.from(document.querySelectorAll(".h-dragable"))
	dragableArray.push(editorDom)
	moveable.elementGuidelines = dragableArray
	moveable.horizontalGuidelines = [100, 200, 500]
	moveable.verticalGuidelines = [100, 200, 500]
	moveable.isDisplayInnerSnapDigit = true
	moveable.isDisplaySnapDigit = true
	moveable
		.on("dragStart", ({ target, clientX, clientY }) => {
			console.log("onDragStart")
		})
		.on("drag", (el) => {
			const { left, top, transform, target } = el
			console.log("onDrag left, top", el)
			target!.style.left = `${left}px`
			target!.style.top = `${top}px`
			target!.style.transform = transform
		})
		.on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
			console.log("onDragEnd", target, isDrag)
		})

	moveable
		.on("resizeStart", ({ target, clientX, clientY }) => {
			console.log("onResizeStart", target)
		})
		.on(
			"resize",
			({ target, width, height, dist, delta, clientX, clientY }) => {
				console.log("onResize", target)
				delta[0] && (target!.style.width = `${width}px`)
				delta[1] && (target!.style.height = `${height}px`)
			}
		)
		.on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
			console.log("onResizeEnd", target, isDrag)
		})

	moveable
		.on("scaleStart", ({ target, clientX, clientY }) => {
			console.log("onScaleStart", target)
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
				console.log("onScale scale", scale)
				target!.style.transform = transform
			}
		)
		.on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
			console.log("onScaleEnd", target, isDrag)
		})
}
const dragDivListener = () => {
	const dragDivs = document.getElementsByClassName("h-dragable")
	const dragLen = dragDivs.length
	let i = 0
	do {
		dragDivs[i].addEventListener("mouseenter", (event) => {
			const el = event.target as HTMLElement
			let targetDom
			if (el.classList.value.indexOf("h-dragable") === -1) {
				targetDom = el.parentElement
			} else {
				targetDom = el
			}
			if ((targetElement && targetElement === targetDom) || !targetDom) return
			targetElement = targetDom
			if (moveable) {
				moveable.destroy()
			}
			init()
		})
		i += 1
	} while (i < dragLen)
}
onMounted(() => {
	dragDivListener()
})
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
	background: #fff;
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
