<template>
	<div class="header">
		<div class="logo">
			<img style="height: 50px" src="../../assets/image/logo1.png" alt="" />
		</div>
		<div class="h-flex">
			<slot></slot>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.header {
	width: 100%;
	height: 50px;
	padding: 0 20px;
	box-sizing: border-box;
	box-shadow: $shadow-shallow;
	background: #ffffff;
	box-shadow: 0px 6px 20px 0px rgba(162, 181, 230, 0.16);
	backdrop-filter: blur(12px);
	display: flex;
	flex-direction: row;
	.logo {
		height: 50px;
	}
	.h-flex {
		flex: 1;
		height: 100%;
	}
}
</style>
