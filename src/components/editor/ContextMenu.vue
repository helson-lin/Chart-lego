<template>
	<div class="context-menu">
		<div class="menu" v-for="menu in contextMenu" :key="menu.id">
			{{ menu.label }}
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const contextMenu = ref([
	{
		id: "del",
		label: "删除",
	},
	{
		id: "index_up",
		label: "上一层",
	},
	{
		id: "index_down",
		label: "下一层",
	},
]);
</script>
<style lang="scss" scoped>
.context-menu {
	position: absolute;
	width: 100px;
	text-align: center;
	line-height: 30px;
	font-size: 14px;
	color: $color-black;
	display: flex;
	justify-content: center;
	flex-direction: column;
	background-color: $color-primary;
	.menu {
		cursor: pointer;
	}
}
</style>
