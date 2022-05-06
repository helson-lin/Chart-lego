<template>
	<div class="canvas-list">
		<div class="canvas-box" v-for="canvas in list" :key="canvas.uid">
			<div class="canvas">
				<div class="canvas-thumbnail">
					<img
						:src="
							canvas.img ||
							'http://zpan22.oss-cn-shanghai.aliyuncs.com/fano/1651569525854.png'
						"
						alt=""
					/>
				</div>
				<div class="canvas-info">
					<div class="info-base">
						<a-avatar :src="canvas.user.avatar" />
						<div class="nm">
							<span class="canvas-nm">{{ canvas.name }}</span>
							<span class="user-nm">{{ canvas.user.username }}</span>
						</div>
					</div>
					<div class="info-view">
						<div class="view-num num">
							<eye-outlined />
							<span class="num-val">12</span>
						</div>
						<div class="use-num num">
							<fund-projection-screen-outlined />
							<span class="num-val">342</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { Avatar } from "ant-design-vue";
import {
	EyeOutlined,
	FundProjectionScreenOutlined,
} from "@ant-design/icons-vue";
interface CanvasInfo {
	uid: string;
	name: string;
	img: string;
	user: {
		uid: string;
		username: string;
		avatar: string;
	};
}
interface CanvasProps {
	list: CanvasInfo[];
}
defineProps<CanvasProps>();
</script>
<style lang="scss" scoped>
.canvas-list {
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	.canvas-box {
		width: calc(100% / 3);
		margin-top: 40px;
		padding: 0 20px;
	}
	.canvas {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		&:hover {
			cursor: pointer;
			.canvas-thumbnail img {
				box-shadow: var(--fv-decorator-box-shadow);
				transform: scale(1.08);
				transition: all 0.5s ease;
			}
		}
		.canvas-thumbnail {
			width: 100%;
			height: 240px;
			border-radius: 5px;
			background: $background-color-primary;
			box-shadow: var(--fv-decorator-box-shadow-light);
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.canvas-info {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 10px;
			box-sizing: border-box;

			.info-base {
				display: flex;
				align-items: center;
				.nm {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					.canvas-nm {
						font-size: 13px;
						color: $color-black;
					}
					.user-nm {
						font-size: 10px;
						color: $color-grayBlack;
					}
				}
			}
			.info-view {
				display: flex;
				align-items: center;
				.num {
					margin-left: 10px;
					display: flex;
					align-items: center;
					&-val {
						font-size: 12px;
						font-weight: 500;
						color: $color-grayBlack;
						margin-left: 5px;
					}
				}
			}
		}
	}
}
</style>
