<template>
	<div class="fv-text" :style="computedsSyle">
		{{ value }}
	</div>
</template>
<script lang="ts" setup>
import { defineProps, widthDefaults, computed } from "vue";
import { Decorator, Font } from "@/types/decorator";
import { isValidKey } from "@/types/utils";
export interface FvTextProps {
	value: string;
	option: Decorator;
}
widthDefaults(defineProps<FvTextProps>(), {
	value: "FV_TEXT",
	option: () => {
		return {
			styleOption: {
				width: 300,
				height: 140,
			},
		};
	},
});
// const props = defineProps<FvTextProps>();
const computedsSyle = computed(() => {
	const { styleOption } = props.option;
	const { width, height, font, color } = styleOption;
	let baseStyle: { [key: string]: string | number } = {
		width: `${width}px`,
		height: `${height}px`,
	};
	if (color) {
		baseStyle.color = color;
	}
	if (font) {
		const keys = Object.keys(font);
		const fontStyle: Font = {};
		keys.forEach((k: string) => {
			// 校验key是不是font的key
			if (isValidKey(k, font)) fontStyle[k] = font[k];
		});
		baseStyle = Object.assign(baseStyle, fontStyle);
	}
	return baseStyle;
});
</script>
