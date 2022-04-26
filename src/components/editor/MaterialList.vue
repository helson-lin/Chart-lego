<template>
	<div class="material-list">
		<img
			class="material"
			:src="material.url"
			v-for="material in materialList"
			:key="material.uid"
		/>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { fileListByType } from "@/interface/file";
const materialList = ref<{ url: string; uid: string }[]>([]);
const getMaterialList = async () => {
	const res = await fileListByType("png");
	if (res.code === 0) {
		materialList.value = res.data.rows.map(
			(item: { url: string; uid: string; [key: string]: any }) => {
				return { url: item.url, uid: item.uid };
			}
		);
	}
};
onMounted(() => {
	getMaterialList();
});
</script>
<style lang="scss" scoped>
.material-list {
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
	.material {
		position: relative;
		width: 100%;
		margin-bottom: 20px;
		box-shadow: $shadow-shallow;
		background-image: url(https://pic.kblue.site/img/140602Yznrgrbpw8mNtSqY_64x64.png);
		background-size: 32px auto;
		&::after {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			content: "";
			display: block;
			background: rgba(0, 0, 0, 0.1);
		}
	}
}
</style>
