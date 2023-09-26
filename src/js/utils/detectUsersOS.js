export const detectUsersOS = () => {
	if (window.navigator.userAgent.indexOf('Win') !== -1) return 'Windows OS';
	if (window.navigator.userAgent.indexOf('Mac') !== -1) return 'Macintosh';
	if (window.navigator.userAgent.indexOf('Linux') !== -1) return 'Linux OS';
	if (window.navigator.userAgent.indexOf('Android') !== -1) return 'Android OS';
	if (window.navigator.userAgent.indexOf('like Mac') !== -1) return 'iOS';

	return null;
};
