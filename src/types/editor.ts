export interface ListItemProps {
	id: string;
	url: string;
}
/* 编辑器基本样式 */
export interface EditorStyleProps {
	width: number;
	height: number;
	background?: string;
	imgUrl: string | null;
	customImgBack: boolean;
}
export interface EditorProps {
	list: ListItemProps[];
	style: EditorStyleProps;
}