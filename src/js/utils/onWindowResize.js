import { isFunction } from './isFunction';
import { debounce } from './debounce';

export const onWindowResize = (cb) => {
	if (!cb && !isFunction(cb)) return;

	const handleResize = () => {
		cb();
	};

	window.addEventListener('resize', debounce(15, handleResize));

	handleResize();
};
