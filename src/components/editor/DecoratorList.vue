<template>
	<div class="decorator-list">
		<div class="decorator" v-for="decorator in decoratorList" :key="decorator">
			{{ decorator }}
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getComponetsName } from "../decorator/index";
const decoratorList = ref<string[]>([]);
onMounted(() => {
	decoratorList.value = getComponetsName();
});
</script>
<style lang="scss" scoped>
.decorator-list {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 20px 20px;
	box-sizing: border-box;
	justify-items: center;
	align-content: center;
	overflow-y: scroll;
	user-select: none;
	text-align: center;
	@include scrollbar(10px, 15px);
	.decorator {
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin-bottom: 20px;
		font-size: 18px;
		border: 1px solid #ccc;
		font-weight: 400;
		background-color: rgba($color: $color-primary, $alpha: 0.2);
		cursor: pointer;
	}
}
</style>
