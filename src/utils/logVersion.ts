import CONFIG from "../config";
const logVersion = () => {
	console.log(
		`%c %c\n十年可见春去秋来，百年可证生老病死；\n千年可叹王朝更替，万年可见斗转星移；\n凡人如果用一天的视野，去窥探百万年的天地，是否就如同井底之蛙。\n%c Fano View %c 版本：${CONFIG.version} `,
		` padding: 0px 100px;
    background-image: url(https://kaimo313.gitee.io/blogs/console.jpg);
    background-size: contain;
    background-repeat: no-repeat;
    color: transparent;`,
		"color: #3eaf7c; font-size: 16px;margin-bottom: 10px;",
		"background: #35495e; padding: 4px; border-radius: 3px 0 0 3px; color: #fff",
		"background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff"
	);
};
logVersion();
