<template>
	<div class="fv-text fv-decorator" v-bind="$attrs" v-html="value"></div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";
export interface FvTextProps {
	value: string;
}
withDefaults(defineProps<FvTextProps>(), {
	value: "文本组件",
});
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
