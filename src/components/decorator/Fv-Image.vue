<template>
	<img class="fv-image" :style="computedsSyle" :src="value" />
</template>
<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { Decorator } from "@/types/decorator";
export interface FvImageProps {
	value: string;
	option: Decorator;
}
const props = defineProps<FvImageProps>();
const computedsSyle = computed(() => {
	const { styleOption } = props.option;
	const { width, height } = styleOption;
	const baseStyle: { [key: string]: string | number } = {
		width: `${width}px`,
		height: `${height}px`,
	};
	return baseStyle;
});
</script>
