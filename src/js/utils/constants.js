export const GLOBAL_VARS = {
	degree: 0.0174532925,
	mediaPoint1: 1024,
	mediaPoint2: 768,
	mediaPoint3: 480,
	mediaPoint4: 320,
	projectDevStatus: process.env.NODE_ENV === 'development',
	projectWpBuildStatus: process.env.NODE_ENV === 'wp',
	// eslint-disable-next-line no-undef
	spritePath: process.env.NODE_ENV === 'wp' ? `${phpVars.themeUrl}/assets/images/sprite/sprite.svg` : 'images/sprite/sprite.svg',
};
