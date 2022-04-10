<template>
	<div class="base-setting">
		<a-collapse class="bs" v-model:activeKey="activeKey" :ghost="true">
			<a-collapse-panel key="1" header="基础设置">
				<div class="option-item">
					<div class="option-label">宽度</div>
					<div class="option-value">
						<a-input
							v-model:value="editorSetting.width"
							type="number"
							placeholder="宽度"
						/>
					</div>
				</div>
				<div class="option-item">
					<div class="option-label">高度</div>
					<div class="option-value">
						<a-input
							v-model:value="editorSetting.height"
							type="number"
							placeholder="高度"
						/>
					</div>
				</div>
				<div class="option-item">
					<div class="option-label">自定义背景图</div>
					<div class="option-value">
						<a-switch v-model:checked="editorSetting.customImgBack" />
					</div>
				</div>
				<div class="option-item upload" v-show="editorSetting.customImgBack">
					<div class="option-label">背景图</div>
					<div class="option-value">
						<div class="upload-box">
							<a-upload-dragger
								v-model:fileList="fileList"
								name="file"
								:multiple="true"
								action="/file/upload"
								@change="handleChange"
								@drop="handleDrop"
							>
								<p class="ant-upload-drag-icon">
									<inbox-outlined></inbox-outlined>
								</p>
								<p class="ant-upload-text">拖拽图片到此位置上传</p>
							</a-upload-dragger>
						</div>
					</div>
				</div>
				<div class="option-item" v-show="!editorSetting.customImgBack">
					<div class="option-label">背景色</div>
					<div class="option-value"></div>
				</div>
			</a-collapse-panel>
		</a-collapse>
	</div>
</template>
<script lang="ts" setup>
import { useStore } from "vuex"
import { computed, ref } from "vue"
import { EditorStyleProps } from "./Editor.vue"
const activeKey = ref(0)
const store = useStore()
const editorSetting = computed<EditorStyleProps>(() => {
	return store.state.editor.style
})
const fileList = ref([])
const handleChange = ({ file }) => {
	console.log(file, "文件上传", "handleChange")
}
const handleDrop = (e) => {
	console.log(e, "文件上传12", "handleDrop")
}
</script>
<style lang="scss" scoped>
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
}
.option-item {
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	&.upload {
		margin-top: 40px;

		.ant-upload-text {
			font-size: 12px;
			margin-top: -10px;
		}
	}
	.option-label {
		font-size: 14px;
		font-weight: 600;
		color: #000;
	}
	.option-value {
		flex: 1;
		padding-left: 20px;
		box-sizing: border-box;
	}
}
</style>
