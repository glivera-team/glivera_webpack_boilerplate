export const debounceImmediate = (delay, fn) => {
	let fired = false;
	return (...args) => {
		if (!fired) {
			fn(...args);
			fired = true;
			setTimeout(() => {
				fired = false;
			}, delay);
		}
	};
};
