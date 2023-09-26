export const calcMobileRemValue = (windowHeight) => {
	const mobileRemValue = (windowHeight / 800) * 10;

	document.documentElement.style.setProperty('--mobile-rem', `${mobileRemValue}px`);
};
