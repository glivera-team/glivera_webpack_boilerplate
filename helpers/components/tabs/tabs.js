// import ScrollTrigger from 'gsap/dist/ScrollTrigger';

function tabs({ trigger, content, triggerClass, contentClass }) {
	let triggerSelector = document.querySelectorAll(trigger);
	let blockSelector = document.querySelectorAll(content);

	const activeTriggerClass = `${triggerClass}--active_state`;
	const activeContentClass = `${contentClass}--active_state`;

	const handActiveTab = (index) => {
		document.querySelector(`.${activeTriggerClass}`)?.classList.remove(activeTriggerClass);
		document.querySelector(`.${activeContentClass}`)?.classList.remove(activeContentClass);

		document.querySelector(`.${triggerClass}[data-tab="${index}"]`).classList.add(activeTriggerClass);
		document.querySelector(`.${contentClass}[data-tab="${index}"]`).classList.add(activeContentClass);
		// uncomment for refresh gsap triggers under tabs
		// ScrollTrigger.refresh();
	};

	// set active tab from hash
	// const hash = window.location.hash.substring(1);
	// if (hash) {
	// 	handActiveTab(hash);
	// }

	if (triggerSelector.length && blockSelector.length) {
		triggerSelector.forEach((item) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				let currentIndex = item.getAttribute('data-tab');
				handActiveTab(currentIndex);
			});
		});
	}

	// example usage:
	// const SELECTORS = {
	// 	tabsTrigger: '.js-section-tab-trigger',
	// 	tabsContent: '.js-section-tab-content',
	// };
	// const classNames = {
	// 	tabTriggerClass: 'section__tabs_button',
	// 	tabContentClass: 'section__tabs_content',
	// };
	// tabs({
	// 	trigger: SELECTORS.tabsTrigger,
	// 	content: SELECTORS.tabsContent,
	// 	triggerClass: classNames.tabTriggerClass,
	// 	contentClass: classNames.tabContentClass,
	// });
}

export default tabs;
