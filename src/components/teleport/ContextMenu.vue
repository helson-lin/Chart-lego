<template>
	<teleport to="#demo2123">
		<div class="context-menu">
			<div class="menu" v-for="menu in contextMenu" :key="menu.id">
				{{ menu.label }}
			</div>
		</div>
	</teleport>
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
	top: 200px;
	left: 600px;
	width: 100px;
	height: 200px;
	background-color: #f23;
	text-align: center;
	line-height: 30px;
	font-size: 14px;
	color: $color-black;
	z-index: 2220;
}
</style>
