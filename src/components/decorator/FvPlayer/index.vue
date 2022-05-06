<template>
	<div class="fv-player">
		<div class="loading" v-if="loading">
			<img src="@/assets/image/decorator/5-121204194032-50.gif" alt="" />
		</div>
		<video
			ref="playerRef"
			class="player"
			:src="value"
			:autoplay="autoplay"
			:loop="loop"
			controls
		></video>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref, watchEffect, withDefaults } from "vue";
import DPlayer from "dplayer";
export type FvVideoPlayerTypes = 0 | 1 | 2;
export interface FvVideoProps {
	value: string;
	type?: FvVideoPlayerTypes;
	autoplay?: boolean;
	loop?: boolean;
}
withDefaults(defineProps<FvVideoProps>(), {
	value: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
	type: 0,
	autoplay: false,
	loop: false,
});
const playerRef = ref<null | HTMLVideoElement>(null);
const loading = ref(true);
onMounted(() => {
	if (playerRef.value) {
		playerRef.value.onloadeddata = () => {
			console.log("加载完毕");
			loading.value = false;
		};
	}
});
watchEffect(() => {
	if (playerRef.value && playerRef.value !== undefined) {
		loading.value = true;
	}
});
</script>
<style lang="scss" scoped>
.fv-player {
	position: relative;
	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}
}
.player {
	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	background-color: #fafafa;
}
</style>
