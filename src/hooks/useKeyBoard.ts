interface KeyboardItemProps {
	key: string;
	callbacks: FunctionCallback[];
}
type FunctionCallback = (val?: "keyup" | "keydown") => void;
interface KeyboardListProps {
	[key: string]: FunctionCallback[];
}

class Shortcuts {
	private keyboard: KeyboardListProps = {};
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
	private keydown(e: KeyboardEvent) {
		const keyName = e.key.toLocaleLowerCase();
		if (!this.keyboard[keyName]) return;
		const callbacks = this.keyboard[keyName];
		if (callbacks) {
			callbacks.forEach((func) => func("keydown"));
		}
	}
	private keyup(e: KeyboardEvent) {
		const keyName = e.key.toLocaleLowerCase();
		const callbacks = this.keyboard[keyName];
		if (callbacks) {
			callbacks.forEach((func) => func("keyup"));
		}
	}
	private listen() {
		console.log(this);
		window.addEventListener("keydown", this.keyup.bind(this), false);
		window.addEventListener("keyup", this.keydown.bind(this), false);
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
