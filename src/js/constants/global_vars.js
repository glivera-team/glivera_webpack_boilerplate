// eslint-disable-next-line import/no-unresolved
import { calcViewportHeight, getWindowSize, onWindowResize } from 'utils/utils';

export const GLOBAL_VARS = {
	scrollTop: 0,
	windowWidth: '',
	windowHeight: '',
	degree: 0.0174532925,
	mediaPoint1: 1024,
	mediaPoint2: 768,
	mediaPoint3: 480,
	mediaPoint4: 320,
	projectDevStatus: process.env.NODE_ENV === 'development',
};

const updateSize = () => {
	const { windowWidth, windowHeight } = getWindowSize();

	GLOBAL_VARS.windowWidth = windowWidth;
	GLOBAL_VARS.windowHeight = windowHeight;

	calcViewportHeight();
};

onWindowResize(updateSize);
