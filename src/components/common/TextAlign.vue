<template>
	<div class="fv-text-align">
		<div
			class="align"
			v-for="align in alignList"
			:key="align.value"
			:data-tooltip="align.tooltip"
		>
			<component
				:class="{ icon: true, active: data === align.value }"
				:is="align.name"
				@click="changeAlign(align.value)"
			>
			</component>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, ref } from "vue";
import {
	AlignRightOutlined,
	AlignCenterOutlined,
	AlignLeftOutlined,
} from "@ant-design/icons-vue";
type TextAlign = "left" | "center" | "right" | "justify";
interface TextAlignProps {
	data: TextAlign;
}
const emits = defineEmits<{
	(e: "update:data", val: TextAlign): void;
}>();
withDefaults(defineProps<TextAlignProps>(), {
	data: "left",
});
const alignList = ref<{ name: any; tooltip: string; value: TextAlign }[]>([
	{
		name: AlignLeftOutlined,
		tooltip: "左对齐",
		value: "left",
	},
	{
		name: AlignCenterOutlined,
		tooltip: "居中对齐",
		value: "center",
	},
	{
		name: AlignRightOutlined,
		tooltip: "右对齐",
		value: "right",
	},
]);
const changeAlign = (val: TextAlign) => {
	emits("update:data", val);
};
</script>
<style lang="scss" scoped>
.fv-text-align {
	width: 100%;
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	box-sizing: border-box;
	background: $background-color-c;
	margin-bottom: 20px;
	.align {
		position: relative;
		&:hover::after {
			top: -130%;
			right: 0;
			position: absolute;
			content: attr(data-tooltip);
			display: none;
			min-width: 70px;
			width: auto;
			text-align: center;
			padding: 0px 5px;
			height: 25px;
			line-height: 25px;
			color: $color-white;
			font-size: 14px;
			background: rgba(64, 64, 64, 0.5);
			z-index: 2024;
			border-radius: 5px;
		}
	}
	.icon {
		color: $color-text-secondary;
		font-size: 15px;
		cursor: pointer;
		&.active {
			color: $color-text-primary;
		}
	}
}
</style>
