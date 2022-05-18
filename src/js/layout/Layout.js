// ------------------- imports
import { GLOBAL_VARS } from 'utils/constants';
import { documentReady, pageLoad } from 'utils';
// ------------------- imports###

// ------------------  import components
// ------------------  import components###

export default class Layout {
	constructor() {
		this.init = this.init.bind(this);
		this.init();
	}

	loadFunc() {
		console.log('layout load');
	}

	init() {
		pageLoad(() => {
			this.loadFunc();
		});
	}
}
