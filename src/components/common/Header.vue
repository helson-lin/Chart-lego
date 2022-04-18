<template>
	<div class="header">
		<div class="logo" @click="backHome">
			<img style="height: 50px" src="../../assets/image/logo1.png" alt="" />
		</div>
		<div class="h-flex">
			<slot></slot>
		</div>
		<div class="avatar" v-if="showAvatar">
			<a-dropdown>
				<a-avatar src="https://joeschmoe.io/api/v1/random">
					<template #icon><UserOutlined /></template>
				</a-avatar>
				<template #overlay>
					<a-menu>
						<a-menu-item v-if="isLogin">
							<setting-outlined />
							<span class="btn" style="margin-left: 10px">账号设置</span>
						</a-menu-item>
						<a-menu-item @click="logout" v-if="isLogin">
							<logout-outlined />
							<span class="btn" style="margin-left: 10px">退出账号</span>
						</a-menu-item>
						<a-menu-item @click="login" v-if="!isLogin">
							<setting-outlined />
							<span class="btn" style="margin-left: 10px">登录</span>
						</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import {
	UserOutlined,
	LogoutOutlined,
	SettingOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
const router = useRouter();
const props = defineProps({
	showAvatar: {
		type: Boolean,
		default: true,
	},
});
const isLogin = computed<boolean>(() => {
	const fvToken = Cookies.get("fv_token");
	return fvToken ? true : false;
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
.header {
	width: 100%;
	height: 50px;
	padding: 0 20px;
	box-sizing: border-box;
	box-shadow: $shadow-shallow;
	background: #ffffff;
	box-shadow: 0px 6px 20px 0px rgba(162, 181, 230, 0.16);
	backdrop-filter: blur(12px);
	display: flex;
	flex-direction: row;
	.logo {
		height: 50px;
		cursor: pointer;
	}
	.h-flex {
		flex: 1;
		height: 100%;
	}
	.avatar {
		margin-left: 20px;
		display: flex;
		align-items: center;
		height: 100%;
		cursor: pointer;
		:deep() .btn {
			margin-left: 20px !important;
		}
	}
}
</style>
