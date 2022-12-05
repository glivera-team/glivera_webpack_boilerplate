export const ENV_STATUS = {
	projectDevStatus: process.env.NODE_ENV === 'development',
	projectWpBuildStatus: process.env.NODE_ENV === 'wp',
};

export const BUILD_PATHS = {
	// eslint-disable-next-line no-undef
	spritePath: process.env.NODE_ENV === 'wp' ? `${phpVars.themeUrl}/assets/images/sprite/sprite.svg` : 'images/sprite/sprite.svg',
};

export const RADIAN = Math.PI / 180;

export const BREAKPOINTS = {
	mediaPoint1: 1024,
	mediaPoint2: 768,
	mediaPoint3: 480,
	mediaPoint4: 320,
};
