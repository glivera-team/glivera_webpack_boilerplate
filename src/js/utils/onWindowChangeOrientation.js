import { isFunction } from './isFunction';
import { debounce } from './debounce';
import { isTouchDevice } from './isTouchDevice';
import { getWindowSize } from './getWindowSize';

export const onWindowChangeOrientation = (cb) => {
	if ((!cb && !isFunction(cb)) || !isTouchDevice()) return;

	let { windowWidth } = getWindowSize();

	const handleResize = () => {
		const { windowWidth: newWindowWidth } = getWindowSize();

		if (windowWidth !== newWindowWidth) cb();

		windowWidth = newWindowWidth;
	};

	window.addEventListener('resize', debounce(100, handleResize));
};
