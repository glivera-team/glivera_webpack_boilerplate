const initPopup = (btn, popup, content, close) => {
	const $btn = document.querySelectorAll(btn);
	const $popup = document.querySelector(popup);
	const $close = document.querySelectorAll(close);
	const $body = document.body;
	const $lockPadding = document.querySelectorAll('.lockPadding'); //этот клас добавляется для видимых обьектов с свойством "position: fixed;"

	let unlock = true;
	const timeout = 300; //значение милисекунд должно совпадать с "transition" в _project_extends.scss

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.body.offsetWidth;

		if ($lockPadding.length > 0) {
			$lockPadding.forEach(item => {
				const el = item;
				el.style.paddingRight = `${lockPaddingValue}px`;
			});
		}
		$body.style.paddingRight = `${lockPaddingValue}px`;
		$body.classList.add('body--popup_open');

		unlock = false;
		setTimeout(() => {
			unlock = true;
		}, timeout);
	}

	function bodyUnLock() {
		setTimeout(() => {
			if ($lockPadding.length > 0) {
				$lockPadding.forEach(item => {
					const el = item;
					el.style.paddingRight = '0px';
				});
			}
			$body.style.paddingRight = '0px';
			$body.classList.remove('body--popup_open');
		}, timeout);

		unlock = false;
		setTimeout(() => {
			unlock = true;
		}, timeout);
	}

	// Закрытие попапа
	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('active_state');
			if (doUnlock) {
				bodyUnLock();
			}
		}
	}

	// Закрытие попапа при нажатии Esc
	document.addEventListener('keydown', e => {
		if (e.which === 27) {
			const popupActive = document.querySelector('.active_state');
			popupClose(popupActive);
		}
	});

	// Открытие попапа
	function popupOpen(curentPopup) {
		if (curentPopup && unlock) {
			const popupActive = document.querySelector('.active_state');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
				curentPopup.classList.add('active_state');
			}
			// Закрытие при нажатии на темную область
			curentPopup.addEventListener('click', e => {
				if (!e.target.closest(content)) {
					popupClose(e.target.closest(popup));
					// bodyClass(false);
				}
			});
		}
	}

	if (!$btn.length && !$popup) return null;

	$btn.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			popupOpen($popup);
		});
	});

	if (!$close) return null;

	$close.forEach(item => {
		item.addEventListener('click', () => {
			popupClose(item.closest(popup));
		});
	});

	return null;
};

export default initPopup;
