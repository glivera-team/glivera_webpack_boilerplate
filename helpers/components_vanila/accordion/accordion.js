import { onWindowResize } from '../utils/index';

export default class Accordion {
	get CLASSNAMES() {
		return {
			defaultActiveState: 'accordion__item--active-mod',
		};
	}

	constructor({
		triggers,
		activeStateName,
	}) {
		console.log(triggers, activeStateName);
		this.$allTriggers = triggers ? triggers : null; // eslint-disable-line
		this.activeStateName = activeStateName ? activeStateName : this.CLASSNAMES.defaultActiveState; // eslint-disable-line

		this.enabled = true;

		this.init = this.init.bind(this);
		this.enable = this.enable.bind(this);
		this.disable = this.disable.bind(this);
		this.isEnabled = this.isEnabled.bind(this);
		this.closeAllAccordion = this.closeAllAccordion.bind(this);
		this.openAccordion = this.openAccordion.bind(this);
		this.toggleActiveState = this.toggleActiveState.bind(this);
		this.onResize = this.onResize.bind(this);
	}

	isEnabled() {
		return this.enabled;
	}

	disable() {
		this.enabled = false;
	}

	enable() {
		this.enabled = true;
	}

	onResize() {
		// console.log('test resize');

		if (this.isEnabled()) {
			this.$allTriggers.forEach($item => {
				const $parentEl = $item.parentNode;

				if ($parentEl.classList.contains(this.activeStateName)) {
					const $nextElementSibling = $item.nextElementSibling;
					$nextElementSibling.style.maxHeight = $nextElementSibling.scrollHeight + 'px'; // eslint-disable-line prefer-template
				}
			});
		}
	}

	closeAllAccordion() {
		this.$allTriggers.forEach($item => {
			this.closeAccordion($item.parentNode, $item.nextElementSibling);
		});
	}

	closeAccordion($parentEl, $nextElementSibling) {
		$parentEl.classList.remove(this.activeStateName);
		$nextElementSibling.style.maxHeight = null; // eslint-disable-line no-param-reassign
	}

	openAccordion($parentEl, $nextElementSibling) {
		setTimeout(() => {
			this.closeAllAccordion();

			$parentEl.classList.add(this.activeStateName);
			$nextElementSibling.style.maxHeight = $nextElementSibling.scrollHeight + 'px'; // eslint-disable-line
		}, 100);
	}

	toggleActiveState($trigger) {
		if (this.enabled) {
			if (!$trigger) return;

			const $parentEl = $trigger.parentNode;
			const $nextElementSibling = $trigger.nextElementSibling;

			if ($parentEl.classList.contains(this.activeStateName)) {
				this.closeAccordion($parentEl, $nextElementSibling);
			} else {
				this.openAccordion($parentEl, $nextElementSibling);
			}
		}
	}

	init() {
		if (this.$allTriggers) {
			onWindowResize(this.onResize);
			this.$allTriggers.forEach($item => {
				const $parentEl = $item.parentNode;

				if ($parentEl.classList.contains(this.activeStateName) && this.isEnabled()) {
					const $nextElementSibling = $item.nextElementSibling;

					this.openAccordion($parentEl, $nextElementSibling);
				}

				$item.addEventListener('click', () => {
					this.toggleActiveState($item);
				});
			});
		}
	}
}


// ------------ how init
// copy past this

// import this and if u need fix path
// import Accordion from './components/accordion';

// add it in loadFunc
// const acc = new Accordion({
// 	triggers: document.querySelectorAll('.accordion__item_head'), // eslint-disable-line
// 	activeStateName: 'accordion__item--active-mod' // eslint-disable-line
// }).init();
