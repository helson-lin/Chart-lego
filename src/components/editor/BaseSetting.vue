<template>
	<div class="base-setting">
		<a-collapse class="bs" v-model:activeKey="activeKey" :ghost="true">
			<a-collapse-panel key="0" header="画布设置">
				<div class="option-item wh">
					<div class="option-label">画布尺寸</div>
					<div class="option-value">
						<input
							v-model="editorSetting.width"
							type="number"
							placeholder="宽度"
							data-name="宽"
						/>
						<input
							v-model="editorSetting.height"
							type="number"
							placeholder="高度"
							data-name="高"
						/>
					</div>
				</div>
				<div class="option-item background">
					<div class="option-label">画布背景</div>
					<div class="option-value">
						<Switch
							v-model:checked="editorSetting.customImgBack"
							checkedTxt="图片"
							unCheckedTxt="背景"
							@change="checkedChange"
						/>
					</div>
				</div>
				<div class="upload">
					<div class="upload-box" v-show="editorSetting.customImgBack">
						<img
							style="200px;height:90px"
							v-if="editorSetting.imgUrl"
							:src="editorSetting.imgUrl"
						/>
						<a-upload-dragger
							v-if="!editorSetting.imgUrl"
							v-model:fileList="fileList"
							name="file"
							:headers="headers"
							:multiple="true"
							:action="fileUploadUrl"
							@change="handleChange"
							@drop="handleDrop"
						>
							<p class="ant-upload-drag-icon">
								<inbox-outlined></inbox-outlined>
							</p>
							<p class="ant-upload-text">拖拽图片到此位置上传</p>
						</a-upload-dragger>
					</div>
					<div class="picker" v-show="!editorSetting.customImgBack">
						<color-picker
							v-model:pureColor="color"
							v-model:gradientColor="gradientColor"
						/>
					</div>
				</div>
			</a-collapse-panel>
		</a-collapse>
		<div class="btns">
			<a-button type="primary" @click="getLoction">获取定位</a-button>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ColorPicker } from "vue3-colorpicker";
import Switch from "../common/Switch.vue";
import "vue3-colorpicker/style.css";
import Config from "@/config/index";
import { useStore } from "vuex";
import { computed, ref, watchEffect } from "vue";
import { EditorStyleProps } from "@/types/editor";
const activeKey = ref(0);
const store = useStore();
const editorSetting = computed<EditorStyleProps>(() => {
	return store.state.editor.style;
});
const color = ref("#ffffff");
const headers = computed(() => {
	return {
		authorization: localStorage.getItem("token"),
		Cookie: "token=" + localStorage.getItem("token"),
	};
});
const fileUploadUrl = computed(() => {
	const env = process.env.NODE_ENV === "development" ? "dev" : "pro";
	return (
		Config.baseUrl[env] +
		"/file/upload?dir_uid=270a791d5227280b062a3024e5f71044"
	);
});
const fileList = ref([]);
const gradientColor = ref(
	"linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
);
const handleChange = ({ file }) => {
	console.log(file, "文件上传", "handleChange");
	if (file.status === "done") {
		const url = file.response.data.url;
		store.commit("editor/setStyle", { ...editorSetting.value, imgUrl: url });
	}
};
const handleDrop = (e) => {
	console.log(e, "文件上传12", "handleDrop");
};
const getLoction = () => {
	const componentBox: HTMLElement | null = document.getElementById("h-ed");
	if (!componentBox) return;
	const componentList = componentBox.children;
	const componentListPos = [];
	for (let i = 0; i < componentList.length - 1; i++) {
		const { id } = componentList[i];
		const { left, top, width, height } = getComputedStyle(componentList[i]);
		componentListPos.push({
			id,
			left: Number(left.replace("px", "")),
			top: Number(top.replace("px", "")),
			width: Number(width.replace("px", "")),
			height: Number(height.replace("px", "")),
		});
	}
	console.log("定位", "handleDrop", componentListPos);
};
const change = (color: string) => {
	console.log(color, editorSetting.value.background);
	store.commit("editor/setStyle", {
		...editorSetting.value,
		background: color,
	});
};
const checkedChange = (val: boolean) => {
	store.commit("editor/setEditorBackground", val);
};
watchEffect(() => {
	if (editorSetting.value.background) {
		color.value = editorSetting.value.background;
	}
});
watchEffect(() => {
	if (color.value) {
		change(color.value);
	}
});
</script>
<style lang="scss" scoped>
/deep/ .ant-image-img {
	width: 100%;
	height: 100% !important;
}
.base-setting {
	width: 100%;
	height: 100%;
	background: #fff;
	// box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

	.bs {
		/deep/ .ant-collapse-header {
			background: rgba(255, 255, 255, 0.4);
			backdrop-filter: blur(20px);
			border-bottom: 1px solid #eee;
			box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
		}
	}

	.btns {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.w-d-setting {
	display: flex;
	.width,
	.height {
		width: calc(100% / 2);
		input {
			width: 80px;
		}
	}
}
.option-item {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 20px;
	&.upload {
		margin-top: 40px;
		height: 90px;
		.ant-upload-text {
			font-size: 12px;
			margin-top: -10px;
		}
	}
	&.background {
		.option-value {
			width: 100%;
			padding-left: 0px;
		}
	}
	&.wh {
		.option-label {
			margin-bottom: 10px;
		}
		.option-value {
			padding-left: 0px;
			display: flex;
			align-items: center;
			input {
				position: relative;
				width: calc(100% / 2);
				height: 35px;
				line-height: 35px;
				background: $background-color-c;
				border: none;
				outline: none;
				padding: 0 10px;
				box-sizing: border-box;
				&:nth-child(1) {
					margin-right: 10px;
				}
			}
			input:after {
				position: absolute;
				right: 0;
				top: 0;
				content: "nene";
				display: block;
				width: 30px;
				height: 35px;
				line-height: 35px;
				color: $color-text-secondary;
			}
			input::-webkit-outer-spin-button,
			input:-webkit-inner-spin-button {
				-webkit-appearance: none;
			}
			input[type="number"] {
				-moz-appearance: textfield;
			}
		}
	}
	.option-label {
		font-size: 12px;
		font-weight: 400;
		color: $color-text-secondary;
		margin-bottom: 20px;
	}
	.option-value {
		flex: 1;
		padding-left: 20px;
		box-sizing: border-box;
	}
}
.upload {
	width: 100%;
	.picker {
		width: 100%;
		padding: 5px 10px;
		box-sizing: border-box;
		background: $background-color-c;
		:deep() .vc-color-wrap {
			width: 100%;
		}
	}
	.upload-box {
		width: 100%;
		padding: 10px 10px;
		box-sizing: border-box;
		background: $background-color-c;
		img {
			width: 100%;
			cursor: pointer;
		}
	}
}
</style>
