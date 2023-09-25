import { isFunction } from './isFunction';

export const pageLoad = (cb) => {
	if (!cb && !isFunction(cb)) return;
	window.addEventListener('load', cb);
};
