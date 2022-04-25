<template>
	<div class="fv-weather">
		<img :src="`https://pic.kblue.site/img/${ico}.png`" alt="" />
		{{ weather }}
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
const weather = ref("");
const ico = ref("");
const getWeather = async () => {
	fetch(
		"http://www.tianqiapi.com/api?version=v9&appid=23035354&appsecret=8YvlPNrz"
	)
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			ico.value = res.data[0].wea_img;
			weather.value += `${res.city} ${res.data[0].tem}°C`;
		});
};
onMounted(() => {
	getWeather();
});
</script>
<style lang="scss" scoped>
.fv-weather {
	display: flex;
	align-items: center;
	img {
		width: auto;
		height: 80%;
	}
}
</style>
