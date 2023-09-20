import { exist } from '../../../src/js/utils/index';
import 'ScssComponents/universal/popup.scss';

// 1. import file to your component
// 2. initPopup('.js-name-of-popup', '.js-popup-name');
// 3. If need add this style to body
// &.body--popup_open {
// overflow: hidden;
// }

const initPopup = (btnSelector, popupSelector) => {
	const closeSelector = '.js-popup-close';
	const popupActiveState = 'popup--open_state';
	const bodyPopupOpenState = 'body--popup_open';

	const $btns = document.querySelectorAll(btnSelector);
	const $popup = document.querySelector(popupSelector);
	const $closeBtns = document.querySelectorAll(closeSelector);
	if (!exist([$btns, $popup])) return null;

	const closePopup = () => {
		$popup.classList.remove(popupActiveState);
		document.body.classList.remove(bodyPopupOpenState);
	};

	$btns.forEach(($btn) => {
		$btn.addEventListener('click', (e) => {
			e.preventDefault();
			$popup.classList.add(popupActiveState);
			document.body.classList.add(bodyPopupOpenState);
		});
	});

	$popup.addEventListener('click', (e) => {
		if (e.target === $popup) {
			closePopup();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			closePopup();
		}
	});

	if (!exist($closeBtns)) return null;

	$closeBtns.forEach(($item) => {
		$item.addEventListener('click', () => closePopup());
	});

	return null;
};

export default initPopup;
