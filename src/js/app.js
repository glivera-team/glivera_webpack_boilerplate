// ------------------- imports
import $ from 'jquery';
// import { GLOBAL_VARS } from 'constants/global_vars';
import { pageLoad } from 'utils/utils';
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

const loadFunc = () => {
	console.log('page load');
};

pageLoad(() => {
	$body = $('body');
	loadFunc();
});
