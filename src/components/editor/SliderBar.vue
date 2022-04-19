<template>
	<div class="slider-bar">
		<bar-chart-outlined class="icon" @click="emitIndex(0)" />
		<sliders-outlined class="icon" @click="emitIndex(1)" />
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
	width: 60px;
	height: 100%;
	background: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: center;
	padding: 10px 0;
	box-sizing: border-box;
	border-right: 1px solid #ccc;
	.icon {
		font-size: 24px;
		margin-bottom: 20px;
		cursor: pointer;
		padding: 5px 0;
		&:hover {
			background-color: rgba(127, 157, 213, 0.1);
			padding: 5px;
			box-sizing: border-box;
			border-radius: 5px;
		}
	}
}
</style>
