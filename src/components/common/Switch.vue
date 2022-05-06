<template>
	<div
		class="switch"
		:style="{ '--open': checked ? '47.7%' : '6px' }"
		:data-value="checked ? checkedTxt : unCheckedTxt"
	>
		<span class="switch-item" @click="checkedChange(false)">{{
			unCheckedTxt
		}}</span>
		<span class="switch-item" @click="checkedChange(true)">{{
			checkedTxt
		}}</span>
	</div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
interface Props {
	checkedTxt: string;
	unCheckedTxt: string;
	checked: boolean;
}
defineProps<Props>();
const emits = defineEmits<{
	(e: "change", val: boolean): void;
}>();
const checkedChange = (val: boolean) => {
	emits("change", val);
};
</script>
<style lang="scss" scoped>
.switch {
	position: relative;
	width: 100%;
	height: 35px;
	box-sizing: border-box;
	display: flex;
	&::after {
		content: attr(data-value);
		display: block;
		position: absolute;
		left: var(--open);
		top: 3px;
		width: calc(100% / 2);
		text-align: center;
		line-height: 29px;
		height: 29px;
		background: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		transition: left ease 0.2s;
		cursor: pointer;
	}
	&-item {
		width: calc(100% / 2);
		height: 35px;
		padding: 0 6px;
		box-sizing: border-box;
		line-height: 35px;
		text-align: center;
		background: $background-color-c;
		cursor: pointer;
	}
}
</style>
