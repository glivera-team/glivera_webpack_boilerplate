function tabs(link, block) {
	let linkSelector = document.querySelectorAll(link);
	let blockSelector = document.querySelectorAll(block);

	if (linkSelector.length && blockSelector.length) {
		linkSelector.forEach(item => item.addEventListener('click', function (e) {
			e.preventDefault();

			let	currentData = this.getAttribute('data-tab');
			let prefix = '[data-tab="';
			let postfix = '"]';
			let selector = block + prefix + currentData + postfix;

			blockSelector.forEach(blockEl => blockEl.classList.remove('active_tab'));
			linkSelector.forEach(el => el.classList.remove('active_tab'));

			document.querySelectorAll(selector).forEach(selectorEl => selectorEl.classList.add('active_tab'));
			this.classList.add('active_tab');
		}));
	}
}

// add in loadFunc
// tabs('.tab_nav_item', '.tab_content');

export default tabs;