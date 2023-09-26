import isMobile from 'ismobilejs';
import { isTouchDevice } from './isTouchDevice';

export const calcViewportHeight = () => {
	const isMobileData = isMobile();
	const isApple = isMobileData.apple.phone;
	const isAndroid = isMobileData.android.phone;
	const isSeven = isMobileData.seven_inch;

	if (isApple || isAndroid || isSeven || isTouchDevice()) {
		const vh = window.innerHeight * 0.01;
		// console.log(vh);
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
};
