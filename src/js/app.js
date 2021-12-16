// ------------------- imports
import $ from 'jquery';
import { GLOBAL_VARS } from 'utils/constants';
import { documentReady, pageLoad } from 'utils';
// ------------------- imports###

// ------------------  import components
// ------------------  import components###

window.jQuery = $;
window.$ = $;

const styles = ['color: #fff', 'background: #cf8e1f'].join(';');
const message = 'Developed by Glivera-team https://glivera-team.com/';
// eslint-disable-next-line no-console
console.info('%c%s', styles, message);

// -------------------  dev widget
if (GLOBAL_VARS.projectDevStatus) {
	// eslint-disable-next-line global-require
	import('./dev_vendors/dev_widget').then(({ default: pageWidgetIni }) => {
		pageWidgetIni();
	}).catch(() => {
		console.log('Failed to load function');
	});
	console.log(process.env.NODE_ENV);
}
// -------------------  dev widget###

// -------------------  global variables
// eslint-disable-next-line no-unused-vars
let $body;
// -------------------  global variables###

const readyFunc = () => {
	$body = $('body');

	console.log('document ready', GLOBAL_VARS);
};

const loadFunc = () => {
	console.log('page load');
};

documentReady(() => {
	readyFunc();
});

pageLoad(() => {
	loadFunc();
});
