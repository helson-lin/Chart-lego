import HttpRequest, { Reponse } from "../lib/axios/index";
export const login = <T>(
	username: string,
	password: string
): Promise<Reponse<T>> => {
	return HttpRequest.request({
		data: { username, password },
		url: "/user/login",
		method: "POST",
	});
};
