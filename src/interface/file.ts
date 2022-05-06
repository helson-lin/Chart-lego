import { HttpRequest } from "../lib/axios/request";
export const fileListByType = (type: string) => {
	return HttpRequest({
		url: "/file/typeList",
		method: "GET",
		data: { type },
	});
};

export const fileUpload = (file: File) => {
	const fileFormData = new FormData();
	fileFormData.append("file", file);
	return HttpRequest({
		url: "/file/upload?dir_uid=270a791d5227280b062a3024e5f71044",
		method: "POST",
		data: fileFormData,
	});
};
