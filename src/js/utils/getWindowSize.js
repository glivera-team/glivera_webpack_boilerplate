export const getWindowSize = () => {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	return {
		windowWidth,
		windowHeight,
	};
};
