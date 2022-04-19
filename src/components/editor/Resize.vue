<template>
	<div
		class="resize"
		:style="{
			'--dhc':
				size === 10 ? 'rgba(230, 126, 34, 0.1)' : 'rgba(127, 157, 213, 0.1)',
		}"
	>
		<div class="ico d" @click="decrease(5)">
			<minus-outlined />
		</div>
		<div class="size">
			<span>{{ size }}%</span>
		</div>
		<div class="ico i" @click="increase(5)">
			<plus-outlined />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { MinusOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
const name = "Resize";
const size = ref(10); // 缩放百分比
const store = useStore();
watchEffect(() => {
	if (store.state.editor.style.resize) {
		size.value = store.state.editor.style.resize || 10;
	}
});
const parse2Num = (num: number) => {
	console.log("num", num);
	const int = (num / 10).toFixed(1);
	return num;
};
/**
 * @description: 增加
 * @param {*} step
 * @return {*}
 */
const increase = (step = 5) => {
	size.value = size.value + step;
	store.commit("editor/setEditorStyleSize", size.value);
};
/**
 * @description: 减少
 * @param {*} step
 * @return {*}
 */
const decrease = (step = 5) => {
	if (size.value === 10) {
		return;
	}
	size.value = size.value - step;
	if (size.value - step < 10) {
		size.value = 10;
	}
	store.commit("editor/setEditorStyleSize", size.value);
};
const handleScroll = (e: WheelEvent) => {
	// 判断是不是按下ctrl键
	if (e.ctrlKey) {
		// 取消浏览器默认的放大缩小网页行为
		e.preventDefault();
		// 判断是向上滚动还是向下滚动
		if (e.deltaY > 0) {
			console.log(" 放大重写，业务代码", e);
			increase(1);
			// 放大重写，业务代码
		} else {
			decrease(1);
			console.log(" 缩小重写，业务代码");
			// 缩小重写，业务代码
		}
	}
};
onMounted(() => {
	window.addEventListener("mousewheel", handleScroll, { passive: false });
});
</script>
<style lang="scss" scoped>
.resize {
	display: flex;
	background: rgba(255, 255, 255, 1);
	padding: 5px;
	backdrop-filter: blur(12px);
	.ico {
		width: 30px;
		text-align: center;
		color: #000;
		line-height: 30px;
		text-align: center;
		.anticon {
			cursor: pointer;
		}
		&.d {
			&:hover {
				background-color: var(--dhc);
				border-radius: 5px;
			}
		}
		&.i {
			&:hover {
				background-color: rgba(127, 157, 213, 0.1);
				border-radius: 10px;
			}
		}
	}
	.size {
		width: 60px;
		height: 30px;
		user-select: none;
		// display: flex;
		text-align: center;
		&:hover {
			background-color: rgba(127, 157, 213, 0.1);
			border-radius: 5px;
		}
		span {
			line-height: 30px;
			text-align: right;
			font-size: 16px;
			font-weight: bold;
			color: #000;
			font-family: Arial, Helvetica, sans-serif;
		}
	}
}
</style>
