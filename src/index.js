// scss
import './scss/main_global.scss';
// js
import { documentReady } from 'utils';
import { ENV_STATUS } from 'utils/constants';
import pageWidgetInit from 'dev_vendors/dev_widget';
import App from './js/app';

const styles = ['color: #fff', 'background: #cf8e1f'].join(';');
const message = 'Developed by Glivera-team https://glivera-team.com/';
// eslint-disable-next-line no-console
console.info('%c%s', styles, message);
// -------------------  dev widget
if (ENV_STATUS.projectDevStatus) {
	pageWidgetInit();
}
// -------------------  dev widget###
// -------------------  import sprite_icons svg
function requireAll(r) {
	r.keys().forEach(r);
}
requireAll(require.context('./images/icons/sprite_icons/', true, /\.svg$/));
// -------------------  import sprite_icons svg###

// -------------------  init App
documentReady(() => {
	const appInit = new App();
});
// -------------------  init App##
