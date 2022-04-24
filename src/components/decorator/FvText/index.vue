<template>
	<div class="fv-text fv-decorator" v-bind="$attrs" v-html="value"></div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, ref } from "vue";
import { DecoratorStyleOptions } from "@/types/decorator";
export interface FvTextProps {
	value: string;
	styleOption: DecoratorStyleOptions;
}
const emits = defineEmits<{
	(e: "update:value", val: string): void;
}>();
withDefaults(defineProps<FvTextProps>(), {
	value: "demo",
	styleOption: () => {
		return {
			width: 300,
			height: 140,
			top: 0,
			left: 0,
		};
	},
});
const disabled = ref<boolean>(true);
const inputChange = (e: Event) => {
	const el = e.target;
	if (!el) return;
	emits("update:value", el.value);
};
</script>
<style lang="scss" scoped>
.fv-text {
	padding: 5px 10px;
	box-sizing: border-box;
	text-align: center;
	line-height: 100%;
	border: none;
	resize: none;
}
</style>
