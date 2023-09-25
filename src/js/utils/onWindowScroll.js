import { isFunction } from './isFunction';
import { debounce } from './debounce';

export const onWindowScroll = (cb) => {
	if (!cb && !isFunction(cb)) return;

	const handleScroll = () => {
		cb(window.scrollY);
	};

	window.addEventListener('scroll', debounce(15, handleScroll));

	handleScroll();
};
