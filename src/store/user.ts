import { Module } from "vuex"
import { GloablDataProps } from "./index"
export interface UserStoreProps {
	user: UserProps
}
export interface UserProps {
	username: string
	password: string
	avatar: string
}
const defaultUser: UserProps = {
	username: "admin123",
	password: "admin123",
	avatar: "ss",
}
const user: Module<UserStoreProps, GloablDataProps> = {
	state: {
		user: defaultUser,
	},
	getters: {},
}

export default user
