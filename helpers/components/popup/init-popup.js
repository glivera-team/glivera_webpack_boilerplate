import { exist } from '../utils/index';
import 'ScssComponents/universal/popup.scss';

// 1. import file to your component
// 2. initPopup('.js-popup-btn-name', '.js-popup-name');
// 3. style for body
// &.body--popup_open {
// overflow: hidden;
// }

// byId - Need for popups with the same structure but different content
// (you need to pass data-popup-id for trigger and popup)

const initPopup = (btnSelector, popupSelector, byId = false) => {
	const SELECTORS = {
		close: '.js-popup-close',
	};

	const CLASSNAMES = {
		popupActiveState: 'popup--open_state',
		bodyPopupOpenState: 'body--popup_open',
	};

	const closePopup = ($popup) => {
		$popup.classList.remove(CLASSNAMES.popupActiveState);
		document.body.classList.remove(CLASSNAMES.bodyPopupOpenState);
	};

	const openPopup = (e, $popup) => {
		e.preventDefault();
		$popup.classList.add(CLASSNAMES.popupActiveState);
		document.body.classList.add(CLASSNAMES.bodyPopupOpenState);
	};

	const initEventListeners = ($btn, $popup) => {
		$btn.addEventListener('click', (e) => openPopup(e, $popup));

		$popup.addEventListener('click', ({ target }) => {
			if (target === $popup) {
				closePopup($popup);
			}
		});

		document.addEventListener('keydown', ({ key }) => {
			if (key === 'Escape') {
				closePopup($popup);
			}
		});

		const $closeBtns = $popup.querySelectorAll(SELECTORS.close);
		if (!exist($closeBtns)) return;

		$closeBtns.forEach(($item) => {
			$item.addEventListener('click', () => closePopup($popup));
		});
	};

	const $btns = document.querySelectorAll(btnSelector);
	if (!exist($btns)) return null;

	const $popup = document.querySelector(popupSelector);

	$btns.forEach(($btn) => {
		if (byId) {
			const { popupId } = $btn.dataset;
			if (!popupId) return;

			const $popupWithId = document.querySelector(`${popupSelector}[data-popup-id="${popupId}"]`);
			if (!exist($popup)) return;

			initEventListeners($btn, $popupWithId);
		} else {
			if (!exist($popup)) return;

			initEventListeners($btn, $popup);
		}
	});

	return null;
};

export default initPopup;
