<template>
	<img class="fv-image" :src="value" />
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, computed } from "vue";
import { DecoratorStyleOptions } from "@/types/decorator";
export interface FvImageProps {
	value?: string;
	styleOption?: DecoratorStyleOptions;
}
const props = withDefaults(defineProps<FvImageProps>(), {
	value: "https:/pic.kblue.site/tab-l1.png",
	styleOption: () => {
		return {
			width: 300,
			height: 140,
			top: 0,
			left: 0,
		};
	},
});
</script>
