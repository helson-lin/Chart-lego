import { HttpRequest } from "../lib/axios/request";
export const fileListByType = (type: string) => {
	return HttpRequest({
		url: "/file/typeList",
		method: "GET",
		data: { type },
	});
};
