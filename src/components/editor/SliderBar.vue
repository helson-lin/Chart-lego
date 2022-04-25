<template>
	<div class="slider-bar">
		<div
			:class="['slider-item', index === inx ? 'active' : '']"
			v-for="(item, inx) in list"
			:key="item.name"
			@click="emitIndex(inx)"
		>
			<component class="icon" :is="item.icon" />
			<span class="item-name">{{ item.name }}</span>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref, Component } from "vue";
import {
	BarChartOutlined,
	SlidersOutlined,
	CloudUploadOutlined,
} from "@ant-design/icons-vue";
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
const list = ref<{ name: string; icon: Component }[]>([
	{
		name: "图表",
		icon: BarChartOutlined,
	},
	{
		name: "装饰器",
		icon: SlidersOutlined,
	},
	{
		name: "素材",
		icon: CloudUploadOutlined,
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
	overflow: hidden;
	.slider-item {
		width: 100%;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
		cursor: pointer;
		&.active {
			color: $color-primary;
		}
		.item-name {
			font-size: 11px;
		}
	}
	.icon {
		width: 100%;
		font-size: 20px;
		cursor: pointer;
		padding: 5px 0;
		box-sizing: border-box;
	}
}
</style>
