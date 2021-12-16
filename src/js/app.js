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

// -------------------  global variables
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
