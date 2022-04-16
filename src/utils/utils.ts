import parse from "url-parse";
/**
 * @description: 获取本地cookie
 * @param {string} sName cookie的名称
 * @return {string} cookie的值
 */
export function getCookie(sName: string): string | null {
	const aCookie = document.cookie.split("; ");

	for (let i = 0; i < aCookie.length; i += 1) {
		const aCrumb = aCookie[i].split("=");
		if (sName === aCrumb[0]) return unescape(aCrumb[1]);
	}
	return null;
}
/**
 * @description: 获取重定向URL参数
 * @return {string} URL: BASE64
 */
export function generateRedirectUrl() {
	const { href, origin } = window.location;
	const url = href.replaceAll(origin, "");
	return btoa(url);
}
/**
 * @description: 解析重定向URL参数
 * @return {query: any;pathname: string;}
 */
export function analysisRedirectUrl(url: string): {
	query: any;
	pathname: string;
} {
	const originUrl = atob(url);
	const parsed = parse(originUrl);
	return {
		query: parsed.query,
		pathname: parsed.pathname,
	};
}
