// scss
import './scss/main_global.scss';
// js
import './js/app';

// import icons svg
function requireAll(r) {
	r.keys().forEach(r);
}

requireAll(require.context('./images/icons/', true, /\.svg$/));
