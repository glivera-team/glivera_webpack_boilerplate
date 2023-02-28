const DEFAULT_CLASSES =	{
	activeState: 'accordion__item--active-mod',
};

const accordion = ({triggersSelector, activeStateName}) => {
	if (!exist(triggersSelector)) return;

	const $allTriggers = document.querySelectorAll(triggersSelector);
	const activeStateClass = activeStateName || DEFAULT_CLASSES.activeState;

	const closeAllAccordion = () => {
		$allTriggers.forEach(($item) => {
			closeAccordion({
				$parentEl: $item.parentNode, 
				$nextElementSibling: $item.nextElementSibling, 
				$trigger: $item,
			});
		});
	}

	const openAccordion = ({$parentEl, $nextElementSibling, $trigger}) => {
		const openAccordionDelay = 100;
		
		setTimeout(() => {
			closeAllAccordion();

			$parentEl.classList.add(activeStateClass);
			$nextElementSibling.style.maxHeight = $nextElementSibling.scrollHeight?.toString().concat('px');
			$nextElementSibling.removeAttribute('aria-hidden');
			$trigger.setAttribute('aria-expanded', 'true');
		}, openAccordionDelay);
	};

	const closeAccordion = ({$parentEl, $nextElementSibling, $trigger}) => {
		$parentEl.classList.remove(activeStateClass);
		$nextElementSibling.style.maxHeight = null;
		$nextElementSibling.setAttribute('aria-hidden', 'true');
		$trigger.setAttribute('aria-expanded', 'false');
	};

	const toggleAccordion = ($trigger) => {
		const accordionElements = {
			$parentEl: $trigger.parentNode, 
			$nextElementSibling: $trigger.nextElementSibling, 
			$trigger: $trigger,
		}

		if (accordionElements.$parentEl.classList.contains(activeStateClass)) {
			closeAccordion(accordionElements);
		} else {
			openAccordion(accordionElements);
		}
	}

	$allTriggers.forEach(($item) => {
		$item.addEventListener('click', () => {
			toggleAccordion($item);
		});
	});
};

//	How to use

// 	Add this 
//	accordion({
//			triggersSelector: '.accordion__item_head', 
//			activeStateName: 'accordion__item--active-mod',
//	});
//	where you add the accordion component
