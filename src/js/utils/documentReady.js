import { isFunction } from './isFunction';

export const documentReady = (cb) => {
	if (!cb && !isFunction(cb)) return;
	document.addEventListener('DOMContentLoaded', cb);
};
