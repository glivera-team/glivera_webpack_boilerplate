export const isTouchDevice = () => {
	return (
		'ontouchstart' in window || window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0
	);
};
