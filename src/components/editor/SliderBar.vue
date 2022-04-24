<template>
	<div class="slider-bar">
		<div class="slider-item">
			<bar-chart-outlined class="icon" @click="emitIndex(0)" />
			<span class="item-name">图表</span>
		</div>
		<div class="slider-item">
			<sliders-outlined class="icon" @click="emitIndex(1)" />
			<span class="item-name">装饰器</span>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { BarChartOutlined, SlidersOutlined } from "@ant-design/icons-vue";
interface Props {
	index: number;
}
defineProps<Props>();
const emit = defineEmits<{
	(e: "update:index"): void;
}>();
const emitIndex = (index: number) => {
	emit("update:index", index);
};
</script>
<style lang="scss" scoped>
.slider-bar {
	width: 80px;
	height: 100%;
	background: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: center;
	padding: 10px 0;
	box-sizing: border-box;
	border-right: 1px solid #ccc;
	.slider-item {
		display: inline-flex;
		flex-direction: column;
		margin-bottom: 20px;
		&:hover {
			// background-color: rgba(127, 157, 213, 0.1);
			// padding: 0 5px;
			// box-sizing: border-box;
			// border-radius: 5px;
		}
		.item-name {
			font-size: 11px;
		}
	}
	.icon {
		font-size: 24px;
		cursor: pointer;
		padding: 5px 0;
	}
}
</style>
