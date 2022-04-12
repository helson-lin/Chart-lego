<template>
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { login } from "@/interface/user";
export interface UserLogin {
	token: string;
	data: { [key: string]: string };
}
(async () => {
	const res = await login<UserLogin>("admin", "697922");
	console.log("DEMO----", res);
	if (res.data.code === 0) {
		localStorage.setItem("token", res.data.data.token);
	}
})();
export default defineComponent({
	name: "App",
});
</script>

<style>
#app {
	@import "reset-css"; /* reset-css */
}
</style>
