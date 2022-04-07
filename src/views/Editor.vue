<template>
	<div class="editor">
		<div class="editor-l"></div>
		<div class="editor-c"></div>
		<div class="editor-r"></div>
	</div>
</template>
<style lang="scss" scoped>
.editor {
	width: 100%;
	height: 100vh;
	display: flex;
	&-l,
	&-r {
		width: 400px;
		height: 100%;
		background: #f2f2f2;
	}
	&-c {
		flex: 1;
	}
}
</style>
