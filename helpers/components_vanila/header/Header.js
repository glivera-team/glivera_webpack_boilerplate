import { onWindowScroll } from 'utils';

class Header {
	get SELECTORS() {
		return {
			header: '.header',
			menuTrigger: '.header__menu_trigger',
		};
	}

	get CLASSNAMES() {
		return {
			bodyScrollState: 'body--scroll_state',
			bodyOpenMenuState: 'body--open_menu_state',
			headerScrollState: 'scroll_mod',
		};
	}

	constructor() {
		this.$body = document.body;
		this.$header = document.querySelector(this.SELECTORS.header);
		this.$menuTrigger = document.querySelectorAll(this.SELECTORS.menuTrigger);
		this.openMenuState = false;
		this.headerScroll = this.headerScroll.bind(this);

		this.init = this.init.bind(this);
		this.init();
	}

	openMenu() {
		if (!this.openMenuState) {
			// console.log('open');
			this.$body.classList.add(this.CLASSNAMES.bodyOpenMenuState);
			this.openMenuState = true;
		} else {
			// console.log('close');
			this.$body.classList.remove(this.CLASSNAMES.bodyOpenMenuState);
			this.openMenuState = false;
		}
	}

	headerScroll(windowScrollTop) {
		if (windowScrollTop > 10 && !this.$body.classList.contains(this.CLASSNAMES.bodyScrollState)) {
			this.$body.classList.add(this.CLASSNAMES.bodyScrollState);
			this.$header.classList.add(this.CLASSNAMES.headerScrollState);
		}

		if (windowScrollTop <= 10 && this.$body.classList.contains(this.CLASSNAMES.bodyScrollState)) {
			this.$body.classList.remove(this.CLASSNAMES.bodyScrollState);
			this.$header.classList.remove(this.CLASSNAMES.headerScrollState);
		}
	}

	init() {
		if (typeof (this.$header) !== 'undefined' && this.$header != null) {
			onWindowScroll(this.headerScroll);
			this.$menuTrigger.forEach(item => {
				item.addEventListener('click', () => {
					this.openMenu();
				});
			});
		}
	}
}

export default Header;



// ------------ how init
// copy past this

// import this and if u need fix path
// import Header from './components/Header';

// add it in loadFunc
// const initHeader = new Header();

// this style for body and add some style to header
// body.body--open_menu_state {
// 	position: fixed;
// 	left: 0;
// 	top: 0;

// 	width: 100%;
// }

// scroll state class
// .header {
// // .body--scroll_state & {
// // 	background-color: rgba($white, 0.6);
// // }
// }
