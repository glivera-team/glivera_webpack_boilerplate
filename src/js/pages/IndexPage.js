import { GLOBAL_VARS } from 'utils/constants';
import { documentReady, pageLoad } from 'utils';

export default class IndexPage {
	constructor() {
		this.init = this.init.bind(this);
	}

	loadFunc() {
		console.log('index page load');
	}

	init() {
		this.loadFunc();
	}
}
