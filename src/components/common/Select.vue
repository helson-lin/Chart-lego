<template>
	<div class="fv-select">
		<!-- Selected show 选中效果 -->
		<div
			:data-subfix="subfix"
			:style="{ '--show': !subfix ? 'none' : 'inline-block' }"
			@click="toggleStatus = !toggleStatus"
			:class="['selected', !data ? 'placeholder' : '']"
		>
			{{ data || placeholder || "请选择" }}
		</div>
		<!-- Select list 选择列表 -->
		<div class="select-list" v-if="toggleStatus">
			<div
				@click="choose(item[valueKey])"
				class="select-label"
				v-for="item in list"
				:key="item[valueKey]"
			>
				{{ item[label] }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, ref } from "vue";
interface SelectProps {
	data: string | null;
	valueKey: string | null;
	label: string | null;
	list: { [key: string]: string }[] | [];
	placeholder: string | null;
	subfix: string | null;
}
const props = withDefaults(defineProps<SelectProps>(), {
	data: null,
	list: undefined,
	valueKey: "value",
	label: "label",
	placeholder: "微软雅黑",
	subfix: null,
});
const emits = defineEmits<{
	(e: "update:data"): void;
}>();
const newId = () => {
	return Symbol();
};
const toggleStatus = ref(false);
const choose = (val: any) => {
	toggleStatus.value = !toggleStatus.value;
	emits("update:data", val);
};
</script>
<style lang="scss" scoped>
.fv-select {
	position: relative;
	width: 100%;
	height: 35px;
	margin-bottom: 20px;
	.selected {
		height: 35px;
		line-height: 35px;
		padding: 0 10px;
		box-sizing: border-box;
		text-align: left;
		color: $color-text-secondary;
		background: $background-color-c;
		cursor: pointer;
		&.placeholder {
			color: #c0c5ccbc;
		}
		&::after {
			position: absolute;
			right: 0;
			top: 0;
			padding: 0 10px;
			box-sizing: border-box;
			content: attr(data-subfix);
			display: var(--show);
			height: 35px;
			line-height: 35px;
			color: $color-text-secondary;
			background: $background-color-c;
			z-index: 2;
		}
	}
	.select-list {
		width: 100%;
		min-height: 70px;
		max-height: 105px;
		overflow-y: auto;
		position: absolute;
		top: 40px;
		left: 0;
		background: $background-color-c;
		box-shadow: $shadow-shallow;
		border-radius: 5px;
		z-index: 22;
		.select-label {
			width: 100%;
			padding: 0 10px;
			box-sizing: border-box;
			height: 35px;
			line-height: 35px;
			text-align: left;
			cursor: pointer;
			// border-bottom: 1px solid $color-grayBlack;
			&:nth-child(1) {
				border: none;
			}
		}
	}
}
</style>
