export const calcRemValue = (windowWidth, windowHeight) => {
	const aspectRatio16x9 = 0.5625;
	const baseWindowHeight = 800;
	const baseWindowWidth = 1440;
	const remValue =
		windowWidth * aspectRatio16x9 > windowHeight
			? (windowHeight / baseWindowHeight) * 10
			: (windowWidth / baseWindowWidth) * 10;

	document.documentElement.style.setProperty('--rem', `${remValue}px`);
};
