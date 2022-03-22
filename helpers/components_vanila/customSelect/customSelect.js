import Gelect from 'gelect';

function initSelects() {
	const $selects = document.querySelectorAll('.gelect');

	if (!$selects.length) return;

	$selects.forEach(($select) => {
		const newSelect = new Gelect($select, {
			// class: string, // default 'gelect' or classList[0] of your select (if defined)
			// placeholder: string,
			// selected: 2,
			// ariaMessage: string,
			// ariaLabel: '',
			// search: {
			// 	placeholder: '',
			// },

			// callBacks
			// onInit: (gelect) => {},
			// onClick: (gelect) => {},
			// onOpen: (gelect) => {},
			// onClose: (gelect) => {},
			// beforeChange: (gelect) => {},
			// afterChange: (gelect) => {},
			// onSearch: (event, gelect) => {},
		});
	});
}

export default initSelects;
