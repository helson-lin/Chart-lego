type FunctionCallback = (val?: "keyup" | "keydown") => void;
interface KeyboardItemProps {
	key: string;
	callbacks: FunctionCallback[];
}
interface KeyboardListProps {
	[key: string]: FunctionCallback[];
}
import lodash from "lodash";

class Shortcuts {
	private keyboard: KeyboardListProps = {};
	private keyCodeMap: { [key: number]: string } = {
		65: "a",
		66: "b",
		67: "c",
		68: "d",
		69: "e",
		70: "f",
		71: "g",
		72: "h",
		73: "i",
		74: "j",
		75: "k",
		76: "l",
		77: "m",
		78: "n",
		79: "o",
		80: "p",
		81: "q",
		82: "r",
		83: "s",
		84: "t",
		85: "u",
		86: "v",
		87: "w",
		88: "x",
		89: "y",
		90: "z",
		8: "backspace",
		187: "+",
		189: "-",
	};
	constructor(keyEvent?: KeyboardItemProps[]) {
		if (keyEvent) {
			keyEvent.forEach((keyboardItem) => {
				const isKey = this.keyboard[keyboardItem.key] !== undefined;
				const keysFunctionFilter = keyboardItem.callbacks.filter(
					(func) => func instanceof Function
				);
				if (isKey) {
					this.keyboard[keyboardItem.key].push(...keysFunctionFilter);
				} else {
					this.keyboard[keyboardItem.key] = keysFunctionFilter;
				}
			});
		}
		this.listen();
	}
	private transSpeicalKey(e: KeyboardEvent) {
		const spcList = ["control", "shift", "alt"];
		let keyName = e.key.toLocaleLowerCase();
		keyName = spcList.indexOf(keyName) !== -1 ? "" : keyName;
		const ctrlKey = e.ctrlKey || e.metaKey ? "ctrl " : "";
		const shiftKey = e.shiftKey || e.metaKey ? "shift " : "";
		const altKey = e.altKey || e.metaKey ? "alt" : "";
		return ctrlKey + shiftKey + altKey + keyName;
	}
	// debuce
	private keydown(e: KeyboardEvent) {
		if (!e.key) return;
		const keyName = this.transSpeicalKey(e);
		const callbacks = this.keyboard[keyName];
		if (callbacks) {
			callbacks.forEach((func) => func("keydown"));
		}
	}
	private keyup(e: KeyboardEvent) {
		if (!e.key) return;
		const keyName = this.transSpeicalKey(e);
		const callbacks = this.keyboard[keyName];
		if (callbacks) {
			callbacks.forEach((func) => func("keyup"));
		}
	}
	private listen() {
		// lodash.debounce(this.keydown.bind(this), 100),
		window.addEventListener(
			"keydown",
			lodash.throttle(this.keydown.bind(this), 1000),
			false
		);
		// this.keyup.bind(this)
		window.addEventListener(
			"keyup",
			lodash.throttle(this.keyup.bind(this), 1000),
			false
		);
	}
	register(key: string, callback: FunctionCallback) {
		const isKey = this.keyboard[key] !== undefined;
		if (isKey) {
			this.keyboard[key].push(callback);
		} else {
			this.keyboard[key] = [callback];
		}
	}
}
const shortcuts = (() => {
	let shortcutsInstance;
	if (!shortcutsInstance) shortcutsInstance = new Shortcuts();
	return shortcutsInstance;
})();
export default shortcuts;
