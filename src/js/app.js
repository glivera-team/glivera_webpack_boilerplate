// ------------------- imports
import $ from 'jquery';
// import { GLOBAL_VARS } from 'constants/global_vars';
import { docReady, pageLoad } from 'utils/utils';
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
	console.log('document ready');
	$body = $('body');
};

const loadFunc = () => {
	console.log('page load');
};

docReady(() => {
	readyFunc();
});

pageLoad(() => {
	loadFunc();
});
