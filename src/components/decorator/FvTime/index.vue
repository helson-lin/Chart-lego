<template>
	<div class="fv-time">{{ time }}</div>
</template>
<script lang="ts" setup>
import { onUnmounted, ref } from "vue";
interface FvTimerProps {
	value: number[];
}
const time = ref("");
// withDefaults(defineProps<FvTimerProps>(), {
// 	value: [1, 1, 1, 1, 1, 1],
// });
const getTime = () => {
	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const day = new Date().getDate();
	const nowtime = new Date().toLocaleTimeString();
	time.value = `${year}-${month}-${day} ${nowtime}`;
};
let timer: any = setInterval(() => {
	getTime();
}, 1000);
onUnmounted(() => {
	clearInterval(timer);
	timer = null;
});
</script>
<style lang="scss" scoped>
.fv-time {
	min-width: fit-content;
	padding: 0 5px;
	box-sizing: border-box;
	font-size: 22px;
	vertical-align: middle;
}
</style>
