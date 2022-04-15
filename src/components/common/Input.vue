<template>
	<div
		class="fv-input"
		:data-subfix="subfix"
		:style="{ '--show': !subfix ? 'none' : 'inline-block' }"
	>
		<input v-bind="$attrs" :value="data" @change="emitChange" />
	</div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
	data: {
		type: [String, Number],
		default: "",
	},
	subfix: {
		type: String,
		required: true,
		default: () => "",
	},
});
const emits = defineEmits<{
	(e: "update:data"): void;
}>();
const emitChange = (e: InputEvent) => {
	const el = e.target;
	if (!el) return;
	emits("update:data", el.value);
};
</script>
<style lang="scss" scoped>
.fv-input {
	position: relative;
	height: 35px;
	box-sizing: border-box;
	user-select: none;
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
	input {
		position: relative;
		line-height: 35px;
		background: $background-color-c;
		border: none;
		outline: none;
		padding: 0 10px;
		width: 100%;
		box-sizing: border-box;
		user-select: none;
	}
	input::-webkit-input-placeholder {
		color: #c0c5ccbc;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	input[type="number"] {
		-moz-appearance: textfield;
	}
}
</style>
