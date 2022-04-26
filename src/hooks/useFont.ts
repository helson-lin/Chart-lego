import { ref } from "vue";
import { getFontList } from "@/interface/font";
interface FontFamily {
	uid: string;
	name: string;
	url: string;
	crt_tm: string;
	upd_tm: string;
}
const fontList = ref<FontFamily[]>([]);
/**
 * @description: 设置字体到Header
 * @param {list}
 */
const insertFontToHeader = (list: FontFamily[]) => {
	const style = document.createElement("style");
	style.type = "text/css";
	let text = "";
	list.forEach((font) => {
		text += ` @font-face {font-family:'${font.name}';src:url('${font.url}')}`;
	});
	style.innerText = text;
	document.getElementsByTagName("head")[0].appendChild(style);
};
/**
 * @description: 请求服务端字体数据
 */
const getList = async () => {
	const res = await getFontList();
	if (res.code === 0) {
		fontList.value = res.data.rows;
		insertFontToHeader(fontList.value);
	}
};
export { fontList, getList };
