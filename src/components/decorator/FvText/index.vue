<template>
	<div class="fv-text fv-decorator">
		{{ value }}
	</div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, computed } from "vue";
import { DecoratorStyleOptions, Font } from "@/types/decorator";
export interface FvTextProps {
	value: string;
	styleOption: DecoratorStyleOptions;
}
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
</script>
<style lang="scss" scoped>
.fv-text {
	padding: 5px 10px;
	box-sizing: border-box;
	text-align: center;
	line-height: 100%;
}
</style>
