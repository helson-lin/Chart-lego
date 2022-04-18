<template>
	<div class="fv-login">
		<div class="login-card">
			<div class="card-left card">
				<div class="logo">Fano View</div>
				<img
					class="logo-img"
					src="../assets/image/Analysis.png"
					alt=""
					srcset=""
				/>
			</div>
			<div class="card-right card" @keyup.enter="submit">
				<div class="input-form">
					<input type="text" placeholder="请输入用户名" v-model="username" />
				</div>
				<div class="input-form password">
					<input
						:type="viewPasswd ? 'text' : 'password'"
						placeholder="请输入密码"
						v-model="password"
					/>
					<div class="eye">
						<EyeInvisibleOutlined
							v-show="!viewPasswd"
							@click="viewPasswd = !viewPasswd"
						></EyeInvisibleOutlined>
						<EyeOutlined
							v-show="viewPasswd"
							@click="viewPasswd = !viewPasswd"
						/>
					</div>
				</div>
				<div class="btn">
					<button @click="submit">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login } from "@/interface/user";
import { message } from "ant-design-vue";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons-vue";
import { analysisRedirectUrl } from "../utils/utils";
export interface UserLogin {
	token: string;
	data: { [key: string]: string };
}
const router = useRouter();
const route = useRoute();
const username = ref<string>("");
const password = ref<string>("");
const viewPasswd = ref(false);
const submit = async () => {
	if (!username.value || !password.value) {
		message.info("请检查用户名和密码！");
		return;
	}
	const res = await login<UserLogin>(username.value, password.value);
	if (res.data.code === 0) {
		message.success("登录成功！");
		// const {user}
		// 存在重定向URL:重定向
		const redirectUrl = route.query.redirectUrl || "";
		if (redirectUrl) {
			const { pathname, query } = analysisRedirectUrl(redirectUrl as string);
			router.push({
				path: pathname,
				query,
			});
		} else {
			router.push("/");
		}
	} else {
		message.info(res.data.msg || "系统异常！");
	}
};
</script>
<style lang="scss" scoped>
.fv-login {
	position: relative;
	width: 100%;
	height: 100vh;
	background-image: linear-gradient(
		120deg,
		rgba(161, 196, 253, 0.4) 0%,
		rgba(194, 233, 251, 0.4) 100%
	);
	.login-card {
		width: 780px;
		height: 460px;
		backdrop-filter: blur(20px);
		background: rgba(255, 255, 255, 0.4);
		border-radius: 5px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		display: flex;
		.card {
			width: calc(100% / 2);
			height: 100%;
			border-radius: 5px;

			&-left {
				display: flex;
				flex-direction: column;
				background: rgba(255, 255, 255, 0.9);
				.logo {
					width: 100%;
					height: 160px;
					padding-left: 40px;
					padding-top: 40px;
					font-size: 24px;
					font-weight: bold;
					font-style: italic;
					color: $color-primary;
					text-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
				}
				.logo-img {
					width: 100%;
				}
			}
			&-right {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.input-form {
					position: relative;
					margin-bottom: 20px;
					&.password {
						input {
							padding-right: 40px;
							box-sizing: border-box;
						}
						.eye {
							position: absolute;
							right: 0;
							top: 0;
							width: 40px;
							height: 100%;
							line-height: 39px;
							text-align: center;
						}
					}
					input {
						width: 369px;
						height: 39px;
						padding: 0 10px;
						box-sizing: border-box;
						background: $background-color-c;
						outline: none;
						border: none;
						border-radius: 5px;
					}
					input::-webkit-input-placeholder {
						color: #c0c5ccbc;
					}
				}
				.btn {
					button {
						width: 369px;
						height: 39px;
						outline: none;
						border: none;
						background: $color-primary;
						color: #fff;
						border-radius: 5px;
						box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
						cursor: pointer;
						&:hover {
							background: $color-primary;
							opacity: 0.8;
						}
					}
				}
			}
		}
	}
}
</style>
