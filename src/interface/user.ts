import { HttpRequest } from "../lib/axios/request";
export const login = (username: string, password: string) => {
	return HttpRequest({
		url: "/user/login",
		method: "POST",
		data: { username, password },
	});
};
