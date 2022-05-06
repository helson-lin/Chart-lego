import { Module } from "vuex";
import { GloablDataProps } from "./index";
import { login } from "@/interface/user";
import { message } from "ant-design-vue";
export interface Role {
	uid: string;
	name: string;
}
export interface UserProps {
	uid: string;
	open_id: null | string;
	nick_name: string;
	username: string;
	role_id: string;
	avatar: string;
	roles: Role[];
}

export interface UserStoreProps {
	user: UserProps | null;
}
const user: Module<UserStoreProps, GloablDataProps> = {
	namespaced: true,
	state: {
		user: JSON.parse(localStorage.getItem("fv-user") || ""),
	},
	mutations: {
		setUser(state, user: UserProps) {
			state.user = user;
		},
	},
	actions: {
		async login(context, playload) {
			const { username, password } = playload;
			const res = await login(username, password);
			if (res.code === 0) {
				message.success("登录成功！");
				context.commit("setUser", res.data.data);
				const userInfoStr = JSON.stringify(res.data.data);
				localStorage.setItem("fv-user", userInfoStr);
				return Promise.resolve(true);
			} else {
				message.info(res.msg || "系统异常！");
				return Promise.reject(false);
			}
		},
	},
};

export default user;
