<template>
	<div class="base-setting">
		<a-collapse class="bs" v-model:activeKey="activeKey" :ghost="true">
			<a-collapse-panel key="0" header="画布设置">
				<div class="option-item wh">
					<div class="option-label">画布尺寸</div>
					<div class="option-value">
						<Input
							v-model:data="editorSetting.width"
							type="number"
							placeholder="宽度"
							subfix="宽"
						/>
						<Input
							v-model:data="editorSetting.height"
							type="number"
							placeholder="高度"
							subfix="高"
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
						<a-upload-dragger
							v-model:fileList="fileList"
							name="file"
							:multiple="true"
							:action="fileUploadUrl"
							@change="handleChange"
							@remove="remove"
						>
							<div class="upload-inline" v-if="!editorSetting.imgUrl">
								<p class="ant-upload-drag-icon">
									<inbox-outlined></inbox-outlined>
								</p>
								<p class="ant-upload-text">拖拽图片到此位置上传</p>
							</div>
							<img
								style="width: 100%; height: 90px"
								v-if="editorSetting.imgUrl"
								:src="editorSetting.imgUrl"
							/>
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
		<a-collapse
			class="bs"
			v-model:activeKey="chartSetting"
			:ghost="true"
			v-if="editingComponentId && editingComponentType === 'chart'"
		>
			<a-collapse-panel key="0" header="图表设置">
				<div class="option-item wh">
					<div class="option-label">图表尺寸</div>
					<div class="option-value">
						<Input
							v-model:data="editingComponent.styleOption.width"
							type="number"
							disabled
							placeholder="宽度"
							subfix="宽"
						/>
						<Input
							disabled
							v-model:data="editingComponent.styleOption.height"
							type="number"
							subfix="高"
						/>
					</div>
				</div>
				<div class="option-item wh">
					<div class="option-label">图表定位</div>
					<div class="option-value">
						<Input
							v-model:data="editingComponent.styleOption.top"
							disabled
							type="number"
							placeholder="上间距"
							subfix="上"
						/>
						<Input
							disabled
							v-model:data="editingComponent.styleOption.left"
							type="number"
							placeholder="左间距"
							subfix="左"
						/>
					</div>
				</div>
				<div class="option-item color">
					<div class="option-label">主题色</div>
					<div class="option-value picker">
						<color-picker
							v-model:pureColor="editingComponent.styleOption.themeColor"
							v-model:gradientColor="gradientColor"
						/>
					</div>
				</div>
				<div class="option-item api">
					<div class="option-label">API配置</div>
					<div class="option-value">
						<Input
							style="width: 100%"
							v-model:data="editingComponent.apiOption.url"
							type="text"
							placeholder="接口地址"
							subfix="接口地址"
						/>
						<Input
							v-model:value="editingComponent.apiOption.timer"
							type="number"
							placeholder="刷新时间"
							subfix="秒"
						/>
					</div>
				</div>
			</a-collapse-panel>
		</a-collapse>
		<a-collapse
			class="bs"
			v-model:activeKey="decoratorSetting"
			:ghost="true"
			v-if="editingComponentId && editingComponentType !== 'chart'"
		>
			<a-collapse-panel key="0" header="装饰器设置">
				<div class="option-item wh">
					<div class="option-label">装饰器尺寸</div>
					<div class="option-value">
						<Input
							v-model:data="editingComponent.styleOption.width"
							type="number"
							disabled
							placeholder="宽度"
							subfix="宽"
						/>
						<Input
							disabled
							v-model:data="editingComponent.styleOption.height"
							type="number"
							subfix="高"
						/>
					</div>
				</div>
				<div class="option-item wh">
					<div class="option-label">装饰器定位</div>
					<div class="option-value">
						<Input
							v-model:data="editingComponent.styleOption.top"
							disabled
							type="number"
							placeholder="上间距"
							subfix="上"
						/>
						<Input
							disabled
							v-model:data="editingComponent.styleOption.left"
							type="number"
							placeholder="左间距"
							subfix="左"
						/>
					</div>
				</div>
				<div class="option-item color" v-if="editingComponent.value">
					<div class="option-label">装饰器值</div>
					<div class="option-value picker">
						<Input
							v-model:data="editingComponent.value"
							type="textarea"
							placeholder="请输入"
							subfix="文本"
						/>
					</div>
				</div>
				<div
					class="option-item color"
					v-if="(editingComponent.styleOption as StyleOption<DecoratorFactory>).color"
				>
					<div class="option-label">字体颜色</div>
					<div class="option-value picker">
						<color-picker
							v-model:pureColor="(editingComponent.styleOption as StyleOption<DecoratorFactory>).color"
							v-model:gradientColor="gradientColor"
						/>
					</div>
				</div>
				<div
					class="option-item api"
					v-if="(editingComponent.styleOption as StyleOption<DecoratorFactory>).font"
				>
					<div class="option-label">字体设置</div>
					<div class="option-value">
						<TextAlign v-model:data="editingComponent.styleOption.textAlign" />
						<Select
							subfix="字体"
							valueKey="name"
							label="name"
							v-model:data="editingComponent.styleOption.font.fontFamily"
							:list="fontFamilyList"
						/>
						<Input
							style="width: 100%"
							v-model:data="(editingComponent.styleOption as StyleOption<DecoratorFactory>).font.fontSize"
							type="number"
							placeholder="字体大小"
							subfix="大小"
						/>
						<Input
							v-model:data="editingComponent.styleOption.font.fontWeight"
							type="number"
							placeholder="字重"
							subfix="字重"
						/>
					</div>
				</div>
			</a-collapse-panel>
		</a-collapse>
		<div class="btns"></div>
	</div>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, onMounted, ref, watchEffect } from "vue";
import { ColorPicker } from "vue3-colorpicker";
import Switch from "../common/Switch.vue";
import Input from "../common/Input.vue";
import Select from "../common/Select.vue";
import TextAlign from "../common/TextAlign.vue";
import "vue3-colorpicker/style.css";
import Config from "@/config/index";
import { fontList, getList } from "@/hooks/useFont";
import {
	EditorStyleProps,
	FvComponentBase,
	FvComponentList,
	StyleOption,
	DecoratorFactory,
} from "@/types/editor";
import { ChartOptionsProps } from "@/types/chart";
import { DecoratorOptionProps } from "@/types/decorator";
const activeKey = ref(0);
const chartSetting = ref(0);
const decoratorSetting = ref(0);
const fontFamilyList = fontList;
const store = useStore();
const editorSetting = computed<EditorStyleProps>(() => {
	return store.state.editor.style;
});
const editingComponentType = computed<string>(() => {
	return store.state.editor.editingComponentType;
});
const editingComponentId = computed<string | null>(() => {
	return store.state.editor.editingComponentId;
});
/**
 * @description: 正在编辑的组件
 */
const editingComponent = computed<FvComponentBase>(() => {
	const editingComponentId: string = store.state.editor.editingComponentId;
	const chartList: FvComponentList | null = store.state.editor.components;
	if (!chartList) return null;
	const componet = chartList.filter((item) => item.uid === editingComponentId);
	if (componet && componet.length === 1) {
		return componet[0];
	} else {
		return null;
	}
});
const color = ref("#ffffff");
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
	if (file.status === "done") {
		const url = file.response.data.url;
		store.commit("editor/setStyle", { ...editorSetting.value, imgUrl: url });
	}
};
const change = (color: string) => {
	store.commit("editor/setStyle", {
		...editorSetting.value,
		background: color,
	});
};
const remove = () => {
	store.commit("editor/setStyle", {
		...editorSetting.value,
		imgUrl: null,
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
onMounted(() => {
	getList();
});
</script>
<style lang="scss" scoped>
:deep() .ant-image-img {
	width: 100%;
	height: 100% !important;
}
:deep() .ant-upload {
	padding: 0 !important;
}
:deep() .ant-upload-text {
	position: relative;
	top: -6px;
	font-size: 12px !important;
}
.picker {
	width: 100%;
	padding: 5px 10px;
	box-sizing: border-box;
	background: $background-color-c;
	:deep() .vc-color-wrap {
		width: 100%;
	}
}
.base-setting {
	width: 100%;
	height: 100%;
	background: #fff;
	overflow-y: auto;
	@include scrollbar(5px, 10px);
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
	&.api {
		.option-value {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-left: 0;

			.fv-input {
				margin-bottom: 20px;
			}
		}
	}
	&.upload {
		margin-top: 40px;
		height: 90px;
		.ant-upload-text {
			font-size: 12px;
			margin-top: -10px;
		}
	}
	&.background,
	&.color {
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
			.fv-input {
				width: calc(100% / 2);
				&:nth-child(1) {
					margin-right: 10px;
				}
			}
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
			input::after {
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
		box-sizing: border-box;
	}
}
.upload {
	width: 100%;
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
