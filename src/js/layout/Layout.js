// ------------------- imports
import { GLOBAL_VARS } from 'utils/constants';
import { documentReady, pageLoad, onWindowResize } from 'utils';
// ------------------- imports###

// ------------------  import components
import { calcViewportHeight } from '../utils';
// ------------------  import components###

const layout = () => {
	onWindowResize(() => {
		calcViewportHeight();
	});

	console.log('layout load');
	calcViewportHeight();
};

export default layout;
