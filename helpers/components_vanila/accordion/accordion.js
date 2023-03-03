import { exist } from '../utils/index';
import 'ScssComponents/accordion.scss';

const DEFAULT_CLASSES = {
	activeState: 'accordion__item--active-mod',
};

const accordion = ({ triggersSelector, activeStateName }) => {
	if (!exist(triggersSelector)) return;

	const $allTriggers = document.querySelectorAll(triggersSelector);
	const activeStateClass = activeStateName || DEFAULT_CLASSES.activeState;

	const closeAccordion = ({ $parentEl, $nextElementSibling, $trigger }) => {
		const nextElementSibling = $nextElementSibling;
		$parentEl.classList.remove(activeStateClass);
		nextElementSibling.style.maxHeight = null;
		$nextElementSibling.setAttribute('aria-hidden', 'true');
		$trigger.setAttribute('aria-expanded', 'false');
	};

	const closeAllAccordion = () => {
		$allTriggers.forEach(($item) => {
			closeAccordion({
				$parentEl: $item.parentNode,
				$nextElementSibling: $item.nextElementSibling,
				$trigger: $item,
			});
		});
	};

	const openAccordion = ({ $parentEl, $nextElementSibling, $trigger }) => {
		const nextElementSibling = $nextElementSibling;
		const openAccordionDelay = 100;

		setTimeout(() => {
			closeAllAccordion(); // comment it if the accordion item should be open when open another of it

			$parentEl.classList.add(activeStateClass);
			nextElementSibling.style.maxHeight = $nextElementSibling.scrollHeight?.toString().concat('px');
			$nextElementSibling.removeAttribute('aria-hidden');
			$trigger.setAttribute('aria-expanded', 'true');
		}, openAccordionDelay);
	};

	const toggleAccordion = ($trigger) => {
		const accordionElements = {
			$parentEl: $trigger.parentNode,
			$nextElementSibling: $trigger.nextElementSibling,
			$trigger,
		};

		if (accordionElements.$parentEl.classList.contains(activeStateClass)) {
			closeAccordion(accordionElements);
		} else {
			openAccordion(accordionElements);
		}
	};

	$allTriggers.forEach(($item) => {
		$item.addEventListener('click', () => {
			toggleAccordion($item);
		});
	});
};

export default accordion;

//	How to use

// 	Add this
//	accordion({
//			triggersSelector: '.accordion__item_head',
//			activeStateName: 'accordion__item--active-mod',
//	});
//	where you add the accordion component
