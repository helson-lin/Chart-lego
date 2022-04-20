import { Component, createApp } from "vue";
import ContextMenu from "../components/editor/ContextMenu.vue";
export const judegNodeIsDragable = (e: HTMLElement): HTMLElement => {
	if (e.classList.value.indexOf("h-dragable") != -1) {
		return e;
	} else {
		if (!e.parentElement) throw new DOMException("No parent element");
		return judegNodeIsDragable(e.parentElement);
	}
};

export function openMenu(e: Event, id: string) {
	const el = e.target as HTMLElement;
	const { offsetLeft, offsetTop } = el as HTMLElement;
	console.dir(el);
	console.warn(el, offsetLeft, offsetTop);
	// decoratorsRender(id, ContextMenu);
}
