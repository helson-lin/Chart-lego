import { HttpRequest } from "../lib/axios/request";
export const getMenuList = () => {
	return HttpRequest({
		url: "/menu/list",
		method: "GET",
	});
};
