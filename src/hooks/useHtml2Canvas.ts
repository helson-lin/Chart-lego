import html2canvas from "html2canvas";

function dataURLToBlob(dataurl: string): Blob {
	const arr = dataurl.split(",");
	let mime;
	if (arr[0]) {
		mime = (arr[0].match(/:(.*?);/) as any)[1];
	}
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}

export default function toImage(): Promise<File> | undefined {
	// 手动创建一个 canvas 标签
	const canvas = document.createElement("canvas");
	const canvasBox = document.getElementById("h-ed");
	if (!canvasBox) return;
	// 获取父级的宽高
	const width = parseInt(window.getComputedStyle(canvasBox).width);
	const height = parseInt(window.getComputedStyle(canvasBox).height);
	// 宽高 * 2 并放大 2 倍 是为了防止图片模糊
	canvas.width = width * 2;
	canvas.height = height * 2;
	canvas.style.transform = "translate: scale(1.5,1.5)";
	canvas.style.width = width + "px";
	canvas.style.height = height + "px";
	const context = canvas.getContext("2d");
	if (!context) return;
	context.scale(2, 2);
	const options = {
		canvas: canvas,
		useCORS: false,
		scale: 1.5,
	};
	return new Promise((resolve) => {
		html2canvas(canvasBox, options).then(async (canvas) => {
			// toDataURL 图片格式转成 base64
			const dataURL = canvas.toDataURL("image/png");
			const blob = await dataURLToBlob(dataURL);
			console.log("data", blob);
			const file = new File([blob], `${new Date().getTime()}.png`, {
				type: "png",
			});
			resolve(file);
		});
	});
}
