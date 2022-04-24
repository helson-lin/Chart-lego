<template>
	<div class="slider-bar">
		<div
			:class="['slider-item', index === inx ? 'active' : '']"
			v-for="(item, inx) in list"
			:key="item.name"
			@click="emitIndex(inx)"
		>
			<bar-chart-outlined class="icon" v-show="inx === 0" />
			<sliders-outlined class="icon" v-show="inx === 1" />
			<!-- <component class="icon" :is="item.icon" /> -->
			<span class="item-name">{{ item.name }}</span>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import { BarChartOutlined, SlidersOutlined } from "@ant-design/icons-vue";
interface Props {
	index: number;
}
defineProps<Props>();
const emit = defineEmits<{
	(e: "update:index", val: number): void;
}>();
const emitIndex = (index: number) => {
	emit("update:index", index);
};
const list = ref<{ name: string; icon: string }[]>([
	{
		name: "图表",
		icon: "BarChartOutlined",
	},
	{
		name: "装饰器",
		icon: "SlidersOutlined",
	},
]);
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
	box-sizing: border-box;
	border-right: 1px solid #ccc;
	.slider-item {
		width: 100%;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
		cursor: pointer;
		&.active {
			color: $color-primary;
			opacity: 0.9;
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
