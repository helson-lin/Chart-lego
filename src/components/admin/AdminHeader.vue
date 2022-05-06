<template>
	<div class="admin-header">
		<div class="logo" @click="backHome">
			<img style="height: 50px" src="../../assets/image/logo1.png" alt="" />
		</div>
		<div class="avatar">
			<a-dropdown>
				<a-avatar :src="user.avatar">
					<template #icon><UserOutlined /></template>
				</a-avatar>
				<template #overlay>
					<a-menu>
						<a-menu-item>
							<setting-outlined />
							<span class="btn" style="margin-left: 10px">首页</span>
						</a-menu-item>
						<a-menu-item @click="logout">
							<logout-outlined />
							<span class="btn" style="margin-left: 10px">退出账号</span>
						</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import {
	UserOutlined,
	LogoutOutlined,
	SettingOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { UserProps } from "@/store/user";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const isLogin = computed<boolean>(() => {
	const fvToken = Cookies.get("fv_token");
	return fvToken ? true : false;
});
const user = computed<UserProps>(() => {
	return store.state.user.user;
});
const backHome = () => {
	router.push({
		path: "/",
	});
};
const login = () => {
	router.push({
		path: "/login",
	});
};
const logout = () => {
	Cookies.remove("fv_token");
	router.push({
		path: "/login",
	});
};
</script>
<style lang="scss" scoped>
.admin-header {
	width: 100%;
	display: flex;
	padding: 0 20px;
	box-sizing: border-box;
	box-shadow: $shadow-shadow-dark;
	box-shadow: 0px 6px 20px 0px rgba(162, 181, 230, 0.16);
	backdrop-filter: blur(12px);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	.logo {
		cursor: pointer;
	}
}
</style>
