import { onWindowScroll, exist } from '../utils';

// Example of usage
// * Import and init this component into layout.js

// * Some styles
// body--open_menu_state {
// 	overflow: hidden;
// }

// &.header--scroll_state {
// 	background-color: rgba($white, 0.6);
// }

// &.header--pos_state {
// 	transform: translateY(-100%);
// }

const header = () => {
	const SELECTORS = {
		header: '.header',
		menuTrigger: '.header__menu_trigger',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
		headerScrollState: 'header--scroll_state',
	};

	const $body = document.body;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTriggers = document.querySelectorAll(SELECTORS.menuTrigger);

	let isMenuOpen = false;

	const handleTriggerClick = () => {
		if (!isMenuOpen) {
			$body.classList.add(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = true;
		} else {
			$body.classList.remove(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = false;
		}
	};

	const headerScroll = (windowScrollTop) => {
		if (windowScrollTop > 10 && !$header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.add(CLASSNAMES.headerScrollState);
		} else if (windowScrollTop <= 10 && $header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.remove(CLASSNAMES.headerScrollState);
		}

		// if you need header dissapear
		// 1. Add this to CLASSNAMES: headerScrollPos: 'header--pos_state',
		// 2. Add this variable: let prevScrollPos = window.pageYOffset;
		// 3. Uncomment me
		// if (prevScrollPos < window.pageYOffset) {
		// 	$header.classList.add(CLASSNAMES.headerScrollPos);
		// } else {
		// 	$header.classList.remove(CLASSNAMES.headerScrollPos);
		// }

		// prevScrollPos = window.pageYOffset;
	};

	if (!exist($header)) return;

	onWindowScroll(headerScroll);

	if (!exist($menuTriggers)) return;

	$menuTriggers.forEach(($trigger) => {
		$trigger.addEventListener('click', () => {
			handleTriggerClick();
		});
	});
};

export default header;
